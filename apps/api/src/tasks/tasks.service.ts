import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskSchema } from '@repo/shared-types';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string, search?: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        ...(status && status !== 'all' ? { status } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' as const } },
                {
                  description: { contains: search, mode: 'insensitive' as const },
                },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: 'asc' },
    });
    // Validate DB rows against the shared schema (also narrows `status` to TaskStatus)
    return TaskSchema.array().parse(tasks);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return TaskSchema.parse(task);
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
      },
    });
    return TaskSchema.parse(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id);
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
    return TaskSchema.parse(task);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.task.delete({ where: { id } });
  }
}
