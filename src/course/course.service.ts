import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private readonly repo: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const course = this.repo.create(createCourseDto);
    return this.repo.save(course);
  }

  findAll() {
    return this.repo.find({
      relations: {
        students: true,
      },
    });
  }

  async findOne(id: number) {
    const course = await this.repo.findOne({
      where: { id },
      relations: {
        students: true,
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    return course;
  }
}
