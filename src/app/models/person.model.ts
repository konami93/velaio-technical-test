export interface Person {
  fullName: string;
  age: number;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
}
