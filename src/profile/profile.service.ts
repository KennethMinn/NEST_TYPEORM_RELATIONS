import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const profile = this.repo.create(createProfileDto);
    return this.repo.save(profile);
  }

  findAll() {
    return this.repo.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const profile = await this.repo.findOne({ where: { id } });
  }
}
