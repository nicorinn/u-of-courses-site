import {
  Container,
  VStack,
  Heading,
  Box,
  Divider,
  Link,
  Text,
  HStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCourse, getCourseStats, getSection } from '../../api/evalsApi';
import { Course, Section, Stats } from '../../types';
import { isString } from '../../utils';

const SectionPage = () => {
  const router = useRouter();
  const [section, setSection] = useState<Section | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const { id } = router.query;
    if (id && isString(id)) {
      const sectionId = parseInt(id);

      (async () => {
        const sectionRes = await getSection(sectionId);
        if (sectionRes?.courseId) {
          const courseRes = await getCourse(sectionRes.courseId);
          const statsRes = await getCourseStats(sectionRes.courseId);
          setCourse(courseRes);
          setStats(statsRes);
        }
        setSection(sectionRes);
      })();
    }
  });

  return (
    section &&
    course && (
      <Container>
        <VStack mb={4}>
          <Heading size="md" textAlign="center">
            {`${section.quarter} ${section.year} - Section ${section.number}`}
          </Heading>
          <NextLink href={`/course/${course.id}`}>
            <Link color="maroon">{`${course.courseNumbers.join(', ')} - ${
              course.title
            }`}</Link>
          </NextLink>
          <HStack>
            {section.instructors.map((i) => (
              <NextLink key={i.id} href={`/instructor/${i.id}`}>
                <Link color="maroon">{i.name}</Link>
              </NextLink>
            ))}
          </HStack>
          <Divider />
        </VStack>
        <Box mt={5} mb={5}></Box>
        <Divider />
      </Container>
    )
  );
};

export default SectionPage;
