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
import { ImageResultProp } from "../types";

const ImageGrid: React.FC<{ searchResults: ImageResultProp[] | undefined }> = ({
  searchResults,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const [focusImage, setFocusImage] = useState({ urls: {} } as ImageResultProp);
  const initialFocusRef = useRef(null);
  return (
    <>
      <SimpleGrid width="100%" minChildWidth="120px" spacing="20px">
        {searchResults
          ? searchResults.map((image, index) => {
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
                  key={image.id}
                >
                  <Image
                    fallback={
                      <Skeleton
                        key={image.id}
                        width="120px"
                        height="120px"
                      ></Skeleton>
                    }
                    cursor="pointer"
                    borderRadius="md"
                    boxShadow="2xl"
                    src={image.urls.thumb}
                    boxSize="120px"
                    objectFit="cover"
                    alt={image.alt_description}
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
          <ModalHeader textTransform="capitalize" isTruncated maxWidth="lg">
            {focusImage.alt_description || "Image !"}
          </ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <Image
              src={focusImage.urls.small}
              alt={focusImage.alt_description}
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
