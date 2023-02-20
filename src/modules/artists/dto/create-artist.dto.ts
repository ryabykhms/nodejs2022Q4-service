import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: 'Unnamed', description: 'Artist Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: true, description: 'Does the artist have a Grammy?' })
  @IsBoolean()
  grammy: boolean;
}
