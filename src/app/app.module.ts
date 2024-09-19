import importToArray from "import-to-array";

import { Module } from "@nestjs/common";

import * as commonModules from "src/common/modules";
import * as providers from "src/common/providers";
import * as modules from "src/modules";

@Module({
  imports: [
    ...importToArray(providers),
    ...importToArray(modules),
    ...importToArray(commonModules),
  ],
})
export class AppModule {}
