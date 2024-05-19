import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    // TODO: ovo bi vec napravilo problem na AMS gdje bi trebalo puno stvari promijeniti (obavezan access modifier")
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async addUser(createUserDto: CreateUserDto): Promise<string> {
        const password = createUserDto.password;
        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
            return 'Password must contain at least eight characters, including at least one number and both lower and uppercase letters and at least one special character';
        }

        const saltRounds = 10;
        createUserDto.password = await bcrypt.hash(password, saltRounds);

        try {
            await this.userRepository.save(createUserDto);
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exists');
            }
            throw new InternalServerErrorException('Error while creating user');
        }

        return 'created ';
    }

    public async getUsers(): Promise<Array<User>> {
        return await this.userRepository.find();
    }

    public async getUserById(userId: User['userId']): Promise<User> {
        //add checks or messages if not found and security
        return await this.userRepository.findOneBy({ userId });
    }

    public async getUserByUsername(username: User['username']): Promise<User> {
        //add checks or messages if not found and security
        return await this.userRepository.findOneBy({ username });
    }

    // TODO
    // public updateUser(id: number, updateUserDto: UpdateUserDto): string {
    //     const dummyVarToSkipEslint = updateUserDto;
    //     return `This action updates a #${id} user`;
    // }
    //
    // public deleteUser(id: number): string {
    //     return `This action removes a #${id} user`;
    // }
}
