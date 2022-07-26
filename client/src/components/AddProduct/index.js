import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_PRODUCT } from "../../utils/mutations";

function AddProduct(props) {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    image: "",
    quantity: "",
    price: "",
    category: "",
  });
  const [AddProduct] = useMutation(ADD_PRODUCT);

  // const handle = useMutation(ADD_PRODUCT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await AddProduct({
      variables: {
        title: formState.title,
        description: formState.description,
        image: formState.image,
        quantity: formState.quantity,
        price: formState.price,
        category: formState.category,
      },
    });
  };

  return (
    // Ad title input
    <div class="m-2 text-lg">
      <div class="my-3 grid grid-cols-1 sm:grid-cols-5">
        <form action="/action_page.php" method="get" target="_blank">
          <label for="ad-title">Ad title: *required</label>
          <input type="text" id="ad-title" name="ad-title"></input>
        </form>
      </div>

      <div class="my-3 grid grid-cols-1 sm:grid-cols-5 flex grid-rows-5 sm:grid-rows-3">
        <form action="/action_page.php" method="get" target="_blank">
          <label for="description">Description: *required</label>
          <textarea type="text" id="description" name="description"></textarea>
        </form>
      </div>

      <div class="my-3 grid grid-cols-1 sm:grid-cols-5">
        <input
          className="file-upload-input"
          type="file"
          onchange="readURL(this)"
          accept="Image/*"
        ></input>
      </div>

      <div class="my-3 grid grid-cols-1 sm:grid-cols-5">
        <form action="/action_page.php" method="get" target="_blank">
          <label for="quantity">Quantity: *required</label>
          <input type="text" id="quantity" name="quantity"></input>
        </form>
      </div>

      <div class="my-3 grid grid-cols-1 sm:grid-cols-5">
        <form action="/action_page.php" method="get" target="_blank">
          <label for="quantity">Price: *required</label>
          <input
            type="number"
            step="0.01"
            id="product-price"
            placeholder="price"
            class="col-span-3 lg-col-span-2"
          />
        </form>
      </div>

      <div class="dropdown">
        <button class="dropbtn">
          Category
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="#">Dog</a>
          <a href="#">Cat</a>
          <a href="#">Other</a>
        </div>
      </div>

      <div class="my-3 grid grid-cols-1 sm:grid-cols-5">
        <label for="category" class="col-span-2">
          Category: *required
        </label>
        <select id="category" name="category" class="col-span-2 lg:col-span-1">
          <option value="1">Food</option>
          <option value="2">Outfit</option>
          <option value="3">Toys</option>
        </select>
      </div>
    </div>
  );
}

export default AddProduct;
