import { IsString } from 'class-validator';

export class CreateBannerDTO {
  @IsString()
  url: string;
}
