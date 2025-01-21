import { Repository } from 'typeorm';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';
import { Playlist } from './playlist.entity';
import { SongsService } from '../songs/songs.service';
import { PlaylistDto } from './playlist.dto';
export declare class PlaylistsService {
    private readonly playlistRepository;
    private readonly songsService;
    constructor(playlistRepository: Repository<Playlist>, songsService: SongsService);
    create(playlistDto: PlaylistDto, user: User): Promise<Playlist>;
    rename(playlistId: number, playlistDto: PlaylistDto, user: User): Promise<Playlist>;
    delete(playlistId: number, user: User): Promise<Playlist>;
    findOne(id: number): Promise<Playlist>;
    getSongs(playlistId: number): Promise<Song[]>;
    addSong(playlistId: number, songId: number, user: User): Promise<Playlist>;
    removeSong(playlistId: number, songId: number, user: User): Promise<Playlist>;
}
