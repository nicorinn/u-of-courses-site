import { Course, Instructor, SearchResults } from '../types';

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

export function isSearchResults(data: any): data is SearchResults {
  const hasInstructors = data.instructors && isInstructorList(data.instructors);
  const hasCourses = data.courses && isCourseList(data.courses);
  const hasResults =
    data.courseResultsCount !== undefined &&
    data.instructorResultsCount !== undefined;
  return hasInstructors && hasCourses && hasResults;
}
