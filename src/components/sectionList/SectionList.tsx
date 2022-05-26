import {
  Box,
  VStack,
  Text,
  Button,
  Heading,
  useDimensions,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRef } from 'react';
import { Instructor, Section } from '../../types';

function getInstructorNames(instructors: Instructor[]) {
  return instructors.map((i) => i.name).join(', ');
}

const SectionList: React.FC<{
  sections: Section[];
  isInstructor: boolean;
}> = ({ sections, isInstructor }) => {
  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);
  const leftDimensions = useDimensions(leftRef);
  const rightDimensions = useDimensions(leftRef);

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
                <Box
                  textAlign="left"
                  width="100%" // @ts-ignore
                  ref={leftRef}
                >
                  {isInstructor && (
                    <Text
                      noOfLines={0}
                      fontWeight={400}
                      maxWidth={leftDimensions?.borderBox.width}
                    >
                      {section.courseTitle}
                    </Text>
                  )}
                  <Text noOfLines={0} fontWeight={400}>
                    {`#${section.number} - ${section.quarter} ${section.year}`}
                  </Text>
                </Box>
                {!isInstructor && (
                  <Box
                    textAlign="right"
                    width="100%" // @ts-ignore
                    ref={rightRef}
                  >
                    <Text
                      noOfLines={0}
                      fontWeight={400}
                      maxWidth={rightDimensions?.borderBox.width}
                    >
                      {getInstructorNames(section.instructors)}
                    </Text>
                  </Box>
                )}
              </Button>
            </NextLink>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SectionList;
