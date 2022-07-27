import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import Logo from "../assets/logo.png";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

	return (
		<Container
			maxW="lg"
			py={{ base: "12", md: "24" }}
			px={{ base: "0", sm: "8" }}
		>
			<Stack spacing={"8"}>
				<Stack spacing="6">
					<Image src={Logo} boxSize="100px" />
				</Stack>
			</Stack>

			<Link to="/signup">← Go to Signup</Link>
			
			<Box>
			  <Heading as="h2">Login</Heading>
			</Box>

			<Box>
				<form onSubmit={handleFormSubmit}>
				  <FormControl>
					<Box className="flex-row space-between my-2">
						<FormLabel htmlFor="email">Email address:</FormLabel>
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
							mt="0.1"
							pt="1"
							pb="1"
							w="100%"
						/>
					</Box>
					{error ? (
						<Box>
							<p className="error-text">The provided credentials are incorrect</p>
						</Box>
					) : null}
					<Box className="flex-row flex-end">
						<Button
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
				</form>
			</Box>
		</Container>
	);
}

export default Login;
