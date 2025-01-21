import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';
import { Artist } from './artist.entity';
import { Album } from '../albums/album.entity';
export declare class ArtistsService {
    private readonly artistRepository;
    constructor(artistRepository: Repository<Artist>);
    findOne(id: number): Promise<Artist>;
    getAlbums(artistId: number): Promise<Album[]>;
    getSongs(artistId: number): Promise<Song[]>;
    like(artistId: number, user: User): Promise<Artist>;
    unlike(artistId: number, user: User): Promise<Artist>;
}
