import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';
import { Song } from '../songs/song.entity';
export declare class UserLikesDto {
    artistLikes: Artist[];
    albumLikes: Album[];
    songLikes: Song[];
}
