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
exports.ArtistsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const artists_service_1 = require("./artists.service");
const artist_entity_1 = require("./artist.entity");
const song_entity_1 = require("../songs/song.entity");
const album_entity_1 = require("../albums/album.entity");
let ArtistsController = class ArtistsController {
    constructor(artistsService) {
        this.artistsService = artistsService;
    }
    async artist(artistId) {
        return this.artistsService.findOne(artistId);
    }
    async albums(artistId) {
        return this.artistsService.getAlbums(artistId);
    }
    async songs(artistId) {
        return this.artistsService.getSongs(artistId);
    }
    async like(req, artistId) {
        return this.artistsService.like(artistId, req.user);
    }
    async unlike(req, artistId) {
        return this.artistsService.unlike(artistId, req.user);
    }
};
exports.ArtistsController = ArtistsController;
__decorate([
    (0, common_1.Get)('/:artistId'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns artist`s albums', type: artist_entity_1.Artist }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Artist does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('artistId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArtistsController.prototype, "artist", null);
__decorate([
    (0, common_1.Get)('/:artistId/albums'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns artist`s albums', type: [album_entity_1.Album] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Artist does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('artistId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArtistsController.prototype, "albums", null);
__decorate([
    (0, common_1.Get)('/:artistId/songs'),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns artist`s songs', type: [song_entity_1.Song] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Artist does not exists' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Param)('artistId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArtistsController.prototype, "songs", null);
__decorate([
    (0, common_1.Post)('/:artistId/like'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Artist has been liked', type: artist_entity_1.Artist }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Artist does not exists' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Artist is already liked' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('artistId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ArtistsController.prototype, "like", null);
__decorate([
    (0, common_1.Post)('/:artistId/unlike'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Artist has been liked', type: artist_entity_1.Artist }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Artist does not exists' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Artist is not liked' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Something went wrong' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('artistId', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ArtistsController.prototype, "unlike", null);
exports.ArtistsController = ArtistsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('artists'),
    __metadata("design:paramtypes", [artists_service_1.ArtistsService])
], ArtistsController);
//# sourceMappingURL=artists.controller.js.map