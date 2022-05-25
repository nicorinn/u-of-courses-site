import { Box, Text } from '@chakra-ui/react';
import { Course } from '../../types';

const CourseResult: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Box width="100%">
      <Text noOfLines={0}>
        {course.courseNumbers[0]} - {course.title}
      </Text>
    </Box>
  );
};

export default CourseResult;
