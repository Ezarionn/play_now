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
exports.SongsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const songs_service_1 = require("./songs.service");
const song_entity_1 = require("./song.entity");
const get_all_songs_dto_1 = require("./get-all-songs.dto");
let SongsController = class SongsController {
    constructor(songsService) {
        this.songsService = songsService;
    }
    async getAll(params) {
        return this.songsService.getAll(params);
    }
    async albums(songId) {
        return this.songsService.findOne(songId);
    }
    async like(req, songId) {
        return this.songsService.like(songId, req.user);
    }
    async unlike(req, songId) {
        return this.songsService.unlike(songId, req.user);
    }
};
exports.SongsController = SongsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns all songs',
        type: [song_entity_1.Song],
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_songs_dto_1.GetAllSongsDto]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:songId'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns song', type: song_entity_1.Song }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Song does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('songId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "albums", null);
__decorate([
    (0, common_1.Post)('/:songId/like'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Song has been liked', type: song_entity_1.Song }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Song does not exists' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Song is already liked' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('songId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "like", null);
__decorate([
    (0, common_1.Post)('/:songId/unlike'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Song has been liked', type: song_entity_1.Song }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Song does not exists' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Song is not liked' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('songId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "unlike", null);
exports.SongsController = SongsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('songs'),
    __metadata("design:paramtypes", [songs_service_1.SongsService])
], SongsController);
//# sourceMappingURL=songs.controller.js.map