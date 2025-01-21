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
exports.Song = void 0;
const typeorm_1 = require("typeorm");
const playlist_entity_1 = require("../playlists/playlist.entity");
const album_entity_1 = require("../albums/album.entity");
const artist_entity_1 = require("../artists/artist.entity");
const user_entity_1 = require("../users/user.entity");
const swagger_1 = require("@nestjs/swagger");
let Song = class Song {
};
exports.Song = Song;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Id' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Song.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Song.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'File name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Song.prototype, "filename", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'File name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Song.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Image' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Song.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Duration' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Song.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, description: 'Created at' }),
    (0, typeorm_1.CreateDateColumn)({ type: Number }),
    __metadata("design:type", Date)
], Song.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => album_entity_1.Album, description: 'Album' }),
    (0, typeorm_1.ManyToOne)(() => album_entity_1.Album, (album) => album.id, { eager: true }),
    __metadata("design:type", album_entity_1.Album)
], Song.prototype, "album", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => artist_entity_1.Artist, description: 'Artist' }),
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.Artist, (artist) => artist.id, { eager: true }),
    __metadata("design:type", artist_entity_1.Artist)
], Song.prototype, "artist", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [playlist_entity_1.Playlist], description: 'Playlists' }),
    (0, typeorm_1.ManyToMany)(() => playlist_entity_1.Playlist, (playlist) => playlist.songs),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Promise)
], Song.prototype, "playlists", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [user_entity_1.User], description: 'Likes' }),
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.songLikes, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Song.prototype, "likes", void 0);
exports.Song = Song = __decorate([
    (0, typeorm_1.Entity)()
], Song);
//# sourceMappingURL=song.entity.js.map