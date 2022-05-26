import {
  Box,
  Container,
  Divider,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getCourse, getCourseStats } from '../../api/evalsApi';
import { SectionList } from '../../components/sectionList';
import { Statistics } from '../../components/statistics';
import { Course, Stats } from '../../types';
import { isString } from '../../utils';

const CoursePage = () => {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const { id } = router.query;
    if (id && isString(id)) {
      const courseId = parseInt(id);

      (async () => {
        const courseRes = await getCourse(courseId);
        const statsRes = await getCourseStats(courseId);
        setCourse(courseRes);
        setStats(statsRes);
      })();
    }
  }, [router.query]);

  return (
    <div className="coursePage">
      <Head>
        <title>u of courses {`| ${course && course.title}`}</title>
        <meta
          name="description"
          content="The best uchicago course evaluations site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {course && (
        <Container>
          <VStack mb={4}>
            <Heading textAlign="center">{course.title}</Heading>
            <Box>
              <Text fontSize={22}>{course.courseNumbers.join(', ')}</Text>
            </Box>
            <Divider />
          </VStack>
          <Box mt={5} mb={5}>
            <SectionList sections={course.sections} />
          </Box>
          <Divider />
          <Box mt={5}>
            {stats && <Statistics stats={stats} type="course" />}
          </Box>
        </Container>
      )}
    </div>
  );
};

export default CoursePage;
