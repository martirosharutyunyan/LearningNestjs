import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Users } from './app.entity';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.db_host,
      database: process.env.db_database,
      username: process.env.db_username,
      password: process.env.db_password,
      port: +process.env.db_port,
      entities: ['src/modules/**/*.entity{.ts,.js}'],
      migrations: ['src/migrations/*{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
