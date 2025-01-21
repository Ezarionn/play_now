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
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const album_entity_1 = require("./album.entity");
const typeorm_2 = require("typeorm");
let AlbumsService = class AlbumsService {
    constructor(albumRepository) {
        this.albumRepository = albumRepository;
    }
    async findOne(id) {
        const album = await this.albumRepository.findOne({
            where: { id },
            loadEagerRelations: true,
        });
        if (!album) {
            throw new common_1.HttpException('Album does not exists', common_1.HttpStatus.NOT_FOUND);
        }
        return album;
    }
    async getSongs(albumId) {
        const album = await this.findOne(albumId);
        return album.songs;
    }
    async like(albumId, user) {
        const album = await this.findOne(albumId);
        if (album.likes.find((p) => p.id === user.id)) {
            throw new common_1.HttpException('Album is already liked', common_1.HttpStatus.BAD_REQUEST);
        }
        album.likes.push(user);
        return await this.albumRepository.save(album);
    }
    async unlike(albumId, user) {
        const album = await this.findOne(albumId);
        if (!album.likes.find((p) => p.id === user.id)) {
            throw new common_1.HttpException('Album is not liked', common_1.HttpStatus.BAD_REQUEST);
        }
        album.likes = album.likes.filter((p) => p.id != user.id);
        return await this.albumRepository.save(album);
    }
};
exports.AlbumsService = AlbumsService;
exports.AlbumsService = AlbumsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(album_entity_1.Album)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlbumsService);
//# sourceMappingURL=albums.service.js.map