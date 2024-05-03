import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    // TODO: ovo bi vec napravilo problem na AMS gdje bi trebalo puno stvari promijeniti (obavezan access modifier")
    private constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    private async addUser(createUserDto: CreateUserDto) {
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

    private async getUsers() {
        return this.userRepository.find();
    }

    private async getUser(userId: User['userId']) {
        //add checks or messages if not found and security
        const user = await this.userRepository.findOneBy({ userId });
        return user;
    }

    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    private updateUser(id: number, updateUserDto: UpdateUserDto) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dummyVarToSkipEslint = updateUserDto;
        return `This action updates a #${id} user`;
    }

    private deleteUser(id: number) {
        return `This action removes a #${id} user`;
    }
}
