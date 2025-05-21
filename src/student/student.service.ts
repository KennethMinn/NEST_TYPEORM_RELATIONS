import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CourseService } from 'src/course/course.service';
import { EnrollDto } from './dto/enroll.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly repo: Repository<Student>,
    private readonly courseService: CourseService,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const student = this.repo.create(createStudentDto);
    return this.repo.save(student);
  }

  findAll() {
    return this.repo.find({
      relations: {
        courses: true,
      },
    });
  }

  async findOne(id: number) {
    const student = await this.repo.findOne({
      where: { id },
      relations: {
        courses: true,
      },
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async enrollStudentToCourse(enrollDto: EnrollDto) {
    const student = await this.findOne(enrollDto.studentId);
    const course = await this.courseService.findOne(enrollDto.courseId);
    console.log(enrollDto);

    student.courses.push(course);
    return this.repo.save(student);
  }
}
