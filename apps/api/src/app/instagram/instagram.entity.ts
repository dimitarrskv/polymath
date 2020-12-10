
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from 'apps/api/src/app/users/user.entity';

@Entity()
export class Instagram {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    profilePhoto: string;

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    displayName: string;

    @Column({ nullable: true })
    instagramUserId: string;

    @Column({ nullable: true })
    accessToken: string;

    @OneToOne(() => User, user => user.instagram) // specify inverse side as a second parameter
    user: User;
}