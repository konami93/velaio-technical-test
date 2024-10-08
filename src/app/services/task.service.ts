import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {}

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  createTask(newTask: Task): void {
    this.tasks.push(newTask);
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
  }
}
