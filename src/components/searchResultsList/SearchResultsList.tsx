import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Course, Instructor } from '../../types';
import CourseResults from './CourseResultsList';
import InstructorResult from './InstructorResultsList';

interface SearchResultsListProps {
  courses: Course[];
  instructors: Instructor[];
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
  courses,
  instructors,
  queryString,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

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
        >{`📚 Courses (${courses.length})`}</Tab>
        <Tab
          isDisabled={!instructors.length}
        >{`🧑‍🏫 Instructors (${instructors.length})`}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{renderCourseResults(courses)}</TabPanel>
        <TabPanel>{renderInstructorResults(instructors)}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default SearchResultsList;
