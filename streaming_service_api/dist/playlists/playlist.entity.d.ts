import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';
export declare class Playlist {
    id: number;
    name: string;
    createdAt: Date;
    user: User;
    songs: Song[];
}
