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

const MaintenanceModal: React.FC<{}> = () => {
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
        <ModalHeader>Maintenance Notice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text as="span">
            Hi, this site will have degraded functionality for the next few
            minutes due to maintentace (new features and bug fixes). This should
            be really fast.
            <br />
            <br />
            Thank you for your patience!
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

export default MaintenanceModal;
