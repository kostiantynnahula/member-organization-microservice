import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class GetByEmail {
  @IsDefined()
  @IsNotEmpty()
  _id: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
