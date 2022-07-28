import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from "./pages/Home";
import Detail from "./pages/ItemDetail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Signin";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
import Success from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";

import { Flex } from "@chakra-ui/react";

const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
	return (
		<ApolloProvider client={client}>
			<Elements stripe={stripePromise}>
				<Router>
					<StoreProvider>
						<Nav />
						<Flex>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/login" element={<Login />} />
								<Route path="/signup" element={<Signup />} />
								<Route path="/success" element={<Success />} />
								<Route path="/orders" element={<OrderHistory />} />
								<Route path="/products/:id" element={<Detail />} />
								<Route element={<NoMatch />} />
							</Routes>
						</Flex>
					</StoreProvider>
				</Router>
			</Elements>
		</ApolloProvider>
	);
}

export default App;
