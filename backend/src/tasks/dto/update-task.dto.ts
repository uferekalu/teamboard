import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    description: 'Updated title for the task',
    example: 'Implement login page validation',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated task description',
    example: 'Add client-side form validation',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated task status',
    example: 'done',
    enum: ['todo', 'in-progress', 'done'],
  })
  status?: string;
}
