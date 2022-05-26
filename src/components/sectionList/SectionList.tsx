import { Box, VStack, Text, Button, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Instructor, Section } from '../../types';

function getInstructorNames(instructors: Instructor[]) {
  return instructors.map((i) => i.name).join(', ');
}

const SectionList: React.FC<{
  sections: Section[];
  hasCourseTitles: boolean;
}> = ({ sections, hasCourseTitles }) => {
  return (
    <Box className="sectionList">
      <VStack spacing={5}>
        <Box width="100%" textAlign="left">
          <Heading size="md" color="gray">
            sections:
          </Heading>
        </Box>
        {sections.map((section) => (
          <Box key={section.id} width="100%">
            <NextLink href={`/section/${section.id}`}>
              <Button variant="ghost" width="100%">
                <Box textAlign="left" width="100%">
                  {hasCourseTitles && (
                    <Text noOfLines={0} fontWeight={400}>
                      {section.courseTitle}
                    </Text>
                  )}
                  <Text noOfLines={0} fontWeight={400}>
                    {`#${section.number} - ${section.quarter} ${section.year}`}
                  </Text>
                </Box>
                <Box textAlign="right" width="100%">
                  <Text noOfLines={0} fontWeight={400}>
                    {getInstructorNames(section.instructors)}
                  </Text>
                </Box>
              </Button>
            </NextLink>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SectionList;
