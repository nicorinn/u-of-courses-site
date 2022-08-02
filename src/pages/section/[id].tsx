import {
  Container,
  VStack,
  Heading,
  Box,
  Divider,
  Link,
  HStack,
  useDimensions,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getCourse, getCourseStats, getSection } from '../../api/evalsApi';
import { ComparisonChart } from '../../components/comparisonChart';
import { Keywords } from '../../components/keywords';
import { Course, Section, Stats } from '../../types';
import { getChartHeight, getChartWidth, isString } from '../../utils';
import { SingleBarChart } from '../../components/singleBarChart';

const SectionPage = () => {
  const router = useRouter();
  const [section, setSection] = useState<Section | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const elementRef = useRef<HTMLElement>(null);
  const dimensions = useDimensions(elementRef, true);

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

  function getChartIfNotNull(
    sectionVal: number | null,
    averageVal: number | null,
    description: string,
    isHours = false
  ) {
    return (
      sectionVal &&
      averageVal && (
        <ComparisonChart
          currentVal={sectionVal}
          averageVal={averageVal}
          label={description}
          width={getChartWidth(dimensions)}
          height={getChartHeight(dimensions, 3)}
          isHours={isHours}
        />
      )
    );
  }

  const hasMultipleSections = stats && stats.sectionCount > 1;

  return (
    <div className="sectionPage">
      <Head>
        <title>u of courses {course ? `| ${course.title}` : ''}</title>
        <meta
          name="description"
          content="An alternative uchicago course evaluations site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Box // @ts-ignore
          ref={elementRef}
        >
          {section && course && (
            <Box>
              <VStack mb={4}>
                <Heading size="md" textAlign="center">
                  {`${section.quarter} ${section.year} - Section ${section.number}`}
                </Heading>
                <NextLink href={`/course/${course.id}`}>
                  <Link
                    textAlign="center"
                    color="maroon"
                  >{`${course.courseNumbers.join(', ')} - ${
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
              <VStack mt={10} mb={5} spacing={10} justifyContent="center">
                {hasMultipleSections ? (
                  <ComparisonChart
                    currentVal={section.sentiment}
                    averageVal={stats.sentiment}
                    isSentiment
                    label="sentiment score"
                    width={getChartWidth(dimensions)}
                    height={getChartHeight(dimensions, 3)}
                  />
                ) : (
                  <SingleBarChart
                    value={section.sentiment}
                    isSentiment
                    label="sentiment score"
                    width={getChartWidth(dimensions)}
                    height={getChartHeight(dimensions, 3)}
                  />
                )}
                {hasMultipleSections &&
                stats.hoursWorked !== section.hoursWorked
                  ? getChartIfNotNull(
                      section.hoursWorked,
                      stats.hoursWorked,
                      'hours worked',
                      true
                    )
                  : section.hoursWorked && (
                      <SingleBarChart
                        value={section.hoursWorked}
                        label="hours worked"
                        width={getChartWidth(dimensions)}
                        height={getChartHeight(dimensions, 3)}
                        isHours={true}
                      />
                    )}
                {hasMultipleSections &&
                stats.evaluatedFairly !== section.evaluatedFairly
                  ? getChartIfNotNull(
                      section.evaluatedFairly,
                      stats.evaluatedFairly,
                      'graded fairly'
                    )
                  : section.evaluatedFairly && (
                      <SingleBarChart
                        value={section.evaluatedFairly}
                        label="graded fairly"
                        width={getChartWidth(dimensions)}
                        height={getChartHeight(dimensions, 3)}
                      />
                    )}
                {hasMultipleSections &&
                stats.usefulFeedback !== section.usefulFeedback
                  ? getChartIfNotNull(
                      section.usefulFeedback,
                      stats.usefulFeedback,
                      'provided useful feedback'
                    )
                  : section.usefulFeedback && (
                      <SingleBarChart
                        value={section.usefulFeedback}
                        label="provided useful feedback"
                        width={getChartWidth(dimensions)}
                        height={getChartHeight(dimensions, 3)}
                      />
                    )}
                {hasMultipleSections &&
                stats.standardsForSuccess !== section.standardsForSuccess
                  ? getChartIfNotNull(
                      section.standardsForSuccess,
                      stats.standardsForSuccess,
                      'understandable standards'
                    )
                  : section.standardsForSuccess && (
                      <SingleBarChart
                        value={section.standardsForSuccess}
                        label="understandable standards"
                        width={getChartWidth(dimensions)}
                        height={getChartHeight(dimensions, 3)}
                      />
                    )}
                {hasMultipleSections &&
                stats.helpfulOutsideOfClass !== section.helpfulOutsideOfClass
                  ? getChartIfNotNull(
                      section.helpfulOutsideOfClass,
                      stats.helpfulOutsideOfClass,
                      'helpful outside of class'
                    )
                  : section.helpfulOutsideOfClass && (
                      <SingleBarChart
                        value={section.helpfulOutsideOfClass}
                        label="helpful outside of class"
                        width={getChartWidth(dimensions)}
                        height={getChartHeight(dimensions, 3)}
                      />
                    )}
                <Keywords
                  keywords={section.keywords}
                  width={getChartWidth(dimensions)}
                  height={getChartHeight(dimensions, 1.5)}
                />
                {section.url && (
                  <Link
                    href={section.url}
                    target="_blank"
                    rel="noreferrer"
                    textAlign="center"
                    color="maroon"
                    isExternal
                  >
                    view original course eval
                  </Link>
                )}
              </VStack>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default SectionPage;
