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
exports.ArtistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const artist_entity_1 = require("./artist.entity");
let ArtistsService = class ArtistsService {
    constructor(artistRepository) {
        this.artistRepository = artistRepository;
    }
    async findOne(id) {
        const artist = await this.artistRepository.findOne({
            where: { id },
            loadEagerRelations: true,
        });
        if (!artist) {
            throw new common_1.HttpException('Artist does not exists', common_1.HttpStatus.NOT_FOUND);
        }
        return artist;
    }
    async getAlbums(artistId) {
        const artist = await this.findOne(artistId);
        return artist.albums;
    }
    async getSongs(artistId) {
        const albums = await this.getAlbums(artistId);
        const songs = await Promise.all(albums.map((p) => p.songs));
        return songs.flatMap((p) => p);
    }
    async like(artistId, user) {
        const artist = await this.findOne(artistId);
        if (artist.likes.find((p) => p.id === user.id)) {
            throw new common_1.HttpException('Artist is already liked', common_1.HttpStatus.BAD_REQUEST);
        }
        artist.likes.push(user);
        return await this.artistRepository.save(artist);
    }
    async unlike(artistId, user) {
        const artist = await this.findOne(artistId);
        if (!artist.likes.find((p) => p.id === user.id)) {
            throw new common_1.HttpException('Artist is not liked', common_1.HttpStatus.BAD_REQUEST);
        }
        artist.likes = artist.likes.filter((p) => p.id != user.id);
        return await this.artistRepository.save(artist);
    }
};
exports.ArtistsService = ArtistsService;
exports.ArtistsService = ArtistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArtistsService);
//# sourceMappingURL=artists.service.js.map