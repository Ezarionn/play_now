import { Album } from '../albums/album.entity';
import { User } from '../users/user.entity';
export declare class Artist {
    id: number;
    name: string;
    image: string;
    createdAt: Date;
    albums: Promise<Album[]>;
    likes: User[];
}
