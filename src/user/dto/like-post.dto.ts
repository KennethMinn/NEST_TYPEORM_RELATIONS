import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikePostDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
