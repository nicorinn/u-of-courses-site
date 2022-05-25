import axios from 'axios';
import {
  Course,
  Instructor,
  SearchResults as SearchResults,
  Section,
  Stats,
} from '../types';

const evalsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export async function searchEvals(query: string) {
  const res = await evalsApi.get(`/Search/SearchEvals?queryString=${query}`);
  if (res.status == 200) {
    return res.data as SearchResults;
  } else {
    console.error(`Error: status code ${res.status}`);
    return { courses: [], instructors: [] };
  }
}

export async function getCourse(courseId: number) {
  const res = await evalsApi.get(`/Courses/Course/${courseId}`);
  if (res.status == 200) {
    return res.data as Course;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getInstructor(instructorId: number) {
  const res = await evalsApi.get(`/Instructors/Instructor/${instructorId}`);
  if (res.status == 200) {
    return res.data as Instructor;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getSection(sectionId: number) {
  const res = await evalsApi.get(`/Sections/Section/${sectionId}`);
  if (res.status == 200) {
    return res.data as Section;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getCourseStats(courseId: number) {
  const res = await evalsApi.get(`/Courses/Stats/${courseId}`);
  if (res.status == 200) {
    return res.data as Stats;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getInstructorStats(instructorId: number) {
  const res = await evalsApi.get(`/Instructors/Stats/${instructorId}`);
  if (res.status == 200) {
    return res.data as Stats;
  } else {
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}
