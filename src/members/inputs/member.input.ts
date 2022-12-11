import { IsDefined, IsNotEmpty, MaxLength } from 'class-validator';

export class Member {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(255)
  _id: string;

  @IsDefined()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;
}
