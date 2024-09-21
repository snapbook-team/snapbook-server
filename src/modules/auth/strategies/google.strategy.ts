import { Provider } from "@prisma/client";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { UserService } from "src/modules/user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    public readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: config.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: config.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: config.get<string>("GOOGLE_CALLBACK_URL"),
      scope: ["email", "profile"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, emails, displayName } = profile;

      const user = this.userService.findOneByProvider(Provider.GOOGLE, id);
      if (user) return done(null, user);

      const email = emails[0].value;

      const newUser = await this.userService.create({
        email,
        username: displayName,
        provider: Provider.GOOGLE,
        providerId: id,
      });

      return done(null, newUser);
    } catch (err) {
      return done(null, undefined, { reason: "Unauthorized" });
    }
  }
}
