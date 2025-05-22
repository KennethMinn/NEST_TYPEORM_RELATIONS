import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PostModule)], // post and user depends on each others services
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
