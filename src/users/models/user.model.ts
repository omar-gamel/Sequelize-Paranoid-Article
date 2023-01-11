import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'Users',
  paranoid: true
})
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ defaultValue: 0 })
  price: number;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @DeletedAt
  @Column({ type: DataType.DATE })
  deletedAt;
}
