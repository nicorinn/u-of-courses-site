import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Link,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface NoticeModalProps {
  isOpen: boolean;
}

const NoticeModal: React.FC<{}> = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (firstLoad) {
      onOpen();
      setFirstLoad(false);
    }
  }, [firstLoad, onOpen]);

  return (
    <Modal isOpen={firstLoad || isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Beta Notice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text as="span">Welcome to u of courses!</Text>
          <br />
          <br />
          <Text as="span">
            Just for your awareness, some of this site&apos;s data may not be
            completely accurate. I processed over 10,000{' '}
          </Text>
          <Link href="https://coursefeedback.uchicago.edu/" color="maroon">
            course evaluations
          </Link>
          <Text as="span">
            {' '}
            programmatically, and I&apos;m still improving the code to extract
            text from images. I plan on adding a way to report inaccuracies
            soon.
          </Text>
          <br />
          <br />
          <Text as="span">
            That being said, most of this site&apos;s data is good, and I hope
            you find it useful!
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}>
            ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoticeModal;
