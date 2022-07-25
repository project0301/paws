import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import Logo from "../assets/logo.png";
import { Container, Image, Stack } from "@chakra-ui/react";

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

			<h2>Login</h2>
			<form onSubmit={handleFormSubmit}>
				<div className="flex-row space-between my-2">
					<label htmlFor="email">Email address:</label>
					<input
						placeholder="youremail@test.com"
						name="email"
						type="email"
						id="email"
						onChange={handleChange}
					/>
				</div>
				<div className="flex-row space-between my-2">
					<label htmlFor="pwd">Password:</label>
					<input
						placeholder="******"
						name="password"
						type="password"
						id="pwd"
						onChange={handleChange}
					/>
				</div>
				{error ? (
					<div>
						<p className="error-text">The provided credentials are incorrect</p>
					</div>
				) : null}
				<div className="flex-row flex-end">
					<button type="submit">Submit</button>
				</div>
			</form>
		</Container>
	);
}

export default Login;
