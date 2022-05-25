import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Heading, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { searchEvals } from '../api/evalsApi';

const Home: NextPage = () => {
  const [query, setQuery] = useState('');
  const [courseResults, setCourseResults] = useState([]);
  const [instructorResults, setInstructorResults] = useState([]);

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
    }
  }, [query]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  return (
    <div className="searchPage">
      <Head>
        <title>u-of-courses</title>
        <meta
          name="description"
          content="The best uchicago course evaluations site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="search">
        <Heading>Welcome to u-of-courses</Heading>
        <Text>Search for course name, number, or instructor</Text>
        <Input
          variant="filled"
          size="lg"
          value={query}
          onChange={handleSearchChange}
        />
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
