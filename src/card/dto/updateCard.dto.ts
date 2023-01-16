import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
