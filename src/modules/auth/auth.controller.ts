import { User } from "@prisma/client";

import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CurrentUser } from "src/common";

import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { TokenDTO } from "./dto/token.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiBody({ type: LoginDTO })
  @UseGuards(AuthGuard("local"))
  @ApiOperation({ summary: "일반 로그인" })
  @ApiOkResponse({ description: "JWT 토큰", type: TokenDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async login(@CurrentUser() user: User) {
    return await this.authService.createJwtToken(user.id);
  }
}
