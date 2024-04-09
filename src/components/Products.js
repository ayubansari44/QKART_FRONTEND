import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box, spacing } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Cart, { generateCartItemsFrom } from "./Cart";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
import "./Products.css";


/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */




 
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
//  * @property {string} productId - Unique ID for the product
//  */

// const Products = () => {

  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
  */
const Products = () =>
{
  // const [videosList, setVideosList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [fetchItems, setFetchItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debounce, setDebounce] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [apiResponseStatus, setApiResponseStatus] = useState();
  const [cart, setCart] = useState([])
  // const [cart2, setCart2] = useState([])


  const performAPICall = async () => {
    const url = `${config.endpoint}/products`;
    setisLoading(true);
    try {
      const response = await axios.get(url);
      const items = response.data;
      setFetchItems(items);
      setApiResponseStatus(response.status);
      // console.log(response.data);
      
    } catch (error)
    { 
      setApiResponseStatus(error.response.status);
      if (error.response.status === 500)
        enqueueSnackbar(error.response.data.message, { variant: 'error',autoHideDuration: 3000 })
    }
    setisLoading(false)
  };

  useEffect(() => {
    // fetchVideosData();
    const test=performAPICall(); 
  }, []);

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    setisLoading(true);
    try {
      const url = config.endpoint + "/products/search?value=" + text;
      const response = await axios.get(url);
      setFetchItems(response.data)
      setApiResponseStatus(response.status)
    } catch (error)
    {
      setApiResponseStatus(false)
    }
    setisLoading(false);

  };


  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */

  const debounceSearch = (event, debounceTimeout) => {
    setSearchInput(event.target.value)
    if (debounce !== 0)
      clearTimeout(debounce);
    
    const newTimeout = setTimeout(() => performSearch(event.target.value), debounceTimeout);
    setDebounce(newTimeout);
  };


  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  const getToken = localStorage.getItem('token');


  useEffect(() => {
    fetchCart()
  }, []);

  
  // generateCartItemsFrom(cart, fetchItems);



  //fetch items which are in /cart
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const url = config.endpoint + "/cart";
    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      
      const response = await axios.get(url, {
                        headers: {
                          'Authorization': `Bearer ${token}`
        }
      })
    
      setCart(response.data);
     
      // console.log(response);
      return cart;
      
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };



    // fetchCart(getToken);


  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    console.log(productId);
    console.log(items)
    // debugger;
    for (let i = 0; i < items.length; i++)
    {
      if (items[i]._id === productId)
      {
        return true;
        }
      }
    // items.forEach((item) => {
    //   if (item._id === productId)
    //     return true;
    // })

    return false;
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */

  const checkItemInCart = generateCartItemsFrom(cart, fetchItems);
  console.log(checkItemInCart)

  const addToCart = async (
  
    productId,
    qty,
    token,
    items,
    products,
    options = { preventDuplicate: false },
    
  ) => {

    // debugger;
    // console.log(options.preventDuplicate)
    if(options.preventDuplicate && isItemInCart(checkItemInCart, productId))
      {
        enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.", {autoHideDuration: 3000 , variant: "warning" });
       }
    if (!getToken)
    {
      enqueueSnackbar("Login to add an item to the Cart", {autoHideDuration: 3000 , variant: "error" });
      return;
    }


    try {
      const url = config.endpoint + "/cart";
      const body = {
        productId: productId,
        qty: qty
      };

        const response = await axios.post(url, body, {
          headers: {
            'Authorization': `Bearer ${getToken}`
          }
        });
        
        // if(isItemInCart(items, response.data.productId))
        setCart(response.data);
      
        // setCart(response.data);
     
      
    }

    catch (e) {
      
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { autoHideDuration: 3000 ,variant: "error" });
      }
      
      else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          // "Item already in cart. Use the cart sidebar to update quantity or remove item",
          {
            autoHideDuration: 3000 ,
            variant: "error",
          }
        );
      }
      return null;
    }
      
      
  };

  // console.log(cart);
  // console.log(fetchItems)

  // useEffect(() => {
  //   const getCartData =  () => {
  //     generateCartItemsFrom(cart, fetchItems);
  //   }
  //   getCartData()
  // }, [])

  // useEffect(() => {
  //   addToCart()
  // }, []);


  return (
    <div>
      {/* children={{debounceSearch:debounceSearch, searchInput:searchInput}} */}
      <Header >
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <Box mt={2}>
          <TextField
            className="search-desktop"
            size="small"
            fullWidth
            value={searchInput}
            inputProps={{style: {fontSize: 18, height:30, width:250}}} 
            InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
              ),
             }}
            placeholder="Search for items/categories"
            name="search-box"
            onChange={event => debounceSearch(event, 500)}
          />
          {/* <SearchIcon /> */}
      </Box>
      
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        variant="outlined" 
        size="large"
        inputProps={{style: {fontSize: 15}}} 
        fullWidth
        value={searchInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={event => debounceSearch(event, 500)}
      />
       <Grid container spacing={2}>
         <Grid item className="product-grid"  md={localStorage.getItem('username') ? 9 : 12}>
           <Box className="hero" mb={1}>
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step 
             </p>
           </Box>
          {
            isLoading &&
            <Grid item className="product-grid">
              <Box className="loading">
                <CircularProgress color="success" />
                <Typography>Loading Products</Typography>
              </Box>
              </Grid>
         }
         {
          
            apiResponseStatus !== 200 ? (
              <Grid item className="product-grid">
                <Box className="loading">
                  <SentimentDissatisfied />
                  <Typography>No Products Found</Typography>
                </Box>
              </Grid> 
          
            )
              :
              
              (
                <Grid container spacing={2} >
                {
                  fetchItems.map((product) => {
                  const { name, category, cost, rating, image, _id } = product;
                  return (
                      <Grid item xs={6} md={3} sm={3} key={_id}>
                        <ProductCard
                        product={product}
                        items={fetchItems}
                          
                        handleAddToCart={addToCart}
                        />
                      
                    </Grid>
                  )})  
                }
                
              </Grid>
              )
                
          
          }
        </Grid>
        {
          localStorage.getItem('token') ? <Grid item xs={12} sm={12} md={3}>
            
          <Cart products={fetchItems} items={cart} handleQuantity={addToCart} />
        </Grid> : null
        }
           {/* <Grid item xs={12} sm={12} md={3}>
            
           <Cart products={fetchItems} items={cart} handleQuantity={addToCart} />
         </Grid> */}
        
      </Grid>
      {/* /> */}
        {/* TODO: CRIO_TASK_MODULE_CART - Display the Cart component */}
      <Footer />
    </div>
  );
};

export default Products;
