import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  chakra,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface SearchInputProps {
  onSubmit: (value: string, model: string) => void;
  initialValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSubmit,
  initialValue,
}) => {
  const [inputValue, setInputValut] = useState(initialValue || "");
  const [modelType, setModelType] = useState("semantic");

  return (
    <chakra.form
      as="form"
      width="100%"
      maxW="xl"
      display="flex"
      alignItems="center"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(inputValue, modelType);
      }}
    >
      <InputGroup>
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
          h={12}
          w={12}
          children={<SearchIcon w={5} h={5}></SearchIcon>}
        ></InputRightElement>
      </InputGroup>
      <Select
        ml={4}
        value={modelType}
        width="44"
        onChange={(evt) => {
          setModelType(evt.target.value);
        }}
      >
        <option value="semantic">Semantic</option>
        <option value="idf">Idf</option>
      </Select>
    </chakra.form>
  );
};

export default SearchInput;
