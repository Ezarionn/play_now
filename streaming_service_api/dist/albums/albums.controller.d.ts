import { AlbumsService } from './albums.service';
import { Album } from './album.entity';
import { Song } from '../songs/song.entity';
export declare class AlbumsController {
    private readonly albumsService;
    constructor(albumsService: AlbumsService);
    album(albumId: number): Promise<Album>;
    songs(albumId: number): Promise<Song[]>;
    like(req: any, albumId: number): Promise<Album>;
    unlike(req: any, albumId: number): Promise<Album>;
}
