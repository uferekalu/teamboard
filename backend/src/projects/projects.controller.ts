import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new project',
    description: 'Creates a new project under the authenticated user.',
  })
  @ApiBody({
    description: 'Project creation data',
    type: CreateProjectDto,
    examples: {
      example1: {
        summary: 'Basic project',
        value: {
          name: 'My First Project',
          description: 'This is my project description',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Project successfully created',
    schema: {
      example: {
        _id: '671f5dc08f39c5fadc72bb17',
        name: 'My First Project',
        description: 'This is my project description',
        owner: '671f5cfa8f39c5fadc72ba34',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectsService.create(createProjectDto, req.user.userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all projects of the authenticated user',
    description:
      'Retrieves all projects belonging to the currently authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of projects returned successfully',
    schema: {
      example: [
        {
          _id: '671f5dc08f39c5fadc72bb17',
          name: 'My First Project',
          description: 'Project details',
          owner: '671f5cfa8f39c5fadc72ba34',
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Request() req) {
    return this.projectsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific project',
    description: 'Fetches details of a project by ID if owned by the user.',
  })
  @ApiParam({ name: 'id', description: 'Project ID', example: '671f5dc08f39c5fadc72bb17' })
  @ApiResponse({
    status: 200,
    description: 'Project found successfully',
    schema: {
      example: {
        _id: '671f5dc08f39c5fadc72bb17',
        name: 'My First Project',
        description: 'Details of project',
        owner: '671f5cfa8f39c5fadc72ba34',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not owner of project' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.projectsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a project',
    description:
      'Updates details of a specific project if the authenticated user owns it.',
  })
  @ApiParam({ name: 'id', description: 'Project ID', example: '671f5dc08f39c5fadc72bb17' })
  @ApiBody({
    description: 'Project update data',
    type: UpdateProjectDto,
    examples: {
      example1: {
        summary: 'Update project name',
        value: {
          name: 'Updated Project Name',
          description: 'Updated project description',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
    schema: {
      example: {
        _id: '671f5dc08f39c5fadc72bb17',
        name: 'Updated Project Name',
        description: 'Updated project description',
        owner: '671f5cfa8f39c5fadc72ba34',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not owner of project' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    return this.projectsService.update(id, updateProjectDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a project',
    description:
      'Deletes a project if it belongs to the authenticated user.',
  })
  @ApiParam({ name: 'id', description: 'Project ID', example: '671f5dc08f39c5fadc72bb17' })
  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully',
    schema: {
      example: { message: 'Project deleted successfully' },
    },
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not owner of project' })
  remove(@Param('id') id: string, @Request() req) {
    return this.projectsService.remove(id, req.user.userId);
  }
}
