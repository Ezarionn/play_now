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
exports.Album = void 0;
const typeorm_1 = require("typeorm");
const artist_entity_1 = require("../artists/artist.entity");
const user_entity_1 = require("../users/user.entity");
const song_entity_1 = require("../songs/song.entity");
const swagger_1 = require("@nestjs/swagger");
let Album = class Album {
};
exports.Album = Album;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Id' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Album.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Album.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Image' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Album.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, description: 'Created at' }),
    (0, typeorm_1.CreateDateColumn)({ type: Number }),
    __metadata("design:type", Date)
], Album.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [song_entity_1.Song], description: 'Songs' }),
    (0, typeorm_1.OneToMany)(() => song_entity_1.Song, (song) => song.album),
    __metadata("design:type", Promise)
], Album.prototype, "songs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [artist_entity_1.Artist], description: 'Artists' }),
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.Artist, (artist) => artist.albums, { eager: true }),
    __metadata("design:type", artist_entity_1.Artist)
], Album.prototype, "artist", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [user_entity_1.User], description: 'Likes' }),
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.albumLikes, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Album.prototype, "likes", void 0);
exports.Album = Album = __decorate([
    (0, typeorm_1.Entity)()
], Album);
//# sourceMappingURL=album.entity.js.map