import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        //how come i dont need async-await-> because its fast as its local?
        try {
            await this.userRepository.save(createUserDto);
        } catch (err) {
            // Check if the error is due to unique username constraint
            if (err.code === 'ER_DUP_ENTRY') {
                return 'Username already exists';
            }
            return 'Error while creating user';
        }
        return 'created';
    }

    public async getUsers(): Promise<Array<User>> {
        return await this.userRepository.find();
    }

    public async getUser(userId: User['userId']): Promise<User> {
        //add checks or messages if not found and security
        return await this.userRepository.findOneBy({ userId });
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
