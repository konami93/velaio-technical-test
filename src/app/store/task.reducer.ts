import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { Task } from '../components/task/task.model';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const TaskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskActions.toggleTaskCompletion, (state, { taskId }) => {
    const updatedTasks = state.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    return {
      ...state,
      tasks: updatedTasks,
    };
  }),
  on(TaskActions.addPersonToTask, (state, { taskId, person }) => {
    const updatedTasks = state.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          assignedPeople: [...task.assignedPeople, person],
        };
      }
      return task;
    });
    return {
      ...state,
      tasks: updatedTasks,
    };
  }),
  on(TaskActions.removePersonFromTask, (state, { taskId, person }) => {
    const updatedTasks = state.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          assignedPeople: task.assignedPeople.filter(
            (p) => p.fullName !== person.fullName
          ),
        };
      }
      return task;
    });
    return {
      ...state,
      tasks: updatedTasks,
    };
  })
);
