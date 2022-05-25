import { Box, Button, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Course } from '../../types';

const CourseResult: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Box width="100%">
      <NextLink href={`/course/${course.id}`}>
        <Button variant="ghost" width="100%">
          <Box textAlign="left" width="100%">
            <Text noOfLines={0} fontWeight={400}>
              {course.courseNumbers[0]} - {course.title}
            </Text>
          </Box>
        </Button>
      </NextLink>
    </Box>
  );
};

export default CourseResult;
