import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container className="container my-1">
      <Link to="/login">← Go to Signin</Link>

      <Heading as="h2">Signup</Heading>
      <br></br>
      <FormControl onSubmit={handleFormSubmit}>
        <Box className="flex-row space-between my-2">
          <FormLabel htmlFor="firstName">First Name:</FormLabel>
          <Input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
            pl={"2"}
            mt="0.1"
            pt="5"
            pb="5"
            w="100%"
          />
        </Box>
        <Box className="flex-row space-between my-2">
          <FormLabel htmlFor="lastName">Last Name:</FormLabel>
          <Input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
            pl={"2"}
            mt="0.1"
            pt="5"
            pb="5"
            w="100%"
          />
        </Box>
        <Box className="flex-row space-between my-2">
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            pl={"2"}
            mt="0.1"
            pt="5"
            pb="5"
            w="100%"
          />
        </Box>
        <Box className="flex-row space-between my-2">
          <FormLabel htmlFor="pwd">Password:</FormLabel>
          <Input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            pl={"2"}
            mt="1"
            pt="5"
            pb="5"
            w="100%"
          />
        </Box>
        <Box className="flex-row flex-end">
          <Button
            size="md"
            type="submit"
            _hover={{ opacity: "0.8" }}
            mt="5"
            pt="5"
            pb="5"
            w="22%"
            color="#black"
            bg="gray.200"
            fontSize="lg"
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </Container>
  );
}

export default Signup;
