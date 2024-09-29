import { Person } from '../person/person.model';

export interface Task {
  id: number;
  name: string;
  deadline: Date;
  completed: boolean;
  assignedPeople: Person[];
}
