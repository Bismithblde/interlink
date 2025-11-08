export interface UserProfile {
  id: string;
  email: string;
  age?: number;
  gender?: string;
  major?: string;
  hobbies?: string[];
  classSchedule?: ClassSchedule[];
}

export interface ClassSchedule {
  day: string; // Monday, Tuesday, etc.
  startTime: string; // "09:00"
  endTime: string; // "10:30"
  courseName?: string;
}

export interface QuestionnaireData {
  age: number;
  gender: string;
  major: string;
  hobbies: string[];
  classSchedule: ClassSchedule[];
}
