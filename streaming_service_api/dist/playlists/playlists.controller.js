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
exports.PlaylistsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const playlists_service_1 = require("./playlists.service");
const song_entity_1 = require("../songs/song.entity");
const playlist_entity_1 = require("./playlist.entity");
const playlist_dto_1 = require("./playlist.dto");
let PlaylistsController = class PlaylistsController {
    constructor(playlistsService) {
        this.playlistsService = playlistsService;
    }
    async create(req, playlist) {
        return this.playlistsService.create(playlist, req.user);
    }
    async rename(req, playlistId, playlist) {
        return this.playlistsService.rename(playlistId, playlist, req.user);
    }
    async delete(req, playlistId) {
        return this.playlistsService.delete(playlistId, req.user);
    }
    async playlist(playlistId) {
        return this.playlistsService.findOne(playlistId);
    }
    async songs(playlistId) {
        return this.playlistsService.getSongs(playlistId);
    }
    async like(req, playlistId, songId) {
        return this.playlistsService.addSong(playlistId, songId, req.user);
    }
    async unlike(req, playlistId, songId) {
        return this.playlistsService.removeSong(playlistId, songId, req.user);
    }
};
exports.PlaylistsController = PlaylistsController;
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Playlist has been created',
        type: playlist_entity_1.Playlist,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    (0, swagger_1.ApiBody)({ type: playlist_dto_1.PlaylistDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, playlist_dto_1.PlaylistDto]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/:playlistId'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Playlist has been renamed',
        type: playlist_entity_1.Playlist,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    (0, swagger_1.ApiBody)({ type: playlist_dto_1.PlaylistDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('playlistId', common_1.ValidationPipe)),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, playlist_dto_1.PlaylistDto]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "rename", null);
__decorate([
    (0, common_1.Delete)('/:playlistId'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Playlist has been removed',
        type: playlist_entity_1.Playlist,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    (0, swagger_1.ApiBody)({ type: playlist_dto_1.PlaylistDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('playlistId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/:playlistId'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns playlist', type: playlist_entity_1.Playlist }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Playlist does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('playlistId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "playlist", null);
__decorate([
    (0, common_1.Get)('/:playlistId/songs'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns playlist`s songs', type: [song_entity_1.Song] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Playlist does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('playlistId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "songs", null);
__decorate([
    (0, common_1.Post)('/:playlistId/add/:songId'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Song has been added to playlist',
        type: playlist_entity_1.Playlist,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Playlist does not exists' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Access forbidden' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Song is already added' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('playlistId', common_1.ValidationPipe)),
    __param(2, (0, common_1.Param)('songId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "like", null);
__decorate([
    (0, common_1.Post)('/:playlistId/remove/:songId'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Song has been removed from playlist',
        type: playlist_entity_1.Playlist,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Playlist does not exists' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Access forbidden' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Song is not added' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('playlistId', common_1.ValidationPipe)),
    __param(2, (0, common_1.Param)('songId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "unlike", null);
exports.PlaylistsController = PlaylistsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('playlists'),
    __metadata("design:paramtypes", [playlists_service_1.PlaylistsService])
], PlaylistsController);
//# sourceMappingURL=playlists.controller.js.map