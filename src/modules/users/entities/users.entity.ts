import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn({ default: 1 })
  version: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toResponse(): Omit<User, 'password' | 'toResponse'> {
    const { id, login, version, createdAt, updatedAt } = this;

    return {
      id,
      login,
      version,
      createdAt,
      updatedAt,
    };
  }
}
