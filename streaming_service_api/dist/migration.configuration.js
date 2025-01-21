"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
const database_configuration_1 = require("./database.configuration");
dotenv.config();
exports.default = new typeorm_1.DataSource(new database_configuration_1.DatabaseConfiguration().createTypeOrmOptions());
//# sourceMappingURL=migration.configuration.js.map