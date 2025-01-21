import { SongsService } from './songs.service';
import { Song } from './song.entity';
import { GetAllSongsDto } from './get-all-songs.dto';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    getAll(params: GetAllSongsDto): Promise<Song[]>;
    albums(songId: number): Promise<Song>;
    like(req: any, songId: number): Promise<Song>;
    unlike(req: any, songId: number): Promise<Song>;
}
