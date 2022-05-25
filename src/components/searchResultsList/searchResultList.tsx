import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { Course, Instructor } from '../../types';
import CourseResult from './courseResult';
import InstructorResult from './instructorResultsList';

interface SearchResultsListProps {
  courses: Course[];
  instructors: Instructor[];
  queryString: string;
}

function renderCourseResults(courses: Course[]) {
  return (
    <VStack spacing={5}>
      {courses.map((course) => (
        <CourseResult key={course.id} course={course} />
      ))}
    </VStack>
  );
}

function renderInstructorResults(instructors: Instructor[]) {
  return (
    <VStack spacing={5}>
      {instructors.map((instructor) => (
        <InstructorResult key={instructor.id} instructor={instructor} />
      ))}
    </VStack>
  );
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  courses,
  instructors,
  queryString,
}) => {
  return (
    <Tabs isFitted isLazy defaultIndex={0}>
      <TabList>
        <Tab>{`📚 Courses (${courses.length})`}</Tab>
        <Tab>{`🧑‍🏫 Instructors (${instructors.length})`}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{renderCourseResults(courses)}</TabPanel>
        <TabPanel>{renderInstructorResults(instructors)}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default SearchResultsList;
