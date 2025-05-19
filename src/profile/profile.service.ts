import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepo.create(createProfileDto);
    return this.profileRepo.save(profile);
  }

  findAll() {
    return this.profileRepo.find({
      relations: {
        user: true,
      },
    });
  }
}
