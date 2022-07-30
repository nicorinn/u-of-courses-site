import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Heading, Input, Text } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { searchCourses, searchInstructors } from '../api/evalsApi';
import { SearchResultsList } from '../components/searchResultsList';
import { InstructorSearchResults, CourseSearchResults } from '../types';
import { debounce } from 'lodash';

const Home: NextPage = () => {
  const [query, setQuery] = useState('');
  const [courseResults, setCourseResults] =
    useState<CourseSearchResults | null>(null);
  const [instructorResults, setInstructorResults] =
    useState<InstructorSearchResults | null>(null);
  const [coursePage, setCoursePage] = useState(0);
  const [instructorPage, setInstructorPage] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useMemo(() => debounce(performSearch, 300), []);

  async function performSearch(text: string) {
    if (text) {
      setIsSearching(true);
      (async () => {
        const courseRes = await searchCourses(text);
        const instructorRes = await searchInstructors(text);
        setCourseResults(courseRes);
        setInstructorResults(instructorRes);
      })();
      setIsSearching(false);
    } else {
      setCourseResults(null);
      setInstructorResults(null);
    }
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  }

  async function extendInstructorSearch() {
    if (!isSearching && instructorResults) {
      setIsSearching(true);
      const instructorRes = await searchInstructors(query, instructorPage + 1);
      setInstructorResults({
        ...instructorResults,
        instructors: [
          ...instructorResults.instructors,
          ...instructorRes.instructors,
        ],
      });
      setInstructorPage(instructorPage + 1);
      setIsSearching(false);
    }
  }

  async function extendCourseSearch() {
    if (!isSearching && courseResults) {
      setIsSearching(true);
      const courseRes = await searchCourses(query, coursePage + 1);
      setCourseResults({
        ...courseResults,
        courses: [...courseResults.courses, ...courseRes.courses],
      });
      setCoursePage(coursePage + 1);
      setIsSearching(false);
    }
  }

  return (
    <div className="searchPage">
      <Head>
        <title>u of courses</title>
        <meta
          name="description"
          content="An alternative uchicago course evaluations site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="search">
        <Container minH="80vh">
          <Heading textAlign="center" mb={5}>
            <Text as="span">Welcome to</Text>{' '}
            <Text as="span" color="maroon">
              u of c
            </Text>
            <Text as="span">ourses!</Text>
          </Heading>
          <Text textAlign="center" mb={5}>
            Search for course name, number, or instructor
          </Text>
          <Input
            variant="filled"
            size="lg"
            placeholder="..."
            value={query}
            onChange={handleSearchChange}
          />
          {query && instructorResults && courseResults && (
            <SearchResultsList
              instructorResults={instructorResults}
              courseResults={courseResults}
              queryString={query}
              onInstructorsShowMoreClick={extendInstructorSearch}
              onCoursesShowMoreClick={extendCourseSearch}
              isLoading={isSearching}
            />
          )}
        </Container>
      </main>
    </div>
  );
};

export default Home;
