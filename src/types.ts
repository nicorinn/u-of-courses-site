export interface Course {
  id: number;
  title: string;
  courseNumbers: string[];
  sections: Section[];
}

export interface Keyword {
  keyword: string;
  score: number;
}

export interface Section {
  id: number;
  courseId: number;
  number: number;
  year: number;
  quarter: string;
  sentiment: number;
  enrolledCount: number;
  respondentCount: number;
  isVirtual: boolean;
  hoursWorked: number | null;
  usefulFeedback: number | null;
  evaluatedFairly: number | null;
  standardsForSuccess: number | null;
  helpfulOutsideOfClass: number | null;
  keywords: Keyword[];
  instructors: Instructor[];
  courseTitle?: string;
  courseNumber?: string;
  url?: string;
}

export interface Instructor {
  id: number;
  name: string;
  sections: Section[];
}

export interface Stats {
  sectionCount: number;
  sentiment: number;
  enrolledCount: number;
  respondentCount: number;
  hoursWorked: StatComparison;
  usefulFeedback: StatComparison;
  evaluatedFairly: StatComparison;
  standardsForSuccess: StatComparison;
  helpfulOutsideOfClass: StatComparison;
}

export interface StatComparison {
  sectionCount: number;
  average?: number;
}

export interface CourseSearchResults {
  courses: Course[];
  count: number;
}

export interface InstructorSearchResults {
  instructors: Instructor[];
  count: number;
}
