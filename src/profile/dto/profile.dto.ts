import { Expose, Transform } from 'class-transformer';

export class ProfileDto {
  @Expose()
  id: number;

  @Expose()
  bio: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
