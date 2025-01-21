import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class InitialData1664158383409 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
    private getCover;
    private getThumbnail;
}
