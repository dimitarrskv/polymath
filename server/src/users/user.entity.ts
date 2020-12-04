import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

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

    @Column({ nullable: true })
    instagram: string;

    @Column({ nullable: true })
    instagramUserId: string;

    @Column({ nullable: true })
    instagramAccessToken: string;
}