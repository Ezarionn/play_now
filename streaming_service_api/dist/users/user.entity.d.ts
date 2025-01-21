import { Playlist } from '../playlists/playlist.entity';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';
import { Song } from '../songs/song.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    playlists: Promise<Playlist[]>;
    artistLikes: Promise<Artist[]>;
    albumLikes: Promise<Album[]>;
    songLikes: Promise<Song[]>;
}
