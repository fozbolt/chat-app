import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' }) // Specify the table name here
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; //just to test th// ings out
}
