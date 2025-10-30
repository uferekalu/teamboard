import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    const project = new this.projectModel({
      ...createProjectDto,
      owner: userId,
    });
    return project.save();
  }

  async findAll(userId: string) {
    return this.projectModel.find({ owner: userId }).exec();
  }

  async findOne(id: string, userId: string) {
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException('Project not found');
    if (project.owner.toString() !== userId) throw new ForbiddenException();
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    await this.assertOwnership(id, userId);
    return this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
  }

  async remove(id: string, userId: string) {
    await this.assertOwnership(id, userId);
    return this.projectModel.findByIdAndDelete(id);
  }

  private async assertOwnership(id: string, userId: string) {
    const project = await this.projectModel.findById(id);
    if (!project) throw new NotFoundException();
    if (project.owner.toString() !== userId) throw new ForbiddenException();
  }
}