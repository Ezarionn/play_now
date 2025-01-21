"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfiguration = void 0;
const path_1 = require("path");
class DatabaseConfiguration {
    createTypeOrmOptions() {
        return {
            type: 'sqlite',
            database: 'data/database.db',
            synchronize: false,
            logging: false,
            entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
            migrations: [__dirname + '/migrations/**/*.{js,ts}'],
        };
    }
}
exports.DatabaseConfiguration = DatabaseConfiguration;
//# sourceMappingURL=database.configuration.js.map