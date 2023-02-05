import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Greatest Hits', description: 'Album Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '2007', description: 'Year' })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    description: 'Album Id',
  })
  @IsOptional()
  @IsString()
  artistId: string | null;
}
