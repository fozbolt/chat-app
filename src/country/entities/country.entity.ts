import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Country {
    @PrimaryGeneratedColumn({ name: 'country_id' })
    countryId: number;

    @Column()
    name: string;

    @Column({ name: 'country_code' })
    countryCode: string;

    @Column()
    locale: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
