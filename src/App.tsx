import {
  Box,
  Center,
  ChakraProvider,
  extendTheme,
  Flex,
  Heading,
  SimpleGrid,
  Image,
  Skeleton,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import useSWR from "swr";
import SearchInput from "./components/SearchInput";
import BannerImage from "./banner.svg";

const theme = extendTheme({
  fonts: {
    heading: "'Allura', cursive;",
    body: "'Inter', sans-serif;",
  },
});

interface ImageResultProp {
  alt_description: string;
  id: string;
  urls: {
    thumb: string;
    raw: string;
    small: string;
  };
}

function App() {
  const [initialSearch, setInitialSearch] = useState(true);
  const timeRef = useRef({ startTime: -1, endTime: -1, elapsed: -1 });

  const [query, setQuery] = useState("");
  const { data: searchResults } = useSWR<ImageResultProp[], Error>(
    query ? query : null,
    (query) => {
      timeRef.current.startTime = performance.now();
      return fetch(`/search?query=${query}`, { method: "GET" }).then((res) => {
        timeRef.current.endTime = performance.now();
        timeRef.current.elapsed = Math.ceil(
          timeRef.current.endTime - timeRef.current.startTime
        );
        return res.json();
      });
    }
  );
  if (!searchResults) {
    timeRef.current.elapsed = -1;
  }
  const handleSubmit = useCallback(
    (query) => {
      if (initialSearch) {
        setInitialSearch(false);
      }
      setQuery(query);
    },
    [initialSearch]
  );

  return (
    <ChakraProvider theme={theme}>
      {initialSearch ? (
        <Center h="100%" flexDirection="column">
          <Heading size="3xl" mt={-28} mb={4}>
            Picture Search
          </Heading>
          <SearchInput onSubmit={handleSubmit}></SearchInput>
        </Center>
      ) : (
        <Flex flexDirection="column" alignItems="start" p={16} pt={12}>
          <ScaleFade
            in={!initialSearch}
            initialScale={0.8}
            style={{ width: "100%" }}
          >
            <Flex mb={8} flexDirection="row" width="100%" alignItems="center">
              <Heading size="xl" mr={6}>
                Pictures
              </Heading>
              <Box flex={1} display="flex" alignItems="center">
                <SearchInput
                  initialValue={query}
                  onSubmit={handleSubmit}
                ></SearchInput>
                {timeRef.current.elapsed > 0 ? (
                  <Text
                    ml={4}
                    fontSize="sm"
                    color={timeRef.current.elapsed > 5000 ? "red" : "blue"}
                  >
                    {timeRef.current.elapsed}
                    ms
                  </Text>
                ) : null}
              </Box>
            </Flex>
          </ScaleFade>
          <SimpleGrid width="100%" minChildWidth="120px" spacing="20px">
            {searchResults ? (
              searchResults.map((image, index) => {
                return (
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: index % 2 === 0 ? "10deg" : "-10deg",
                    }}
                    whileTap={{ scale: 0.95 }}
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
            ) : query ? (
              Array(27)
                .fill(0)
                .map((_, index) => {
                  console.log(searchResults);
                  return (
                    <Skeleton
                      key={index}
                      width="120px"
                      height="120px"
                    ></Skeleton>
                  );
                })
            ) : (
              <Image mt={8} src={BannerImage}></Image>
            )}
          </SimpleGrid>
        </Flex>
      )}
    </ChakraProvider>
  );
}

export default App;
