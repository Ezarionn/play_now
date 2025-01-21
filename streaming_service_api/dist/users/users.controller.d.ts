import { User } from './user.entity';
import { UsersService } from './users.service';
import { Playlist } from '../playlists/playlist.entity';
import { UserLikesDto } from './user-likes.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    users(): Promise<User[]>;
    playlists(req: any): Promise<Playlist[]>;
    playlistsByUser(username: string): Promise<Playlist[]>;
    likes(req: any): Promise<UserLikesDto>;
    likesByUser(username: string): Promise<UserLikesDto>;
}
