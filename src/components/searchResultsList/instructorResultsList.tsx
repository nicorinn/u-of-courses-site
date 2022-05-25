import { Box, Text } from '@chakra-ui/react';
import { Instructor } from '../../types';

const InstructorResult: React.FC<{ instructor: Instructor }> = ({
  instructor,
}) => {
  return (
    <Box width="100%">
      <Text noOfLines={0}>{instructor.name}</Text>
    </Box>
  );
};

export default InstructorResult;
