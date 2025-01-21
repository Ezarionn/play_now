import { Artist } from '../artists/artist.entity';
import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';
export declare class Album {
    id: number;
    name: string;
    image: string;
    createdAt: Date;
    songs: Promise<Song[]>;
    artist: Artist;
    likes: User[];
}
