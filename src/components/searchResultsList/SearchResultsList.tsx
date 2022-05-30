import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Course, Instructor, SearchResults } from '../../types';
import CourseResults from './CourseResults';
import InstructorResult from './InstructorResults';

interface SearchResultsListProps {
  searchResults: SearchResults;
  queryString: string;
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
  searchResults,
  queryString,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const { instructors, courses, courseResultsCount, instructorResultsCount } =
    searchResults;

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
        <Tab
          isDisabled={!courses.length}
        >{`📚 Courses (${courseResultsCount})`}</Tab>
        <Tab
          isDisabled={!instructors.length}
        >{`🧑‍🏫 Instructors (${instructorResultsCount})`}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{renderCourseResults(courses)}</TabPanel>
        <TabPanel>{renderInstructorResults(instructors)}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default SearchResultsList;
