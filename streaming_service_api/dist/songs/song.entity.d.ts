import { Playlist } from '../playlists/playlist.entity';
import { Album } from '../albums/album.entity';
import { Artist } from '../artists/artist.entity';
import { User } from '../users/user.entity';
export declare class Song {
    id: number;
    name: string;
    filename: string;
    path: string;
    image: string;
    duration: number;
    createdAt: Date;
    album: Album;
    artist: Artist;
    playlists: Promise<Playlist[]>;
    likes: User[];
}
