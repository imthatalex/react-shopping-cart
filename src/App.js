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



// created new product component : initial product component has unique state for button disabled, re renders when pushed to cart, resets state
function ProductInCart({name, image, colors, quantity, products, setProducts}){


  function incrementQuantity(){
      let incrementedProducts = products.map(item => {
        return {
          ...item,
          quantity: quantity + 1
        }
      })

      setProducts(incrementedProducts);
  }

  function decrementQuantity(){
    
  }

  return(
    <>
    <div className="col">
      <div className="row">
        {name}
      </div>
      <div className="row">
        {image}
      </div>
      <div className="row">
        {products.quantity}
      </div>
      <div className="row">
        <ProductColors colors={colors}/>
      </div>
      <div className="row">
        <div className="col">
          <ProductModal/>
        </div>
        <div className="col">
          <button onClick={incrementQuantity}>+1</button>
        </div>
        <div className="col">
        <button onClick={decrementQuantity}>-1</button>
        </div>
      </div>
    </div>
  </>
  )
}


  // Cart Drawer 

  function CartDrawer({cart, pureProductDetails}) {
    // Controls
    const { isOpen, onOpen, onClose } = useDisclosure()

    // passes Product Components in Cart to an empty array
    const productsInCart = [];

    // Limited : forLoop : if cart [0] (first entry) is equal to purePI[0] : (first entry = 'basketball')
    function renderCart(pureProductDetails){

    // using forEach removes the limitation forLoop had on iterating through the fixed length of pureProductDetails
    // now it simply tests the condition for all elements in the array regardless of length

      pureProductDetails.forEach((item) => {
        for(let i = 0; i < cart.length; i++){
          if(cart[i] === item.props.name){
            productsInCart.push(
              <ProductInCart
                key={item.props.id}
                name={item.props.name}
                image={item.props.image}
                colors={item.props.colors}
                quantity={item.props.quantity}
                products={item.props.products}
                setProducts={item.props.setProducts}
              />
            );
          }
        }
      })
    
      // renders Components in Cart
      return (
        <div>{productsInCart}</div>
      )
    }
  
    return (
      <>
        <Button onClick={onOpen}>View Cart</Button>
        <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
              {renderCart(pureProductDetails)}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }


  // Navbar

function Navbar({cart, pureProductDetails, cartQuantity}){
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div>Home</div>
        </div>
        <div className="col">
          <div></div>
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


// Colors : Modal : Details : Add to Cart : Remove from Cart : Increment/Decrement Quantity

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


 // Modal Example

 function ProductModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>View Product</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            hello
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


function ProductDetail({image, name, colors, cart, setCart, cartQuantity, setCartQuantity}){

  const [buttonDisabled, setButtonDisabled] = useState(false); 

  function addToCart(){
    // adds name of product to cart
    cart.push(name);
    setCart(cart);
    // increments cart quantity
    setCartQuantity(cartQuantity + 1);
    
    for(let i = 0; i < cart.length; i++){
      if(cart[i] === name) {
        setButtonDisabled(true);
      }
    }
  }

  function removeFromCart(){
      // Limited : pop method : removes only last element from array
      
      // filter is iterating through cart : if element value is not equal to name value, return value, since the value is equal it does not return 
      setCart(cart.filter(element => element !== name));
          
      // ensures cart quantity does not drop into negative values : decrements cart quantity
      if(cartQuantity !== 0){
        setCartQuantity(cartQuantity - 1);
      }
      setButtonDisabled(false);
  }

  return(
    <>
      <div className="col">
        <div className="row">
          {name}
        </div>
        <div className="row">
          {image}
        </div>
        <div className="row">
          <ProductColors colors={colors}/>
        </div>
        <div className="row">
          <div className="col">
            <button disabled={buttonDisabled} className="product-bttn" onClick={addToCart}>Add to Cart</button>  
          </div>
          <div className="col">
            <button className="product-bttn" onClick={removeFromCart}>Remove from Cart</button>  
          </div>
          <div className="col">
            <ProductModal/>
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

  const [pureProducts, setPureProducts] = useState(products)
  

  // set state for product quantity and implement increment/decrement handler functions

  // copy of products : cannot mutate original arrays : pure programming
  const pureProductDetails = [];

  products.forEach((product) => {
      pureProductDetails.push(
        <ProductDetail 
          key={product.id} 
          id={product.id}
          image={product.image} 
          name={product.name} 
          colors={product.colors} 
          quantity={product.quantity}
          products={pureProducts}
          setProducts={setPureProducts}
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



  export default function ProductGallery({products}){
    return(
      <div className="container">
        <div className="row">
          <ProductDetails products={products}/>
        </div>
      </div>        
    )
}