import { Box, Button, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Instructor } from '../../types';

const InstructorResult: React.FC<{ instructor: Instructor }> = ({
  instructor,
}) => {
  return (
    <Box width="100%">
      <NextLink href={`/instructor/${instructor.id}`}>
        <Button variant="ghost" width="100%">
          <Box textAlign="left" width="100%">
            <Text noOfLines={0} fontWeight={400}>
              {instructor.name}
            </Text>
          </Box>
        </Button>
      </NextLink>
    </Box>
  );
};

export default InstructorResult;
