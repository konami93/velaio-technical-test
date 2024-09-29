import { createAction, props } from '@ngrx/store';
import { Task } from '../components/task/task.model';
import { Person } from '../components/person/person.model';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

export const toggleTaskCompletion = createAction(
  '[Task] Toggle Task Completion',
  props<{ taskId: string }>()
);

export const addPersonToTask = createAction(
  '[Task] Add Person To Task',
  props<{ taskId: string; person: Person }>()
);

export const removePersonFromTask = createAction(
  '[Task] Remove Person From Task',
  props<{ taskId: string; person: Person }>()
);

export const loadTasksFailed = createAction(
  '[Task] Load Tasks Failed',
  props<{ error: any }>()
);
