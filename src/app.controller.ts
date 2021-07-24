import { Body, Controller, Delete, Get, Headers, Post } from '@nestjs/common';
import { Users } from './app.entity';
import { AppService } from './app.service';
import { UserDto } from './user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUsers(): Promise<Users[]> {
    return this.appService.getUsers()
  }

  @Post()
  async addUser(@Body() UserDto: UserDto): Promise<Users> {
    return this.appService.addUser(UserDto)
  }

  @Post('/update')
  async updateUser(@Body() UserDto: UserDto, @Headers('x-user-id') id: string): Promise<Users> {
    return this.appService.updateUser(id, UserDto);
  }

  @Delete()
  async deleteUser(@Headers('x-user-id') id: string): Promise<Users> {
    return this.appService.deleteUser(id)
  }
}
