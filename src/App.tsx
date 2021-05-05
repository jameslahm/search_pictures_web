import {
  Box,
  Center,
  ChakraProvider,
  extendTheme,
  Flex,
  Heading,
  Image,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import useSWR from "swr";
import SearchInput from "./components/SearchInput";
import BannerImage from "./banner.svg";
import ImageGrid from "./components/ImageGrid";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const theme = extendTheme({
  fonts: {
    heading: "'Allura', cursive;",
    body: "'Inter', sans-serif;",
  },
});

function App() {
  const [initialSearch, setInitialSearch] = useState(true);
  const timeRef = useRef({ startTime: -1, endTime: -1, elapsed: -1 });

  const [query, setQuery] = useState("");
  const [modelType, setModelType] = useState("semantic");
  const { data: images } = useSWR<string[], Error>(
    query ? [query, modelType] : null,
    (query, modelType) => {
      timeRef.current.startTime = performance.now();
      return fetch(`${BASE_URL}/api/search?query=${query}&model=${modelType}`, {
        method: "GET",
      }).then((res) => {
        timeRef.current.endTime = performance.now();
        timeRef.current.elapsed = Math.ceil(
          timeRef.current.endTime - timeRef.current.startTime
        );
        return res.json();
      });
    }
  );
  if (!images) {
    timeRef.current.elapsed = -1;
  }
  const handleSubmit = useCallback(
    (query, modelType) => {
      if (initialSearch) {
        setInitialSearch(false);
      }
      console.log(query, modelType);
      setQuery(query);
      setModelType(modelType);
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

          {query ? (
            <ImageGrid images={images}></ImageGrid>
          ) : (
            <Image mt={8} src={BannerImage}></Image>
          )}
        </Flex>
      )}
    </ChakraProvider>
  );
}

export default App;
