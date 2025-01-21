import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { RegisterDto } from './register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './jwt.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(credentionals: RegisterDto): Promise<User | null>;
    validate(username: string, password: string): Promise<User | null>;
    login(user: User): Promise<JwtDto>;
}
