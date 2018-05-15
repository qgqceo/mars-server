import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
    redirectUrl: string
    constructor(redirectUrl = '/auth/login') {
        this.redirectUrl = redirectUrl;
    }
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.redirect(this.redirectUrl);
    }
}
