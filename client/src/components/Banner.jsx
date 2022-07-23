import { Box, Image, Button, ButtonGroup } from "@chakra-ui/react"

function Banner() {
  return<>
    <header>
      <Box d="flex" align-items="center" justifyContent="space-between" ml={6} mr={6}>
        <Box>
          <Image boxSize="90px" src="client/src/assets/logo.png" alt="paws logo" />
        </Box>
        <ButtonGroup>
          <Button pr={3} colorScheme="gray.600" font-size="sm" variant="link">
            <a href="[login-page-location-placeholder]" alt="login to your paws account" target="_blank" rel="noopener noreferrer"></a>
            Login
          </Button>
          <Button colorScheme="gray.600" fontSize="sm" variant="link">
            <a href="[cart-page-location-placeholder]" alt="go to your cart" target="_blank" rel="noopener noreferrer"></a>
            Cart
          </Button>
        </ButtonGroup>
      </Box>
    </header>
  </>;
}

export default Banner;