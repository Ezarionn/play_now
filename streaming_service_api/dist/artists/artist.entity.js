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
exports.Artist = void 0;
const typeorm_1 = require("typeorm");
const album_entity_1 = require("../albums/album.entity");
const user_entity_1 = require("../users/user.entity");
const swagger_1 = require("@nestjs/swagger");
let Artist = class Artist {
};
exports.Artist = Artist;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Id' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Artist.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Artist.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Image' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Artist.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, description: 'Created at' }),
    (0, typeorm_1.CreateDateColumn)({ type: Number }),
    __metadata("design:type", Date)
], Artist.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [album_entity_1.Album], description: 'Albums' }),
    (0, typeorm_1.OneToMany)(() => album_entity_1.Album, (album) => album.artist),
    __metadata("design:type", Promise)
], Artist.prototype, "albums", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [user_entity_1.User], description: 'Likes' }),
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.artistLikes, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Artist.prototype, "likes", void 0);
exports.Artist = Artist = __decorate([
    (0, typeorm_1.Entity)()
], Artist);
//# sourceMappingURL=artist.entity.js.map