import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
import { AuthService } from './auth.service';
import { JwtDto } from './jwt.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(credentials: RegisterDto): Promise<JwtDto>;
    login(req: any, credentials: LoginDto): Promise<JwtDto>;
}
