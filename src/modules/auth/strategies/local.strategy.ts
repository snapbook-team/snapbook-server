import { DoneCallback } from "passport";
import { Strategy } from "passport-local";

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { UserService } from "src/modules/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(
    email: string,
    password: string,
    done: DoneCallback,
  ): Promise<any> {
    try {
      const user = await this.userService.findOneByEmailAndPassword(
        email,
        password,
      );
      if (!user) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
}
