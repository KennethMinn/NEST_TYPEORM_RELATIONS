import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { LikePostDto } from './dto/like-post.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService, // post and user depends on each others services
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find({
      relations: {
        profile: true,
        posts: true,
        likedPosts: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: {
        likedPosts: true,
        posts: true,
        profile: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async likePost(likePostDto: LikePostDto) {
    console.log(likePostDto);
    const user = await this.findOne(likePostDto.userId);
    const post = await this.postService.findOne(likePostDto.postId);

    user.likedPosts.push(post);
    return this.repo.save(user);
  }
}
