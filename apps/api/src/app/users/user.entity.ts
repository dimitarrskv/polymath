import { Instagram } from 'apps/api/src/app/instagram/instagram.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    email: string;

    @Column({ nullable: true })
    profilePhoto: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    linkedin: string;

    @Column({ nullable: true })
    linkedinUserId: string;

    @Column({ nullable: true })
    linkedinAccessToken: string;

    @Column({ nullable: true })
    github: string;

    @Column({ nullable: true })
    twitter: string;

    @OneToOne(() => Instagram, instagram => instagram.user, { cascade: true }) // specify inverse side as a second parameter
    @JoinColumn()
    instagram: Instagram;
}