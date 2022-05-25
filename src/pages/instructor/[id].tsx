import { Container, VStack, Heading, Box, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getCourse,
  getInstructor,
  getInstructorStats,
} from '../../api/evalsApi';
import { SectionList } from '../../components/sectionList';
import { Statistics } from '../../components/statistics';
import { Instructor, Stats } from '../../types';
import { isString } from '../../utils';

const InstructorPage = () => {
  const router = useRouter();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [hasCourses, setHasCourses] = useState<boolean>(false);

  useEffect(() => {
    const { id } = router.query;
    if (id && isString(id)) {
      const instructorId = parseInt(id);

      (async () => {
        const instructorRes = await getInstructor(instructorId);
        const statsRes = await getInstructorStats(instructorId);
        if (instructorRes) {
          setInstructor(instructorRes);
        }
        setStats(statsRes);
      })();
    }
  }, [router.query]);

  useEffect(() => {
    if (instructor && !hasCourses) {
      const sections = instructor.sections;

      (async () => {
        for (let i = 0; i < sections.length; i++) {
          const course = await getCourse(sections[i].courseId);
          if (course) {
            sections[i].courseTitle = course.title;
          }
        }
        setInstructor({ ...instructor, sections });
        setHasCourses(true);
      })();
    }
  }, [instructor, hasCourses]);

  return (
    instructor && (
      <Container>
        <VStack mb={4}>
          <Heading textAlign="center">{instructor.name}</Heading>
          <Divider />
        </VStack>
        <Box mt={5} mb={5}>
          {hasCourses && (
            <SectionList
              sections={instructor.sections}
              hasCourseTitles={hasCourses}
            />
          )}
        </Box>
        <Divider />
        <Box mt={5}>
          {stats && <Statistics stats={stats} type="instructor" />}
        </Box>
      </Container>
    )
  );
};

export default InstructorPage;
