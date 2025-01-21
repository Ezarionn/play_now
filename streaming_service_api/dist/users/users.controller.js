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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const playlist_entity_1 = require("../playlists/playlist.entity");
const user_likes_dto_1 = require("./user-likes.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    users() {
        return this.usersService.findAll();
    }
    async playlists(req) {
        return this.usersService.getPlaylists(req.user.username);
    }
    async playlistsByUser(username) {
        return this.usersService.getPlaylists(username);
    }
    async likes(req) {
        return this.usersService.getUserLikes(req.user.username);
    }
    async likesByUser(username) {
        return this.usersService.getUserLikes(username);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns users', type: [user_entity_1.User] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "users", null);
__decorate([
    (0, common_1.Get)('/playlists'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns user`s playlists', type: [playlist_entity_1.Playlist] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "playlists", null);
__decorate([
    (0, common_1.Get)('/:username/playlists'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns user`s playlists', type: [playlist_entity_1.Playlist] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('username', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "playlistsByUser", null);
__decorate([
    (0, common_1.Get)('/likes'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns user`s likes',
        type: user_likes_dto_1.UserLikesDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "likes", null);
__decorate([
    (0, common_1.Get)('/:username/likes'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns user`s likes',
        type: user_likes_dto_1.UserLikesDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('username', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "likesByUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map