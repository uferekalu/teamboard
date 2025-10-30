import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'My First Project',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Optional description of the project',
    example: 'This project manages the company dashboard',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
