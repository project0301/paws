import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_PRODUCT } from "../../utils/mutations";
import {
  Box,
  Button,
  Container,
  Heading,
  FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";

function AddProduct(props) {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    quantity: 0,
    price: 0,
    category: "",
  });
  const [AddProduct] = useMutation(ADD_PRODUCT);

  // Right now we can only supoort single Image upload, but in the future we can upload multiple images
  const [images, setImages] = React.useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting form");
    const mutationResponse = await AddProduct({
      variables: {
        name: formState.title,
        description: formState.description,
        image: images.length ? images[0]?.data_url : "",
        quantity: formState.quantity,
        price: formState.price,
        category: formState.category,
      },
    });

    console.log(mutationResponse);
  };

  const handleOnChangeText = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
    console.log(formState);
  };
  const handleOnChangeQuantity = (event) => {
    const quantity = parseInt(event.target.value);
    setFormState({ ...formState, quantity });
  };
  const handleChangePrice = (event) => {
    const price = parseFloat(event.target.value);
    setFormState({ ...formState, price });
  };
  const handleChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const handleChangeCategory = (event) => {
    const category = event.target.value;
    setFormState({ ...formState, category });
  };

  return (
    <Container className="container-my-2">
      <Heading>Add Product</Heading>
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

          <ImageUploading
            value={images}
            onChange={handleChangeImage}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div>
                <button onClick={onImageUpload}>Upload *required</button>
                {images.map((image, index) => (
                  <div key={index}>
                    <img src={image.data_url} alt=""></img>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>

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
              onChange={handleChangeCategory}
            >
              <option value="reptiles">Reptiles</option>
              <option value="dogs">Dogs</option>
              <option value="cats">Cats</option>
              <option value="birds">Birds</option>
              <option value="rodents">Rodents</option>
              <option value="fish">Fish</option>
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
