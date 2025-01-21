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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const playlist_entity_1 = require("../playlists/playlist.entity");
const artist_entity_1 = require("../artists/artist.entity");
const album_entity_1 = require("../albums/album.entity");
const song_entity_1 = require("../songs/song.entity");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Id' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Username' }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'First Name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Last Name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [playlist_entity_1.Playlist], description: 'Playlists' }),
    (0, typeorm_1.OneToMany)(() => playlist_entity_1.Playlist, (playlist) => playlist.user),
    __metadata("design:type", Promise)
], User.prototype, "playlists", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [artist_entity_1.Artist], description: 'Liked artists' }),
    (0, typeorm_1.ManyToMany)(() => artist_entity_1.Artist, (artist) => artist.likes),
    __metadata("design:type", Promise)
], User.prototype, "artistLikes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [album_entity_1.Album], description: 'Liked albums' }),
    (0, typeorm_1.ManyToMany)(() => album_entity_1.Album, (album) => album.likes),
    __metadata("design:type", Promise)
], User.prototype, "albumLikes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [song_entity_1.Song], description: 'Liked songs' }),
    (0, typeorm_1.ManyToMany)(() => song_entity_1.Song, (song) => song.likes),
    __metadata("design:type", Promise)
], User.prototype, "songLikes", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map