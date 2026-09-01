import { z } from 'zod';
import { TaskSchema as TaskBaseSchema } from './generated';

// Re-export the generated base schema (from prisma/schema.prisma)
export { TaskSchema as TaskBaseSchema } from './generated';

// Task status enum
// The DB column is a plain string; valid values are enforced here.
export const TaskStatusSchema = z.enum(['todo', 'in-progress', 'done']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

// Task entity: generated base schema + domain validation
export const TaskSchema = TaskBaseSchema.extend({
  status: TaskStatusSchema,
});
export type Task = z.infer<typeof TaskSchema>;

// Create Task DTO schema
export const CreateTaskDtoSchema = z.object({
  title: TaskBaseSchema.shape.title
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: TaskBaseSchema.shape.description.optional().default(''),
});

export type CreateTaskDto = z.infer<typeof CreateTaskDtoSchema>;

// Update Task DTO schema
export const UpdateTaskDtoSchema = z.object({
  title: CreateTaskDtoSchema.shape.title.optional(),
  description: z.string().optional(),
  status: TaskStatusSchema.optional(),
});

export type UpdateTaskDto = z.infer<typeof UpdateTaskDtoSchema>;

// Query params schema for filtering tasks
export const TaskQueryParamsSchema = z.object({
  status: TaskStatusSchema.optional(),
  search: z.string().optional(),
});

export type TaskQueryParams = z.infer<typeof TaskQueryParamsSchema>;
