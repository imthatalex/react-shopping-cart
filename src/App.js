import './App.css';
import {useState} from 'react';
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

/* TO-DO */

  // Style

/* TO-DO */


// Components Rendered in Cart
function ProductInCart({name, image, colors}){

  // State for Product Quantity
  const [productQuantity, setProductQuantity] = useState(1);


  // Using arrow expression to ensure the current value ~ S.R

  // Issue #001 : Charkra Drawer Component : onClose : Resets Product Quantity State
  function incrementQuantity(){
    setProductQuantity(productQuantity => productQuantity + 1);
  }

  function decrementQuantity(){
    if(productQuantity !== 0){
      setProductQuantity(productQuantity => productQuantity - 1);
    }
  }

  return(
    <>
    <div classsName="container">
      <div className="col">
        <div className="row">
          {name}
        </div>
        <div className="row">
          <img alt={name} src={image}/>
        </div>
        <div className="row">
          {productQuantity}
        </div>
        <div className="row">
          <ProductColors colors={colors}/>
        </div>
        <div className="row">
          <div className="col">
            <button className="product-bttn" onClick={incrementQuantity}>+1</button>
          </div>
          <div className="col">
          <button className="product-bttn" onClick={decrementQuantity}>-1</button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

  // W3 Side Menu Component
  function SideMenu({cart, pureProductDetails}){

    const productsInCart = [];

    const [toggleMenu, setToggleMenu] = useState(false)

    function openNav() {
      setToggleMenu(true);
    }

    function closeNav() {
      setToggleMenu(false);
    }

    pureProductDetails.forEach((item) => {
      for(let i = 0; i < cart.length; i++){
        if(cart[i] === item.props.name){
          productsInCart.push(
            <ProductInCart
              key={item.props.id}
              name={item.props.name}
              image={item.props.image}
              colors={item.props.colors}
            />
          );
        }
      }
    })

    return (
      <>
      <div id="mySidenav" style={{width: toggleMenu ? '350px' : '0'}} className="sidenav">
        <button className="closebtn" onClick={closeNav}>Close</button>
        {productsInCart}
      </div>

      <button className="product-bttn" onClick={openNav}>View Cart</button>
      </>
    )
  }


  // Chakra Drawer Component
  function CartDrawer({cart, pureProductDetails}) {
    // Chakra Controls
    const { isOpen, onOpen, onClose } = useDisclosure()

    const productsInCart = [];


    // Note : Limitation : forLoop : if cart [0] (first entry) is equal to pureProductDetails[0] : (first entry = 'basketball') : does not check every value

    // using forEach removes the limitation forLoop had on iterating through the fixed length of pureProductDetails
    // now it simply tests the condition for all elements in the array regardless of length

    // checks which Products have been added to cart
    // adds new Component to productsInCart reflecting the values of those in cart to Render those Products
      pureProductDetails.forEach((item) => {
        for(let i = 0; i < cart.length; i++){
          if(cart[i] === item.props.name){
            productsInCart.push(
              <ProductInCart
                key={item.props.id}
                name={item.props.name}
                image={item.props.image}
                colors={item.props.colors}
              />
            );
          }
        }
      })

    return (
      <>
        <Button onClick={onOpen}>View Cart</Button>
        <Drawer placement='right' isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
              {productsInCart}
            </DrawerBody>
            <Button onClick={onClose}> Close Cart </Button>
          </DrawerContent>
        </Drawer>
      </>
    )
  }


  // Navbar
function Navbar({cart, pureProductDetails, cartQuantity}){
  return (
    <div className="container">
      <div id="navbar" className="row">
        <div className="col">
          <div>Home</div>
        </div>
        <div className="col">
          <SideMenu cart={cart} pureProductDetails={pureProductDetails}/>
        </div>
        <div className="col">
          <div></div>
        </div>
        <div className="col">
          <CartDrawer cart={cart} pureProductDetails={pureProductDetails}/>
        </div>
        <div className="col">
          <div>Cart: {cartQuantity}</div>
        </div>
      </div>
    </div> 
  )
}


// Reads colors property value from dataSet and creates a div element to render the colors
function ProductColors({colors}){
  let exampleColors = [];

  for(let i = 0; i < colors.length; i++){
    exampleColors.push(<div key={colors[i]} style={{backgroundColor: colors[i]}} className="color-example"/>);
  }

  return (
    <>
      {exampleColors}
    </>
  )
}


 // Chakra Modal Component
function ProductModal({name, image, colors}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>View</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <div className="col">
            <div className="row">
              <img alt={name} src={image}/>
            </div>
            <div className="row">
              <ProductColors colors={colors}/>
            </div>
          </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

// Initial Product Component : Product Rendered in Home Page
function ProductDetail({image, name, colors, cart, setCart, cartQuantity, setCartQuantity}){

  // state used to disable add to cart func once product is added to cart to eliminate duplications
  const [addButtonDisabled, setAddButtonDisabled] = useState(false); 
  const [removeButtonDisabled, setRemoveButtonDisabled] = useState(true);

  function addToCart(){
    cart.push(name);
    setCart(cart);
    setCartQuantity(cartQuantity => cartQuantity + 1);
    
    for(let i = 0; i < cart.length; i++){
      if(cart[i] === name) {
        setAddButtonDisabled(true);
        setRemoveButtonDisabled(false);
      }
    }
  }

  function removeFromCart(){
      // Note : Limitation : pop method : removes only last element from array
      // filter is iterating through cart : if element value is not equal to name value, return value, since the value is equal it does not return 
      setCart(cart.filter(element => element !== name));
        
      if(cartQuantity !== 0){
        setCartQuantity(cartQuantity - 1);
      }
      // reactivates add to cart button once product is removed from cart
      setAddButtonDisabled(false);
      setRemoveButtonDisabled(true);
  }

  return(
    <>
      <div className="col product">
        <div className="row">
          {name}
        </div>
        <div className="row">
          <img alt={name} src={image}/>
        </div>
        <div className="row">
          <ProductColors colors={colors}/>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <button disabled={addButtonDisabled} className="product-bttn" onClick={addToCart}>Add</button>  
          </div>
          <div className="col-lg-4">
            <button disabled={removeButtonDisabled} className="product-bttn" onClick={removeFromCart}>Remove</button>  
          </div>
          <div className="col-lg-4">
            <ProductModal
              name={name}
              image={image}
              colors={colors}
            />
          </div>
        </div>
      </div>
    </>
  )
}




function ProductDetails({products}) { 
  // adds name of product to empty array to later cross check name with product name to render in cart
  const [cart, setCart] = useState([]);

  // displays number of products in cart
  const [cartQuantity, setCartQuantity] = useState(0);

  // Note : cannot mutate original arrays : pure programming
  const pureProductDetails = [];

  products.forEach((product) => {
      pureProductDetails.push(
        <ProductDetail 
          key={product.id} 
          image={product.image} 
          name={product.name} 
          colors={product.colors} 
          cart={cart} 
          setCart={setCart} 
          cartQuantity={cartQuantity} 
          setCartQuantity={setCartQuantity}
          />
      )
  })

  return (
    <>
      <Navbar cart={cart} pureProductDetails={pureProductDetails} cartQuantity={cartQuantity}/>
      {pureProductDetails}
    </>
  )

}


  export default function ProductList({products}){
    return(
      <div className="container">
        <div className="row">
          <ProductDetails products={products}/>
        </div>
      </div>        
    )
}