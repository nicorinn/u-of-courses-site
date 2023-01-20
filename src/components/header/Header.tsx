import {
  HamburgerIcon,
  CloseIcon,
  QuestionOutlineIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';
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
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={IconButton}
              aria-label="menu"
              icon={
                isOpen ? (
                  <CloseIcon color="#800000" />
                ) : (
                  <HamburgerIcon color="#800000" />
                )
              }
              variant="ghost"
            />
            <MenuList defaultValue="test" bgColor="#000" color="#fff">
              <NextLink href="/info">
                <MenuItem
                  bgColor="black"
                  icon={<QuestionOutlineIcon />}
                  _focus={{ backgroundColor: 'black' }}
                >
                  Info
                </MenuItem>
              </NextLink>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};

export default Header;
