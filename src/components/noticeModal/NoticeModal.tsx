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
            Just for your awareness, this site is still in beta. I processed
            over 10,000{' '}
          </Text>
          <Link href="https://coursefeedback.uchicago.edu/" color="maroon">
            course evaluations
          </Link>
          <Text as="span">
            {' '}
            programmatically, so a few errors might have slipped through.
            <br />
            Please use the link at the bottom of any page to report bugs or
            inaccurate eval data.
          </Text>
          <br />
          <br />
          <Text as="span">
            That being said, the vast majority of this site&apos;s data is good,
            and I hope you find it useful!
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
