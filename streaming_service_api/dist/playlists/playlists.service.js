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
exports.PlaylistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const playlist_entity_1 = require("./playlist.entity");
const songs_service_1 = require("../songs/songs.service");
let PlaylistsService = class PlaylistsService {
    constructor(playlistRepository, songsService) {
        this.playlistRepository = playlistRepository;
        this.songsService = songsService;
    }
    async create(playlistDto, user) {
        const playlist = this.playlistRepository.create(Object.assign(Object.assign({}, playlistDto), { user }));
        return this.playlistRepository.save(playlist);
    }
    async rename(playlistId, playlistDto, user) {
        const playlist = await this.findOne(playlistId);
        if (playlist.user.id !== user.id) {
            throw new common_1.HttpException('Access forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return this.playlistRepository.save(Object.assign(Object.assign({}, playlist), playlistDto));
    }
    async delete(playlistId, user) {
        const playlist = await this.findOne(playlistId);
        if (playlist.user.id !== user.id) {
            throw new common_1.HttpException('Access forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return this.playlistRepository.remove(playlist);
    }
    async findOne(id) {
        const playlist = await this.playlistRepository.findOne({
            where: { id },
            loadEagerRelations: true,
        });
        if (!playlist) {
            throw new common_1.HttpException('Playlist does not exists', common_1.HttpStatus.NOT_FOUND);
        }
        return playlist;
    }
    async getSongs(playlistId) {
        const playlist = await this.findOne(playlistId);
        return playlist.songs;
    }
    async addSong(playlistId, songId, user) {
        const playlist = await this.findOne(playlistId);
        const song = await this.songsService.findOne(songId);
        if (playlist.user.id !== user.id) {
            throw new common_1.HttpException('Access forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        if (playlist.songs.find((p) => p.id === song.id)) {
            throw new common_1.HttpException('Song is already added', common_1.HttpStatus.BAD_REQUEST);
        }
        playlist.songs.push(song);
        return await this.playlistRepository.save(playlist);
    }
    async removeSong(playlistId, songId, user) {
        const playlist = await this.findOne(playlistId);
        const song = await this.songsService.findOne(songId);
        if (playlist.user.id !== user.id) {
            throw new common_1.HttpException('Access forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        if (!playlist.songs.find((p) => p.id === song.id)) {
            throw new common_1.HttpException('Song is not added', common_1.HttpStatus.BAD_REQUEST);
        }
        playlist.songs = playlist.songs.filter((p) => p.id != song.id);
        return await this.playlistRepository.save(playlist);
    }
};
exports.PlaylistsService = PlaylistsService;
exports.PlaylistsService = PlaylistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(playlist_entity_1.Playlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        songs_service_1.SongsService])
], PlaylistsService);
//# sourceMappingURL=playlists.service.js.map