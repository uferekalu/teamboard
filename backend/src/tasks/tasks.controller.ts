import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new task',
    description:
      'Creates a new task under a project owned by the authenticated user.',
  })
  @ApiBody({
    description: 'Task creation payload',
    type: CreateTaskDto,
    examples: {
      example1: {
        summary: 'Example task creation',
        value: {
          title: 'Design login page',
          description: 'Create UI and validation for login page',
          status: 'todo',
          project: '671f5dc08f39c5fadc72bb17',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
    schema: {
      example: {
        _id: '6720b12d5b7a2bdf5a73c021',
        title: 'Design login page',
        description: 'Create UI and validation for login page',
        status: 'todo',
        project: '671f5dc08f39c5fadc72bb17',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not owner of project' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user.userId);
  }

  @Get('project/:projectId')
  @ApiOperation({
    summary: 'Get all tasks for a specific project',
    description:
      'Retrieves all tasks belonging to a specific project, sorted by creation date (newest first).',
  })
  @ApiParam({
    name: 'projectId',
    description: 'The ID of the project',
    example: '671f5dc08f39c5fadc72bb17',
  })
  @ApiResponse({
    status: 200,
    description: 'Tasks successfully retrieved',
    schema: {
      example: [
        {
          _id: '6720b12d5b7a2bdf5a73c021',
          title: 'Design login page',
          description: 'Create UI and validation for login page',
          status: 'in-progress',
          project: '671f5dc08f39c5fadc72bb17',
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findAllByProject(@Param('projectId') projectId: string) {
    return this.tasksService.findAllByProject(projectId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a task',
    description:
      'Updates the details of a specific task such as title, description, or status.',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '6720b12d5b7a2bdf5a73c021',
  })
  @ApiBody({
    description: 'Task update payload',
    type: UpdateTaskDto,
    examples: {
      example1: {
        summary: 'Mark task as done',
        value: {
          title: 'Design login page',
          status: 'done',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    schema: {
      example: {
        _id: '6720b12d5b7a2bdf5a73c021',
        title: 'Design login page',
        description: 'Create UI and validation for login page',
        status: 'done',
        project: '671f5dc08f39c5fadc72bb17',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a task',
    description:
      'Deletes a task by its ID. Returns a success message when deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '6720b12d5b7a2bdf5a73c021',
  })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
    schema: {
      example: { message: 'Task deleted successfully' },
    },
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
