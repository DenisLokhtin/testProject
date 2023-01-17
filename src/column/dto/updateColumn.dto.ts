import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateColumnDto {
  @IsNotEmpty()
  @IsString()
  title?: string;
}
