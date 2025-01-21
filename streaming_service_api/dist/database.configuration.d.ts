import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
export declare class DatabaseConfiguration implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): SqliteConnectionOptions;
}
