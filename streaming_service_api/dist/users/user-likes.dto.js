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
exports.UserLikesDto = void 0;
const artist_entity_1 = require("../artists/artist.entity");
const swagger_1 = require("@nestjs/swagger");
class UserLikesDto {
}
exports.UserLikesDto = UserLikesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [artist_entity_1.Artist], description: 'User`s liked artists' }),
    __metadata("design:type", Array)
], UserLikesDto.prototype, "artistLikes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [artist_entity_1.Artist], description: 'User`s liked albums' }),
    __metadata("design:type", Array)
], UserLikesDto.prototype, "albumLikes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [artist_entity_1.Artist], description: 'User`s liked songs' }),
    __metadata("design:type", Array)
], UserLikesDto.prototype, "songLikes", void 0);
//# sourceMappingURL=user-likes.dto.js.map