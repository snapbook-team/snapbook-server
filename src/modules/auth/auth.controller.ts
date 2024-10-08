import { User } from "@prisma/client";
import { Response } from "express";

import { Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CurrentUser } from "src/common";

import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { TokenDTO } from "./dto/token.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post("login")
  @ApiBody({ type: LoginDTO })
  @UseGuards(AuthGuard("local"))
  @ApiOperation({ summary: "일반 로그인", description: "일반 로그인" })
  @ApiOkResponse({ description: "JWT 토큰", type: TokenDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async login(@CurrentUser() user: User) {
    return await this.authService.createJwtToken(user.id);
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({
    summary: "구글 로그인",
    description: "구글 로그인 페이지로 리다이렉트됩니다.",
  })
  public async googleLogin() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({
    summary: "구글 로그인 콜백",
    description: `구글 로그인 후 \`\${FRONTEND_URL}/auth?token=\${token}\` 으로 리다이렉트됩니다.`,
  })
  public async googleLoginCallback(
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    return res.redirect(
      `${this.configService.get("FRONTEND_URL")}/auth?token=${await this.authService.createJwtToken(user.id)}`,
    );
  }
}
