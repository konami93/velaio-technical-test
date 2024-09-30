import { Person } from './person.model';

export interface Task {
  id: string;
  name: string;
  deadline: Date;
  completed: boolean;
  assignedPeople: Person[];
}
