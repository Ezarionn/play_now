import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';
export declare class AlbumsService {
    private readonly albumRepository;
    constructor(albumRepository: Repository<Album>);
    findOne(id: number): Promise<Album>;
    getSongs(albumId: number): Promise<Song[]>;
    like(albumId: number, user: User): Promise<Album>;
    unlike(albumId: number, user: User): Promise<Album>;
}
