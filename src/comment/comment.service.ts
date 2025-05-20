import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { postId, ...commentData } = createCommentDto;

    const post = await this.postService.findOneById(postId);

    const comment = this.commentRepo.create({ ...commentData, post });

    return this.commentRepo.save(comment);
  }

  findAll() {
    return this.commentRepo.find({
      relations: {
        post: true,
      },
    });
  }
}
