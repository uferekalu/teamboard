import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from 'src/projects/schemas/project.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const project = await this.projectModel.findById(createTaskDto.project);
    if (!project) throw new NotFoundException('Project not found');
    if (project.owner.toString() !== userId)
      throw new ForbiddenException('You do not own this project');

    const task = new this.taskModel(createTaskDto);
    await task.save();

    return {
      message: 'Task created successfully',
      task,
    };
  }

  async findAllByProject(projectId: string) {
    const tasks = await this.taskModel
      .find({ project: projectId })
      .sort({ createdAt: -1 })
      .exec();

    if (!tasks || tasks.length === 0)
      throw new NotFoundException('No tasks found for this project');

    return {
      message: 'Tasks retrieved successfully',
      total: tasks.length,
      tasks,
    };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });

    if (!task) throw new NotFoundException('Task not found');

    return {
      message: 'Task updated successfully',
      task,
    };
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) throw new NotFoundException('Task not found');

    return {
      message: 'Task deleted successfully',
      deletedTaskId: id,
    };
  }
}
