import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    try {
      const project = new this.projectModel({
        ...createProjectDto,
        owner: userId,
      });
      const savedProject = await project.save();

      return {
        message: 'Project created successfully',
        project: savedProject,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  async findAll(userId: string) {
    try {
      const projects = await this.projectModel.find({ owner: userId }).exec();

      return {
        message: 'Projects retrieved successfully',
        total: projects.length,
        projects,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve projects');
    }
  }

  async findOne(id: string, userId: string) {
    const project = await this.projectModel.findById(id).exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.owner.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to access this project');
    }

    return {
      message: 'Project retrieved successfully',
      project,
    };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    await this.assertOwnership(id, userId);

    const updatedProject = await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectDto,
      { new: true },
    );

    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }

    return {
      message: 'Project updated successfully',
      project: updatedProject,
    };
  }

  async remove(id: string, userId: string) {
    await this.assertOwnership(id, userId);

    const deletedProject = await this.projectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      throw new NotFoundException('Project not found');
    }

    return {
      message: 'Project deleted successfully',
      project: deletedProject,
    };
  }

  private async assertOwnership(id: string, userId: string) {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.owner.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to perform this action');
    }
  }
}
