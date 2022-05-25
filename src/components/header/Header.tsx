import { Box, Flex, Heading, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';

const Header = () => {
  return (
    <Flex
      as="header"
      p={2}
      align="center"
      width="100%"
      bgColor="black"
      zIndex={9999}
      top={0}
    >
      <Box>
        <NextLink href="/">
          <Link color="white">
            <Heading>u of courses</Heading>
          </Link>
        </NextLink>
      </Box>
      <Spacer />
    </Flex>
  );
};

export default Header;
