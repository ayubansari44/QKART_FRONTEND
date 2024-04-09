import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

// { product, handleAddToCart }

const ProductCard = ({ product,items, handleAddToCart }) => {
  
  // console.log(product._id)
 
  return (
    <Card className="card">
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.cost}
        </Typography>
        {/* <Typography component="legend">Read only</Typography> */}
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <Button className="button" id="registerButton" variant="contained" onClick={() => handleAddToCart(product._id, 1,null,items,null, { preventDuplicate:true }) }>
        <AddShoppingCartOutlined />
            ADD TO CART
      </Button>
      
    </Card>
  );
};

export default ProductCard;
