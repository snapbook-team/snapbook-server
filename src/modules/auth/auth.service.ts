import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { JwtPayload } from "./models/jwt.payload.mode";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createJwtToken(userId: string) {
    const payload: JwtPayload = { id: userId, type: "access" };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_ACCESS_TOKEN_EXP"),
    });
  }
}
