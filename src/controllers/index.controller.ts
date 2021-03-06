import { Controller, Get, Render, Post, Body, Query, Param } from '@nestjs/common';

import { PostService } from '../services/post.service';
import { IRule, RuleService } from '../services/rule.service';
import { IntPipe } from '../pipes/int.pipe';
import { toHtml } from '../utils/htmlMarkdown';

@Controller()
export class IndexController {
    constructor(
        private readonly postService: PostService,
        private readonly ruleService: RuleService
    ) {}

    @Get()
    @Render('index')
    root( @Query('page', new IntPipe(false)) page) {
        if (page < 1) {
            page = 1;
        }
        return this.postService.findByPage(page);
    }

    @Get('post/:id')
    @Render('detail')
    async postDetail( @Param('id', new IntPipe()) id) {
        const post = await this.postService.findById(id);
        // if (post.markdown) {
        //     post.html = toHtml(post.markdown);
        // }
        // 临时过滤掉跳转链接
        post.html = post.html.replace(/href=".+?"/g, 'href=""');
        return {post};
    }

    @Get('rule')
    @Render('rule')
    postRule() {

    }

    @Post('rule')
    @Render('rule')
    async addRule(@Body() data: IRule) {
        const ret = await this.ruleService.insert(data);
        return {message: '添加成功'};
    }
}
