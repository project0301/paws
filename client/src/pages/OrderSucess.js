import React, {useEffect} from 'React';
import {useMutations} from '@apollo/client';
import {ADD_ORDER} from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function sucess (){
    const [addOrder] = useMutation(ADD_ORDER);
}
useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [Add_Order]);

 return (
    <div>
        <Jumbotron>
            <h1>Order Placed</h1>
            <h2>Redirected to the Main page </h2>
        </Jumbotron>
    </div>
  );

  export default OrderScucess;

