import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AUTH_RESPONSE_CODES } from '../utils/auth.response-codes';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const token = request.cookies?.auth_token;

    if (!token) {
      this.sendUnauthorizedResponse(response);
      return false;
    }

    try {
      request.user = this.jwtService.verify(token);

      return true;
    } catch {
      this.sendUnauthorizedResponse(response);
      return false;
    }
  }

  private sendUnauthorizedResponse(response: Response): boolean {
    //@ts-ignore
    response.status(HttpStatus.UNAUTHORIZED).json({
      isAuthenticated: false,
      messages: [AUTH_RESPONSE_CODES.IS_NOT_AUTHENTICATED],
      statusCode: HttpStatus.UNAUTHORIZED,
    });
    return false;
  }
}
