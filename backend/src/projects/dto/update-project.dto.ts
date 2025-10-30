import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiPropertyOptional({
    description: 'New name for the project',
    example: 'Updated Project Name',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated description for the project',
    example: 'Updated description text',
  })
  description?: string;
}
