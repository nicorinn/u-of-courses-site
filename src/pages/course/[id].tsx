import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCourse, getCourseStats } from '../../api/evalsApi';
import { Course, Stats } from '../../types';

function isString(data: string | string[]): data is string {
  return typeof data === 'string';
}

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
  });

  return (
    course && (
      <Container>
        <Heading>{course.title}</Heading>
        <Box>
          <Text fontSize={22}>{course.courseNumbers.join(' - ')}</Text>
        </Box>
      </Container>
    )
  );
};

export default CoursePage;
