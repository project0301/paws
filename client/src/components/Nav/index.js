import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Box, Heading, List, ListItem, UnorderedList, } from '@chakra-ui/react'

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Box>
          <List>
            <UnorderedList className="flex-row">
              <ListItem className="mx-1">
                <Link to="/orderHistory"> Order History </Link>
              </ListItem>
              <ListItem className="mx-1">
                {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                <a href="/" alt="logout of your pet stuff plus account" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </ListItem>
            </UnorderedList>
          </List>
        </Box>
      );
    } else {
      return (
        <Box>
          <List>
            <UnorderedList className="flex-row">
              <ListItem className="mx-1">
                <Link to="/signup">Sign Up</Link>
              </ListItem>
              <ListItem className="mx-1">
                <Link to="/login">Login</Link>
              </ListItem>
            </UnorderedList>
          </List>
        </Box>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <Heading as='h1' size='3xl' noOfLines={1}>
        <Link to="/">
          <span role="img" aria-label="shopping bag">
            🛍️
          </span>
          Pet Stuff Plus
        </Link>
      </Heading>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
