import {
  Container,
  VStack,
  Heading,
  Box,
  Divider,
  Link,
  HStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCourse, getCourseStats, getSection } from '../../api/evalsApi';
import { ComparisonChart } from '../../components/comparisonChart';
import { Keywords } from '../../components/keywords';
import { Course, Section, Stats } from '../../types';
import { isString } from '../../utils';

function getChartIfNotNull(
  sectionVal: number | null,
  averageVal: number | null,
  description: string
) {
  return (
    sectionVal &&
    averageVal && (
      <ComparisonChart
        sectionVal={sectionVal}
        totalVal={averageVal}
        label={description}
      />
    )
  );
}

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
  }, [router.query]);

  return (
    section &&
    course && (
      <Box>
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
        </Container>
        <VStack mt={10} mb={5} spacing={10} justifyContent="center">
          {stats && stats.sectionCount > 1 && (
            <>
              <ComparisonChart
                sectionVal={section.sentiment}
                totalVal={stats.sentiment}
                isSentiment
                label="sentiment score"
              />
              {getChartIfNotNull(
                section.hoursWorked,
                stats.hoursWorked,
                'hours worked'
              )}
              {getChartIfNotNull(
                section.evaluatedFairly,
                stats.evaluatedFairly,
                'graded fairly'
              )}
              {getChartIfNotNull(
                section.usefulFeedback,
                stats.usefulFeedback,
                'provided useful feedback'
              )}
              {getChartIfNotNull(
                section.standardsForSuccess,
                stats.standardsForSuccess,
                'understandable standards'
              )}
              {getChartIfNotNull(
                section.helpfulOutsideOfClass,
                stats.helpfulOutsideOfClass,
                'helpful outside of class'
              )}
            </>
          )}
          <Keywords keywords={section.keywords} height={200} width={300} />
        </VStack>
      </Box>
    )
  );
};

export default SectionPage;
