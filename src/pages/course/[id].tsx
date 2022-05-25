import {
  Box,
  Container,
  Divider,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCourse, getCourseStats } from '../../api/evalsApi';
import { SectionList } from '../../components/sectionList';
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
        <VStack mb={4}>
          <Heading>{course.title}</Heading>
          <Box>
            <Text fontSize={22}>{course.courseNumbers.join(' - ')}</Text>
          </Box>
          <Divider />
        </VStack>
        <SectionList sections={course.sections} />
      </Container>
    )
  );
};

export default CoursePage;
