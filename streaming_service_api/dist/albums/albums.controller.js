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
exports.AlbumsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const albums_service_1 = require("./albums.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const album_entity_1 = require("./album.entity");
const song_entity_1 = require("../songs/song.entity");
let AlbumsController = class AlbumsController {
    constructor(albumsService) {
        this.albumsService = albumsService;
    }
    async album(albumId) {
        return this.albumsService.findOne(albumId);
    }
    async songs(albumId) {
        return this.albumsService.getSongs(albumId);
    }
    async like(req, albumId) {
        return this.albumsService.like(albumId, req.user);
    }
    async unlike(req, albumId) {
        return this.albumsService.unlike(albumId, req.user);
    }
};
exports.AlbumsController = AlbumsController;
__decorate([
    (0, common_1.Get)('/:albumId'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns album`s songs', type: album_entity_1.Album }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Album does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('albumId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "album", null);
__decorate([
    (0, common_1.Get)('/:albumId/songs'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns album`s songs', type: [song_entity_1.Song] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Album does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('albumId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "songs", null);
__decorate([
    (0, common_1.Post)('/:albumId/like'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Album has been liked', type: album_entity_1.Album }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Album does not exists' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Album is already liked' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('albumId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "like", null);
__decorate([
    (0, common_1.Post)('/:albumId/unlike'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Album has been liked', type: album_entity_1.Album }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Album does not exists' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Album is not liked' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('albumId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "unlike", null);
exports.AlbumsController = AlbumsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('albums'),
    __metadata("design:paramtypes", [albums_service_1.AlbumsService])
], AlbumsController);
//# sourceMappingURL=albums.controller.js.map