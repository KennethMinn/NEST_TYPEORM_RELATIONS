import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService, // post and user depends on each others services
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { userId, ...userData } = createPostDto;
    const user = await this.userService.findOne(userId);

    const post = this.repo.create({ ...userData, user });
    return this.repo.save(post);
  }

  findAll() {
    return this.repo.find({
      relations: {
        user: true,
        likes: true,
      },
    });
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: {
        likes: true,
        user: true,
      },
    });

    if (!post) throw new NotFoundException('Post not found');

    return post;
  }
}
