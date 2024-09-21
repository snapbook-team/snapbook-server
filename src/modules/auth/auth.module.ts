import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "src/modules/user";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessJwtStrategy } from "./strategies/access.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, GoogleStrategy, LocalStrategy],
})
export class AuthModule {}
