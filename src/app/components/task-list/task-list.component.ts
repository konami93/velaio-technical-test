import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../task/task.model';
import { TaskState } from 'src/app/store/task.reducer';
import { Router } from '@angular/router';
import * as TaskActions from '../../store/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>;
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(
    private store: Store<{ task: TaskState }>,
    private router: Router
  ) {
    this.tasks$ = this.store.select((state) => state.task.tasks);
    this.filteredTasks$ = this.tasks$;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
    this.applyFilter();
  }

  private applyFilter() {
    this.filteredTasks$ = this.store.select((state) =>
      state.task.tasks.filter((task) => {
        if (this.filter === 'completed') {
          return task.completed;
        } else if (this.filter === 'pending') {
          return !task.completed;
        }
        return true;
      })
    );
  }

  toggleTaskCompletion(task: Task) {
    this.store.dispatch(TaskActions.toggleTaskCompletion({ taskId: task.id }));
  }
}
