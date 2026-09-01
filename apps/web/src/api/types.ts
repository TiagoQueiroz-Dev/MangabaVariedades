// Entity types generated from the API's OpenAPI document.
// Regenerate with: pnpm codegen:api
import type { components } from './schema';

export type Task = Omit<
  components['schemas']['TaskResponseDto'],
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string;
};
export type TaskStatus = Task['status'];
export type CreateTaskDto = components['schemas']['CreateTaskDto'];
export type UpdateTaskDto = components['schemas']['UpdateTaskDto'];

// Frontend-specific type for filtering (includes 'all')
export type TaskStatusFilter = TaskStatus | 'all';
