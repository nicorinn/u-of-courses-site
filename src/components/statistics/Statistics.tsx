import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { Stats } from '../../types';

interface StatisticsProps {
  stats: Stats;
  type: 'course' | 'instructor';
}

function returnDoubleValueIfNotNull(description: string, value: number | null) {
  return (
    value && (
      <Text>
        {description}: <Text as="strong">{value * 2}</Text>
        /10
      </Text>
    )
  );
}

const Statistics: React.FC<StatisticsProps> = ({ stats, type }) => {
  return (
    <Box className="stats">
      <VStack spacing={5} alignItems="start">
        <Heading size="md" color="gray">
          stats:
        </Heading>
        {stats.hoursWorked && (
          <Text>
            workload: <Text as="strong">{stats.hoursWorked}</Text> hours
          </Text>
        )}
        {type === 'course' && (
          <>
            <Text>{`section count: ${stats.sectionCount}`}</Text>
            <Text>{`total enrolled: ${stats.enrolledCount}`}</Text>
          </>
        )}
        <Text>{`total respondents: ${stats.respondentCount}`}</Text>
        {type === 'instructor' && (
          <>
            {returnDoubleValueIfNotNull(
              'provided useful feedback',
              stats.usefulFeedback
            )}
            {returnDoubleValueIfNotNull('graded fairly', stats.evaluatedFairly)}
            {returnDoubleValueIfNotNull(
              'understandable standards for success',
              stats.standardsForSuccess
            )}
            {returnDoubleValueIfNotNull(
              'helpful outside of class',
              stats.helpfulOutsideOfClass
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Statistics;
