import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement, chakra } from "@chakra-ui/react";
import React, { useState } from "react";

interface SearchInputProps {
  onSubmit: (value: string) => void;
  initialValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSubmit,
  initialValue,
}) => {
  const [inputValue, setInputValut] = useState(initialValue || "");

  return (
    <chakra.form
      as="form"
      width="100%"
      maxW="lg"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(inputValue);
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
    </chakra.form>
  );
};

export default SearchInput;
