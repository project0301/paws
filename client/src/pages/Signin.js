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
  Stack
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

			<Link to=".pages/signup">← Go to Signup</Link>
			
			<Box>
			  <Heading as="h2">Login</Heading>
			</Box>

			<Box>
				<FormControl onSubmit={handleFormSubmit}>
					<Box className="flex-row space-between my-2">
						<FormLabel htmlFor="email">Email address:</FormLabel>
						<Input
							placeholder="youremail@test.com"
							name="email"
							type="email"
							id="email"
							onChange={handleChange}
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
						/>
					</Box>
					{error ? (
						<Box>
							<p className="error-text">The provided credentials are incorrect</p>
						</Box>
					) : null}
					<Box className="flex-row flex-end">
						<Button type="submit">Submit</Button>
					</Box>
				</FormControl>
			</Box>
		</Container>
	);
}

export default Login;
