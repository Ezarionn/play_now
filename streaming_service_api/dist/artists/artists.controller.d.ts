import { ArtistsService } from './artists.service';
import { Artist } from './artist.entity';
import { Song } from '../songs/song.entity';
import { Album } from '../albums/album.entity';
export declare class ArtistsController {
    private readonly artistsService;
    constructor(artistsService: ArtistsService);
    artist(artistId: number): Promise<Artist>;
    albums(artistId: number): Promise<Album[]>;
    songs(artistId: number): Promise<Song[]>;
    like(req: any, artistId: number): Promise<Artist>;
    unlike(req: any, artistId: number): Promise<Artist>;
}
