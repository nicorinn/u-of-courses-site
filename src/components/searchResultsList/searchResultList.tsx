import { Box, VStack } from '@chakra-ui/react';
import { Course, Instructor, SearchResults } from '../../types';
import CourseResult from './courseResult';
import InstructorResult from './instructorResultsList';

interface SearchResultsListProps {
  courses: Course[];
  instructors: Instructor[];
  queryString: string;
}

function renderCourseResults(courses: Course[]) {
  return courses.map((course) => (
    <CourseResult key={course.id} course={course} />
  ));
}

function renderInstructorResults(instructors: Instructor[]) {
  return instructors.map((instructor) => (
    <InstructorResult key={instructor.id} instructor={instructor} />
  ));
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  courses,
  instructors,
  queryString,
}) => {
  return (
    <Box>
      <VStack>{renderCourseResults(courses)}</VStack>
      <VStack>{renderInstructorResults(instructors)}</VStack>
    </Box>
  );
};
export default SearchResultsList;
