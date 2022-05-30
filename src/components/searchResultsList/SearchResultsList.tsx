import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  Course,
  Instructor,
  InstructorSearchResults,
  CourseSearchResults,
} from '../../types';
import CourseResults from './CourseResults';
import InstructorResult from './InstructorResults';

interface SearchResultsListProps {
  courseResults: CourseSearchResults;
  instructorResults: InstructorSearchResults;
  queryString: string;
  isLoading: boolean;
  onInstructorsShowMoreClick: () => void;
  onCoursesShowMoreClick: () => void;
}

function renderCourseResults(courses: Course[]) {
  return (
    <VStack className="courseResults" spacing={5}>
      {courses.map((course) => (
        <CourseResults key={course.id} course={course} />
      ))}
    </VStack>
  );
}

function renderInstructorResults(instructors: Instructor[]) {
  return (
    <VStack className="instructorResults" spacing={5}>
      {instructors.map((instructor) => (
        <InstructorResult key={instructor.id} instructor={instructor} />
      ))}
    </VStack>
  );
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  courseResults,
  instructorResults,
  queryString,
  onInstructorsShowMoreClick,
  onCoursesShowMoreClick,
  isLoading,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const { courses, count: courseCount } = courseResults;
  const { instructors, count: instructorCount } = instructorResults;

  useEffect(() => {
    if (!courses.length && instructors.length) {
      setTabIndex(1);
    } else if (!instructors.length && courses.length) {
      setTabIndex(0);
    }
  }, [courses.length, instructors.length]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs isFitted isLazy index={tabIndex} onChange={handleTabsChange}>
      <TabList>
        <Tab isDisabled={!courses.length}>{`📚 Courses (${courseCount})`}</Tab>
        <Tab
          isDisabled={!instructors.length}
        >{`🧑‍🏫 Instructors (${instructorCount})`}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {renderCourseResults(courses)}
          {courseCount > courses.length && (
            <Box textAlign="center" mt={5}>
              <Button
                color="maroon"
                onClick={onCoursesShowMoreClick}
                isLoading={isLoading}
              >
                Show more
              </Button>
            </Box>
          )}
        </TabPanel>
        <TabPanel>
          {renderInstructorResults(instructors)}
          {instructorCount > instructors.length && (
            <Box textAlign="center" mt={5}>
              <Button
                color="maroon"
                onClick={onInstructorsShowMoreClick}
                isLoading={isLoading}
              >
                Show more
              </Button>
            </Box>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default SearchResultsList;
