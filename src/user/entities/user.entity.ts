import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({default: 0})
    likes: number;

    @JoinTable()
    @ManyToMany(type => User, (user) => user.friends , { onDelete: 'CASCADE' })
    friends: User[];
}
