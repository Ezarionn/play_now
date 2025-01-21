import { PlaylistsService } from './playlists.service';
import { Song } from '../songs/song.entity';
import { Playlist } from './playlist.entity';
import { PlaylistDto } from './playlist.dto';
export declare class PlaylistsController {
    private readonly playlistsService;
    constructor(playlistsService: PlaylistsService);
    create(req: any, playlist: PlaylistDto): Promise<Playlist>;
    rename(req: any, playlistId: number, playlist: PlaylistDto): Promise<Playlist>;
    delete(req: any, playlistId: number): Promise<Playlist>;
    playlist(playlistId: number): Promise<Playlist>;
    songs(playlistId: number): Promise<Song[]>;
    like(req: any, playlistId: number, songId: number): Promise<Playlist>;
    unlike(req: any, playlistId: number, songId: number): Promise<Playlist>;
}
