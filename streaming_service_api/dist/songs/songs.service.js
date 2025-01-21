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
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const song_entity_1 = require("./song.entity");
let SongsService = class SongsService {
    constructor(songRepository) {
        this.songRepository = songRepository;
    }
    async getAll(params) {
        var _a;
        const query = this.songRepository
            .createQueryBuilder('song')
            .leftJoinAndSelect('song.album', 'album')
            .leftJoinAndSelect('song.artist', 'artist')
            .leftJoinAndSelect('song.likes', 'likes');
        if ((_a = params.search) === null || _a === void 0 ? void 0 : _a.length) {
            query.where('LOWER(song.name) GLOB :search OR LOWER(album.name) GLOB :search OR LOWER(artist.name) GLOB :search', {
                search: `*${params.search.trim().toLowerCase()}*`,
            });
        }
        return query.getMany();
    }
    async findOne(id) {
        const song = await this.songRepository.findOne({
            where: { id },
            loadEagerRelations: true,
        });
        if (!song) {
            throw new common_1.HttpException('Song does not exists', common_1.HttpStatus.NOT_FOUND);
        }
        return song;
    }
    async like(songId, user) {
        const song = await this.findOne(songId);
        if (song.likes.find((p) => p.id === user.id)) {
            throw new common_1.HttpException('Song is already liked', common_1.HttpStatus.BAD_REQUEST);
        }
        song.likes.push(user);
        return await this.songRepository.save(song);
    }
    async unlike(songId, user) {
        const song = await this.findOne(songId);
        if (!song.likes.find((p) => p.id === user.id)) {
            throw new common_1.HttpException('Song is not liked', common_1.HttpStatus.BAD_REQUEST);
        }
        song.likes = song.likes.filter((p) => p.id != user.id);
        return await this.songRepository.save(song);
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(song_entity_1.Song)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SongsService);
//# sourceMappingURL=songs.service.js.map