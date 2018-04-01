import { Controller, Get, Param } from '@nestjs/common';

import { PostService } from './post.service';
import { Post } from './post.entity';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {

    }

    @Get()
    findAll(): Promise<Post[]> {
        return this.postService.findByPage();
    }

    @Get(':id')
    findById(@Param() params): Promise<Post> {
        return this.postService.findById(params.id);
    }
}
