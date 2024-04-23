import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async addUser(createUserDto: CreateUserDto) {
        //how come i dont need async-await-> because its fast as its local?
        try {
            await this.userRepository.save(createUserDto);
        } catch (err: any) {
            // Check if the error is due to unique username constraint
            if (err.code === 'ER_DUP_ENTRY') {
                return 'Username already exists';
            }
            return 'Error while creating user';
        }
        return 'created';
    }

    async getUsers() {
        return await this.userRepository.find();
    }

    async getUser(userId: User['userId']) {
        //add checks or messages if not found and security
        const user = await this.userRepository.findOneBy({ userId });
        return user;
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    deleteUser(id: number) {
        return `This action removes a #${id} user`;
    }
}
