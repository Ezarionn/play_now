import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../auth/register.dto';
import { Playlist } from '../playlists/playlist.entity';
import { UserLikesDto } from './user-likes.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    getPlaylists(username: string): Promise<Playlist[]>;
    getUserLikes(username: string): Promise<UserLikesDto>;
    create(credentionals: RegisterDto): Promise<User>;
    remove(id: string): Promise<void>;
}
