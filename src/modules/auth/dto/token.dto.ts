import { ApiProperty } from "@nestjs/swagger";

export class TokenDTO {
  @ApiProperty({ description: "JWT 토큰" })
  token: string;
}
