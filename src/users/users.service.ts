import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName
    });
  }

  async findAll(): Promise<User[]> {
    await this.userModel.findAll({
      attributes: [
        [sequelize.fn('min', sequelize.col('price')), 'minPrice'],
        [sequelize.fn('max', sequelize.col('price')), 'maxPrice']
      ],
      raw: true
    });
    return this.userModel.findAll({
      paranoid: false
    });
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id
      }
    });
  }

  async softDestory(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async forceDestory(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy({ force: true });
  }

  async restoreUser(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id
      },
      paranoid: false
    });
    await user.restore();
    return user;
  }
}
