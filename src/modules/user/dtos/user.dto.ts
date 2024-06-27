import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Contains,
} from 'class-validator';


export class UserDto {
  @IsEmail()
  @Contains('@', { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString()
  avatar: string; 
}
