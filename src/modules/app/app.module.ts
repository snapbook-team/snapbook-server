import importToArray from "import-to-array";
import * as moment from "moment-timezone";

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { LoggerMiddleware } from "src/common";
import * as providers from "src/common/providers";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [...importToArray(providers)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor() {
    moment.tz.setDefault("Asia/Seoul");
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
