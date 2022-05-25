import { Box } from '@chakra-ui/react';
import { Instructor } from '../../types';

const InstructorResult: React.FC<{ instructor: Instructor }> = ({
  instructor,
}) => {
  return <Box>{instructor.name}</Box>;
};

export default InstructorResult;
