import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ProfileDto } from './dto/profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Serialize(ProfileDto)
  @Get()
  findAll() {
    return this.profileService.findAll();
  }
}
