import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Pantalla inicial con botones
  { path: 'create-task', component: TaskManagerComponent }, // Ruta para crear tareas
  { path: 'list-tasks', component: TaskListComponent }, // Ruta para listar tareas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
