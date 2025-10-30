import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findById(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  createUser(userData: Partial<User>) {
    const user = new this.userModel(userData);
    return user.save();
  }
}
