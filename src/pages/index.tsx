import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Heading, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { searchEvals } from '../api/evalsApi';
import { SearchResultsList } from '../components/searchResultsList';
import { Course, Instructor } from '../types';

const Home: NextPage = () => {
  const [query, setQuery] = useState('');
  const [courseResults, setCourseResults] = useState<Course[]>([]);
  const [instructorResults, setInstructorResults] = useState<Instructor[]>([]);

  useEffect(() => {
    if (query) {
      (async () => {
        const results = await searchEvals(query);
        if (results.courses) {
          setCourseResults(results.courses);
        }
        if (results.instructors) {
          setInstructorResults(results.instructors);
        }
      })();
    } else {
      setCourseResults([]);
      setInstructorResults([]);
    }
  }, [query]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  return (
    <div className="searchPage">
      <Head>
        <title>u of courses</title>
        <meta
          name="description"
          content="The best uchicago course evaluations site"
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
          {query && (
            <SearchResultsList
              courses={courseResults}
              instructors={instructorResults}
              queryString={query}
            />
          )}
        </Container>
      </main>
    </div>
  );
};

export default Home;
