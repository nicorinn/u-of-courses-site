import {
  Course,
  CourseSearchResults,
  Instructor,
  InstructorSearchResults,
} from '../types';

function isCourse(data: any): data is Course {
  return data.id && data.title && data.courseNumbers && data.sections;
}

function isInstructor(data: any): data is Instructor {
  return data.id && data.name && data.sections;
}

function isCourseList(data: any): data is Course[] {
  if (data.length === 0) {
    return true;
  } else {
    return data.length && isCourse(data[0]);
  }
}

function isInstructorList(data: any): data is Instructor[] {
  if (data.length === 0) {
    return true;
  } else {
    return data.length && isInstructor(data[0]);
  }
}

export function isInstructorSearchResults(
  data: any
): data is InstructorSearchResults {
  const hasInstructors = data.instructors && isInstructorList(data.instructors);
  return hasInstructors && data.count !== undefined;
}

export function isCourseSearchResults(data: any): data is CourseSearchResults {
  const hasCourses = data.courses && isCourseList(data.courses);
  return hasCourses && data.count !== undefined;
}
