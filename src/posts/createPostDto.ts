import { IsNotEmpty } from 'class-validator';

export class createPostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  body: string;
}
