import React, { useContext } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { CartContext } from "../utilits/CartContext";

const ProductItem = ({ name, price, id, add }) => {
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    const product = { name, price, count: 1 };
    setCart((currentState) => {
      if (currentState.find((item) => item.name === name)) {
        currentState.find((item) => item.name === name).count += 1;
        return [...currentState];
      } else {
        return [...currentState, product];
      }
    });
    add()
  };


  //Использованы плэйсхолдеры вместо картинок товара

  return (
    <Grid item xs={12} sm={6} lg={4} md={4} xl={3}>  
      <Card className="ProductItem">
        <CardMedia
          component="img"
          height="5%"
          alt="product image"
          image={"http://picsum.photos/700/300?random=" + id}
        ></CardMedia>
        <CardContent>
          <Typography variant="h2">{name}</Typography>
          <Typography gutterBottom variant="h5">
            {price} рублей
          </Typography>
          <Button variant="contained" color="secondary" onClick={addToCart}>
            ADD TO CART
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default ProductItem;
