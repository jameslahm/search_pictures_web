import {
  SimpleGrid,
  Skeleton,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

const ImageGrid: React.FC<{ images: string[] | undefined }> = ({ images }) => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const [focusImage, setFocusImage] = useState("");
  const initialFocusRef = useRef(null);
  return (
    <>
      <SimpleGrid width="100%" minChildWidth="120px" spacing="20px">
        {images
          ? images.map((image, index) => {
              return (
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: index % 2 === 0 ? "10deg" : "-10deg",
                  }}
                  onClick={() => {
                    setFocusImage(image);
                    onOpen();
                  }}
                  key={image}
                >
                  <Image
                    fallback={
                      <Skeleton
                        key={image}
                        width="120px"
                        height="120px"
                      ></Skeleton>
                    }
                    cursor="pointer"
                    borderRadius="md"
                    boxShadow="2xl"
                    src={image}
                    boxSize="120px"
                    objectFit="cover"
                    alt={image}
                  />
                </motion.div>
              );
            })
          : Array(27)
              .fill(0)
              .map((_, index) => {
                return (
                  <Skeleton key={index} width="120px" height="120px"></Skeleton>
                );
              })}
      </SimpleGrid>
      <Modal
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader isTruncated maxWidth="lg">
            {focusImage || "Cute Image !"}
          </ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <Image
              src={focusImage}
              alt={focusImage}
              fallback={<Skeleton width="100%" height="xs"></Skeleton>}
              boxShadow="lg"
              width="100%"
              maxHeight="md"
              borderRadius="md"
              objectFit="cover"
              ref={initialFocusRef}
            ></Image>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageGrid;
