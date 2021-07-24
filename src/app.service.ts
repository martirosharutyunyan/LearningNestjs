import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './app.entity';
import { UserDto } from './user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  async getUsers(): Promise<Users[]> {
    const users = await this.userRepository.createQueryBuilder()
      .select()
      .getMany()
    return users
  }

  async addUser(UserDto: UserDto): Promise<Users> {
    const userEntity = this.userRepository.create(UserDto)
    await this.userRepository.save(userEntity)
    
    return userEntity;
  }

  async updateUser(id: string, UserDto: UserDto): Promise<Users> {
    const userEntity = await this.userRepository.createQueryBuilder()
      .update(Users)
      .set(UserDto)
      .where('id = :id', { id })
      .execute()
    console.log(userEntity)
    return {first:"", id:46, last:"das"}
  } 
}
