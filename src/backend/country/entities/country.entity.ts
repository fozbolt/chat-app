import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique} from 'typeorm';

@Entity()
@Unique(['name'])
@Unique(['countryCode'])
export class Country {
    @PrimaryGeneratedColumn({ name: 'country_id' })
    countryId: number;

    @Column()
    name: string;

    @Column({ name: 'country_code' })
    countryCode: string;

    @Column()
    locale: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({  name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
