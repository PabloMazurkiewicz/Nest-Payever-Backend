import { IsNumber, IsNotEmpty } from 'class-validator';

export class ReqResDbUserIdDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
