import { Module } from "@nestjs/common";

import { UserModule } from "src/modules/user";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessJwtStrategy } from "./strategies/access.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, GoogleStrategy],
})
export class AuthModule {}
