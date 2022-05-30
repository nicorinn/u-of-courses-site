import axios from 'axios';
import {
  Course,
  Instructor,
  InstructorSearchResults,
  CourseSearchResults,
  Section,
  Stats,
} from '../types';
import {
  isInstructorSearchResults,
  isCourseSearchResults,
} from './apiTypeGuards';

const evalsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export async function searchCourses(query: string, page = 0, pageSize = 15) {
  const res = await evalsApi.get<CourseSearchResults>(
    `/Courses/Search?queryString=${query}&page=${page}&pageSize=${pageSize}`
  );
  if (res.status == 200 && isCourseSearchResults(res.data)) {
    return res.data;
  } else {
    console.log(res.data);
    console.error(`Error: status code ${res.status}`);
    return {
      courses: [],
      count: 0,
    };
  }
}

export async function searchInstructors(
  query: string,
  page = 0,
  pageSize = 15
) {
  const res = await evalsApi.get<InstructorSearchResults>(
    `/Instructors/Search?queryString=${query}&page=${page}&pageSize=${pageSize}`
  );
  if (res.status == 200 && isInstructorSearchResults(res.data)) {
    return res.data;
  } else {
    console.log(res.data);
    console.error(`Error: status code ${res.status}`);
    return {
      instructors: [],
      count: 0,
    };
  }
}

export async function getCourse(courseId: number) {
  const res = await evalsApi.get<Course>(`/Courses/Course/${courseId}`);
  if (res.status == 200) {
    return res.data as Course;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getInstructor(instructorId: number) {
  const res = await evalsApi.get<Instructor>(
    `/Instructors/Instructor/${instructorId}`
  );
  if (res.status == 200) {
    return res.data as Instructor;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getSection(sectionId: number) {
  const res = await evalsApi.get<Section>(`/Sections/Section/${sectionId}`);
  if (res.status == 200) {
    return res.data as Section;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getCourseStats(courseId: number) {
  const res = await evalsApi.get<Stats>(`/Courses/Stats/${courseId}`);
  if (res.status == 200) {
    return res.data as Stats;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getInstructorStats(instructorId: number) {
  const res = await evalsApi.get<Stats>(`/Instructors/Stats/${instructorId}`);
  if (res.status == 200) {
    return res.data as Stats;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}
