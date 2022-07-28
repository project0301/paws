import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_PRODUCT } from "../../utils/mutations";
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";

function AddProduct(props) {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    image: "",
    quantity: 0,
    price: 0,
  });
  const [AddProduct] = useMutation(ADD_PRODUCT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting form");
    const mutationResponse = await AddProduct({
      variables: {
        name: formState.title,
        description: formState.description,
        image: formState.image,
        quantity: formState.quantity,
        price: formState.price,
      },
    });

    console.log(mutationResponse);
  };

  const handleOnChangeText = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
    console.log(formState);
  };
  const handleOnChangeQuantity = (event) => {
    let quantity = parseInt(event.target.value);
    setFormState({ ...formState, quantity: quantity });
  };
  const handleChangePrice = (event) => {
    let price = parseFloat(event.target.value);
    setFormState({ ...formState, price: price });
  };
  return (
    <Container className="container-my-2">
      <heading>Add Product</heading>
      <br></br>
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <h2>Title: *required</h2>
          <Box pos="relative">
            <Input
              onChange={handleOnChangeText}
              placeholder="add title"
              type="text"
              pl={"2"}
              mt="1"
              pt="5"
              pb="5"
              w="100%"
              id="title"
            ></Input>
          </Box>

          <h2>Description: *required</h2>
          <Box pos="relative">
            <Textarea
              pl={"2"}
              onChange={handleOnChangeText}
              placeholder="add description"
              type="text"
              id="description"
              mt="0.1"
              mb="3"
              pt="0.5"
              pb="1"
              w="100%"
              h="190px"
            ></Textarea>
          </Box>

          <input
            className="file-upload-input"
            type="file"
            onChange="readURL(this)"
            accept="Image/*"
            id="image"
            mt="1"
            mb="8"
            pt="5"
            pb="5"
            w="100%"
            h="150px"
          ></input>

          <h2>Quantity: *required</h2>
          <Box pos="relative">
            <Input
              pl={"2"}
              onChange={handleOnChangeQuantity}
              placeholder="enter quantity"
              type="number"
              id="quantity"
              mt="1"
              pt="5"
              pb="5"
              w="100%"
            ></Input>
          </Box>

          <h2>Price: *required</h2>
          <Box pos="relative">
            <Input
              type="number"
              onChange={handleChangePrice}
              step="0.01"
              placeholder="$ enter price "
              id="price"
              pl={"2"}
              mt="1"
              pt="5"
              pb="5"
              w="100%"
            ></Input>
          </Box>

          <div class="my-3 grid grid-cols-1 sm:grid-cols-5">
            <label for="category" class="col-span-2">
              Category: *required
            </label>
            <br></br>
            <select
              id="category"
              name="category"
              class="col-span-2 lg:col-span-1"
            >
              <option value="1">Food</option>
              <option value="2">Outfit</option>
              <option value="3">Toys</option>
              <option value="3">Other</option>
            </select>
          </div>
        </FormControl>
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
          Post Ad
        </Button>
      </form>
    </Container>
  );
}

export default AddProduct;
