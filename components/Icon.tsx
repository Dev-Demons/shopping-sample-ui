import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// Internal Imports
import { GlobalIcon1 } from '../models/userModels';


function Icon({ disable, icon, title, component }: GlobalIcon1) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <button onClick={onOpen} disabled={disable}>
        <a className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
          <span>{icon}</span>
          <p className="text-sm">{title}</p>
        </a>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>{component}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Icon;
