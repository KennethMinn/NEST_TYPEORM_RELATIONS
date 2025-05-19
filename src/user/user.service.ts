import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { profile, ...userData } = createUserDto;
    const user = this.userRepo.create(userData);
    user.profile = this.profileRepo.create(profile); //must give profile entity
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find({
      relations: {
        profile: true,
      },
    });
  }
}
