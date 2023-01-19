import {
  Box,
  VStack,
  Text,
  Button,
  Heading,
  useDimensions,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRef } from 'react';
import { Instructor, Section } from '../../types';
import { SectionScoreBadge } from '../scoreBadge';

interface SectionListProps {
  sections: Section[];
  isInstructor?: boolean;
}

function getInstructorNames(instructors: Instructor[]) {
  return instructors.map((i) => i.name).join(', ');
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  isInstructor = false,
}) => {
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
              <Button variant="ghost" width="100%" p={0}>
                <Box
                  display="flex"
                  textAlign="left"
                  width="100%" // @ts-ignore
                  ref={leftRef}
                >
                  <Box width="100%">
                    <Flex
                      className="test"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Box width="90%">
                        {isInstructor && (
                          <>
                            <Text
                              noOfLines={0}
                              fontWeight={400}
                              maxWidth={leftDimensions?.borderBox.width}
                            >
                              {`${section.courseTitle} #${section.number}`}
                            </Text>

                            <Text noOfLines={0} fontWeight={400}>
                              {`${section.quarter} ${section.year}`}
                            </Text>
                          </>
                        )}
                        {!isInstructor && (
                          <>
                            <Box>
                              <Text
                                noOfLines={0}
                                fontWeight={400}
                                maxWidth={rightDimensions?.borderBox.width}
                              >
                                {getInstructorNames(section.instructors)}
                              </Text>
                            </Box>

                            <Text noOfLines={0} fontWeight={400}>
                              {`#${section.number} - ${section.quarter} ${section.year}`}
                            </Text>
                          </>
                        )}
                      </Box>
                      <Box width="10%">
                        <SectionScoreBadge section={section} />
                      </Box>
                    </Flex>
                  </Box>
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
