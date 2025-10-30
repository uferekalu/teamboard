import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Design login page',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Optional detailed description of the task',
    example: 'Create UI and validation for login page',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Status of the task',
    example: 'todo',
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
    required: false,
  })
  @IsEnum(['todo', 'in-progress', 'done'])
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'The ID of the project this task belongs to',
    example: '671f5dc08f39c5fadc72bb17',
  })
  @IsString()
  project: string;
}
