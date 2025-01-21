import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { User } from '../users/user.entity';
import { GetAllSongsDto } from './get-all-songs.dto';
export declare class SongsService {
    private readonly songRepository;
    constructor(songRepository: Repository<Song>);
    getAll(params: GetAllSongsDto): Promise<Song[]>;
    findOne(id: number): Promise<Song>;
    like(songId: number, user: User): Promise<Song>;
    unlike(songId: number, user: User): Promise<Song>;
}
