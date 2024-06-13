import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Event } from './entities/event.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';



@Injectable()
export class UserService {   
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private dataSource: DataSource
    ) {}

    findAll(){
        return this.userRepository.find({
            relations: ['friends']
        });
    }

    async findOne(id: string){
        const user = await this.userRepository.findOne({ 
            where: { id: +id },
            relations: ['friends'] 
        });
        if(!user){
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    } 

    create(createUserDto: CreateUserDto){
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto){
        const user = await this.userRepository.preload({
            id: +id,
            ...updateUserDto
        });
        if(!user){
            throw new NotFoundException(`User #${id} not found`);
        }
        return this.userRepository.save(user);
    }

    async addFriend(userAId: number, userBId: number): Promise<void> {
        const userA = await this.userRepository.findOne({ 
            where: { id: +userAId },
            relations: ['friends'] 
        });
        const userB = await this.userRepository.findOne({ 
            where: { id: +userBId },
            relations: ['friends'] 
        });    

        userA.friends.push(userB);
        userB.friends.push(userA);
    
        await this.userRepository.save([userA, userB]);
      }
    
    async removeFriend(userAId: number, userBId: number): Promise<void> {
        const userA = await this.userRepository.findOne({ 
            where: { id: +userAId },
            relations: ['friends'] 
        });
        const userB = await this.userRepository.findOne({ 
            where: { id: +userBId },
            relations: ['friends'] 
        });    
    
        userA.friends = userA.friends.filter(friend => friend.id !== userBId);
        userB.friends = userB.friends.filter(friend => friend.id !== userAId);
    
        await this.userRepository.save([userA, userB]);
      }

    async remove(id: string){
        const user = await this.userRepository.findOne(
        {
            where: {id: +id},  
        });      

        await this.userRepository.delete(user);
    }

    async addLike(user: User){
        const QR = this.dataSource.createQueryRunner();
        await QR.connect();
        await QR.startTransaction();

        try{
            user.likes++;
            const likeEvent = new Event();
            likeEvent.name = 'like_user';
            likeEvent.type = 'user';
            likeEvent.payload = {userID : user.id};

            await QR.manager.save(user);
            await QR.manager.save(likeEvent);
            await QR.commitTransaction();
        } catch (err){
            await QR.rollbackTransaction();
        }
        finally{
            await QR.release();
        }
    }
} 
