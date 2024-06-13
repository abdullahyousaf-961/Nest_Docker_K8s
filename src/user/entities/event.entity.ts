import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable} from 'typeorm';


@Entity()
export class Event{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column('json')
    payload: Record<string, number>;
}