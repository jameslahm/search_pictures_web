import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  chakra,
  Select,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface SearchInputProps {
  onSubmit: (value: string, count: number, model: string) => void;
  initialValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSubmit,
  initialValue,
}) => {
  const [inputValue, setInputValut] = useState(initialValue || "");
  const [count, setCount] = useState(20);
  const [modelType, setModelType] = useState("semantic");

  return (
    <chakra.form
      as="form"
      width="100%"
      maxW="2xl"
      display="flex"
      alignItems="center"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(inputValue, count, modelType);
      }}
    >
      <InputGroup mr={4}>
        <Input
          borderRadius="3xl"
          size="lg"
          value={inputValue}
          onChange={(evt) => {
            setInputValut(evt.target.value);
          }}
          placeholder="Search your interested pictures"
        ></Input>
        <InputRightElement
          onClick={() => {
            onSubmit(inputValue, count, modelType);
          }}
          h={12}
          w={12}
          cursor="pointer"
          children={<SearchIcon w={5} h={5}></SearchIcon>}
        ></InputRightElement>
      </InputGroup>
      <NumberInput
        size="md"
        maxW={32}
        value={count}
        onChange={(_, number) => {
          setCount(number);
        }}
        min={10}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Select
        ml={4}
        width="3xs"
        value={modelType}
        onChange={(evt) => {
          setModelType(evt.target.value);
        }}
      >
        <option value="semantic">Semantic</option>
        <option value="idf">Idf</option>
      </Select>
      <Button type="submit" hidden></Button>
    </chakra.form>
  );
};

export default SearchInput;
