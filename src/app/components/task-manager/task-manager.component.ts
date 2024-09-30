import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Task } from '../task/task.model';
import { Observable } from 'rxjs';
import { TaskState } from 'src/app/store/task.reducer';
import * as TaskActions from '../../store/task.actions';
import { v4 as uuidv4 } from 'uuid';
import { Skill } from '../person/person.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

function assignedPeopleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const assignedPeopleArray = control as FormArray;
    return assignedPeopleArray.length === 0 ? { empty: true } : null;
  };
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
})
export class TaskManagerComponent {
  taskForm: FormGroup;
  tasks$: Observable<Task[]>;
  skills: Skill[] = [];
  newPersonFullName = new FormControl('');
  newPersonAge = new FormControl('');
  newSkill = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private store: Store<{ task: TaskState }>,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]],
      deadline: ['', Validators.required],
      assignedPeople: this.fb.array([], assignedPeopleValidator()),
    });

    this.tasks$ = this.store.select((state) => state.task.tasks);
  }

  ngOnInit(): void {}

  get assignedPeople() {
    return this.taskForm.get('assignedPeople') as FormArray;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  createTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: uuidv4(),
        name: this.taskForm.value.name,
        deadline: this.taskForm.value.deadline,
        completed: false,
        assignedPeople: this.taskForm.value.assignedPeople || [],
      };

      this.store.dispatch(TaskActions.addTask({ task: newTask }));
      this.taskForm.reset();
      this.assignedPeople.clear();
    } else {
      console.warn('Form is invalid');
    }
  }

  addPerson() {
    const fullName = this.newPersonFullName.value;

    const personExists = this.assignedPeople.controls.some((person) => {
      return person.get('fullName')?.value === fullName;
    });

    if (personExists) {
      alert('Ya existe una persona con ese nombre');
      return;
    }

    if (
      this.newPersonFullName.value &&
      this.newPersonFullName.value.length >= 5 &&
      this.newPersonAge.value
    ) {
      const personForm = this.fb.group({
        fullName: [
          this.newPersonFullName.value,
          [Validators.required, Validators.minLength(5)],
        ],
        age: [
          this.newPersonAge.value,
          [Validators.required, Validators.min(19)],
        ],
        skills: [this.skills, [Validators.required]],
      });
      this.assignedPeople.push(personForm);
      this.newPersonFullName.reset();
      this.newPersonAge.reset();
      this.skills.splice(0);
    }
  }

  removePerson(index: number) {
    this.assignedPeople.removeAt(index);
  }

  addSkill() {
    if (this.newSkill.value) {
      const skill = {
        id: uuidv4(),
        name: this.newSkill.value,
      };
      this.skills.push(skill);
    }
    this.newSkill.reset();
  }

  removeSkills() {
    this.skills = [];
  }

  getSkillsString(): string {
    return this.skills.map((skill) => skill.name).join(', ');
  }

  isAgeValid(): boolean {
    const ageValue = this.newPersonAge?.value;
    return (
      ageValue !== null && ageValue !== undefined && parseInt(ageValue) >= 18
    );
  }
}
