import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
    ) {}
    findByOpenId(openid: string) {
        return this.repository.findOne({ openid });
    }
    findByName(loginname: string) {
        return this.repository.findOne({ loginname });
    }
}
