import axios from 'axios';

const evalsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export async function searchEvals(query: string) {
  const res = await evalsApi.get(`/search?q=${query}`);
  if (res.status == 200) {
    return res.data;
  } else {
    console.error(`Error: status code ${res.status}`);
    return {};
  }
}

export async function getCourse(courseId: number) {
  const res = await evalsApi.get(`/course/${courseId}`);
  if (res.status == 200) {
    return res.data;
  } else {
    console.error(`Error: status code ${res.status}`);
    return {};
  }
}

export async function getInstructor(instructorId: number) {
  const res = await evalsApi.get(`/course/${instructorId}`);
  if (res.status == 200) {
    return res.data;
  } else {
    console.error(`Error: status code ${res.status}`);
    return {};
  }
}

export async function getSection(sectionId: number) {
  const res = await evalsApi.get(`/course/${sectionId}`);
  if (res.status == 200) {
    return res.data;
  } else {
    console.error(`Error: status code ${res.status}`);
    return {};
  }
}
