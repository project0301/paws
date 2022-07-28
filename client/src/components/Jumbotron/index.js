import React from "react";
import { Box } from "@chakra-ui/react";

function Jumbotron({ children }) {
	return (
		<Box
			style={{
				height: 560,
				clear: "both",
				paddingTop: 120,
				textAlign: "center",
			}}
		>
			{children}
		</Box>
	);
}

export default Jumbotron;
