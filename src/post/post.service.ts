import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepo.create(createPostDto);
    return this.postRepo.save(post);
  }

  findAll() {
    return this.postRepo.find({
      relations: {
        comments: true,
      },
    });
  }

  async findOneById(id: number) {
    const post = await this.postRepo.findOne({ where: { id } });

    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  async remove(id: number) {
    const post = await this.findOneById(id);
    return this.postRepo.remove(post);
  }
}
