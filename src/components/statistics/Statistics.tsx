import { Box, Heading, VStack, Text, useDimensions } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { Stats } from '../../types';
import { getChartHeight, getChartWidth } from '../../utils';
import { SingleBarChart } from '../singleBarChart';

interface StatisticsProps {
  stats: Stats;
  type: 'course' | 'instructor';
}

function returnDoubleValueIfNotNull(
  description: string,
  value: number | null | undefined
) {
  return (
    value && (
      <Text>
        {description}: <Text as="strong">{(value * 2).toFixed(1)}</Text>
        /10
      </Text>
    )
  );
}

const Statistics: React.FC<StatisticsProps> = ({ stats, type }) => {
  const elementRef = useRef<HTMLElement>(null);
  const dimensions = useDimensions(elementRef);

  return stats ? (
    // @ts-ignore
    <Box ref={elementRef} className="stats">
      <VStack spacing={5} alignItems="start">
        <Heading size="md" color="gray">
          stats:
        </Heading>
        <SingleBarChart
          isSentiment
          value={stats.sentiment}
          label="sentiment score"
          width={getChartWidth(dimensions)}
          height={getChartHeight(dimensions, 3)}
        />
        {stats.hoursWorked.average && (
          <Text>
            workload:{' '}
            <Text as="strong">{stats.hoursWorked.average.toFixed(0)}</Text>{' '}
            hours
          </Text>
        )}
        {type === 'course' && (
          <>
            <Text>{`section count: ${stats.sectionCount}`}</Text>
            <Text>{`total enrolled: ${stats.enrolledCount}`}</Text>
          </>
        )}
        {type === 'instructor' && (
          <>
            {returnDoubleValueIfNotNull(
              'provided useful feedback',
              stats.usefulFeedback.average
            )}
            {returnDoubleValueIfNotNull(
              'graded fairly',
              stats.evaluatedFairly.average
            )}
            {returnDoubleValueIfNotNull(
              'understandable standards for success',
              stats.standardsForSuccess.average
            )}
            {returnDoubleValueIfNotNull(
              'helpful outside of class',
              stats.helpfulOutsideOfClass.average
            )}
          </>
        )}
        <Text>{`total respondents: ${stats.respondentCount}`}</Text>
      </VStack>
    </Box>
  ) : null;
};

export default Statistics;
