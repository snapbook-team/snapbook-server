import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessJwtStrategy } from "./strategies/access.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy],
})
export class AuthModule {}
