import { Container, VStack, Heading, Box, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getInstructor, getInstructorStats } from '../../api/evalsApi';
import { ComparisonChart } from '../../components/comparisonChart';
import { SectionList } from '../../components/sectionList';
import { Statistics } from '../../components/statistics';
import { Instructor, Stats } from '../../types';
import { isString } from '../../utils';

const InstructorPage = () => {
  const router = useRouter();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const { id } = router.query;
    if (id && isString(id)) {
      const instructorId = parseInt(id);

      (async () => {
        const instructorRes = await getInstructor(instructorId);
        const statsRes = await getInstructorStats(instructorId);
        setInstructor(instructorRes);
        setStats(statsRes);
      })();
    }
  }, [router.query]);

  return (
    instructor && (
      <Container>
        <VStack mb={4}>
          <Heading textAlign="center">{instructor.name}</Heading>
          <Divider />
        </VStack>
        <Box mt={5} mb={5}>
          <SectionList sections={instructor.sections} />
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
