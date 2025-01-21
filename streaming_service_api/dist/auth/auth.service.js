"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(credentionals) {
        const user = await this.usersService.findByUsername(credentionals.username);
        if (user) {
            throw new common_1.HttpException('Username is already taken', common_1.HttpStatus.CONFLICT);
        }
        const hashedPassword = await (0, bcrypt_1.hash)(credentionals.password, 10);
        try {
            const user = Object.assign(Object.assign({}, credentionals), { password: hashedPassword });
            return await this.usersService.create(user);
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validate(username, password) {
        const user = await this.usersService.findByUsername(username);
        if (user) {
            if (await (0, bcrypt_1.compare)(password, user.password)) {
                return user;
            }
        }
        throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.UNAUTHORIZED);
    }
    async login(user) {
        const payload = { username: user.username, id: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map