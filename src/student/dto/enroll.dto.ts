import { IsNotEmpty, IsNumber } from 'class-validator';

export class EnrollDto {
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}
