import { Box, Image, Button } from "@chakra-ui/react"

function Banner() {
  return<>
    <header>
      <Box d="flex" align-items="center" justifyContent="space-between" ml={6} mr={6}>
        <Box>
          <Image boxSize="90px" src="client/src/assets/logo.png" alt="paws logo" />
        </Box>
        <Box>
          <Button pr={3} colorScheme="gray.600" font-size="sm" variant="link">
            <a href="[placeholder-for-login-page-location]" alt="login to your paws account" target="_blank" rel="noopener noreferrer"></a>
            Login
        </Button>
        </Box>
      </Box>
    </header>
  </>;
}

export default Banner;