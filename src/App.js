
import './App.css';
import {useState} from 'react';

import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'



export default function ProductGallery({products}){
    return(
      <div className="container">
        <div className="row">
          <ProductImages products={products}/>
        </div>
      </div>        
    )
}

// cannot mutate original arrays : pure programming
function ProductImages({products}) {  
  const [cart, setCart] = useState([]);

  const [cartQuantity, setCartQuantity] = useState(0);
  

  const [productQuantity, setProductQuantity] = useState(products);



  // set state for product quantity and implement increment/decrement handler functions

  // aids in rendering
  const pureProductImages = [];

  products.forEach((product) => {
      pureProductImages.push(
        <ProductImage 
          key={product.id} 
          id={product.id}
          image={product.image} 
          name={product.name} 
          colors={product.colors} 
          cart={cart} 
          setCart={setCart} 
          cartQuantity={cartQuantity} 
          setCartQuantity={setCartQuantity}
          products={productQuantity}
          setProductQuantity={setProductQuantity}
          />
      )
  })

  return (
    <>
      <Navbar cart={cart} pureProductImages={pureProductImages} cartQuantity={cartQuantity}/>
      {pureProductImages}
    </>
  )

}

function Navbar({cartQuantity, cart, pureProductImages}){
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
          <CartDrawer cart={cart} pureProductImages={pureProductImages}/>
        </div>
        <div className="col">
          <div>Cart: {cartQuantity}</div>
        </div>
      </div>
    </div> 
  )
}


function ProductImage({image, name, colors, cart, setCart, cartQuantity, setCartQuantity, products, setProductQuantity}){

  const [disableButton, setDisableButton] = useState(false);


  function addToCart(){
    let pureQuantity = cartQuantity;

    // update products quantity

    setProductQuantity(...products,
      {quantity: pureQuantity + 1})

  
    
    cart.push(name);
    setCart(cart);
    setCartQuantity(pureQuantity + 1);

    console.log(cartQuantity, pureQuantity, products);

    if(pureQuantity > 0) {
      setDisableButton(true);
    }
  }

  function removeFromCart(){
  

      // pop method : removing last element from array
      
    
      if(cartQuantity === 0){
      // filter is iterating through cart : its asking : if element value is not equal to name value, return value, since the value is equal it does not return 
      setCart(cart.filter(element => element !== name));
      }

    
      if(cartQuantity !== 0){
        setCartQuantity(cartQuantity - 1);
      }
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
            <button disabled={disableButton} onClick={addToCart}>Add to Cart</button>  
          </div>
          <div className="col">
            <button onClick={removeFromCart}>Remove from Cart</button>  
          </div>
          <div className="col">
            <ProductModal/>
          </div>
        </div>
      </div>
    </>
  )
}

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



  // Chakra Drawer

  function CartDrawer({cart, pureProductImages}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const cartItems = [];

    // forLoop : if cart [0] (first entry) is equal to purePI[0] (first entry = 'basketball')
    function renderCart(pureProductImages){

    // using forEach removes the limitation forLoop had on iterating through the fixed length of pureProductImages
    // now it simply tests the condition for all elements in the array regardless of length
      pureProductImages.forEach((item) => {
        for(let i = 0; i < cart.length; i++){
          if(cart[i] === item.props.name){
            cartItems.push(item);
          }
        }
      })
          
    

    
      return (
        <div>{cartItems}</div>
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
              {renderCart(pureProductImages)}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
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



  // Remove from Cart Drawer
  // Product Modal Details
  // Cart Drawer Quantity Option



