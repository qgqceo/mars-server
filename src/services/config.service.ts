import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Config } from '../entities/config.entity';

@Injectable()
export class ConfigService {
    constructor(
        @InjectRepository(Config)
        private readonly repository: Repository<Config>,
    ) {}

    get() {
        return this.repository.findOne({
            cache: 60000,
        });
    }

    async update(data: DeepPartial<Config>) {
        let config = await this.get();
        Object.assign(config, data);
        return this.repository.save(config);
    }
}
