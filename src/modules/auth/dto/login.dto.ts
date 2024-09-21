import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
  @ApiProperty({ description: "사용자 이메일" })
  email: string;

  @ApiProperty({ description: "사용자 비밀번호" })
  password: string;
}
