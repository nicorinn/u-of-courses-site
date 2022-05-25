import { Box } from '@chakra-ui/react';
import { Course } from '../../types';

const CourseResult: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Box>
      {course.courseNumbers[0]} - {course.title}
    </Box>
  );
};

export default CourseResult;
