import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Initial1664157233977 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
