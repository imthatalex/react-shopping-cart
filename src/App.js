
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

  // aids in rendering
  const pureProductImages = [];

  products.forEach((product) => {
      pureProductImages.push(
        <ProductImage 
          key={product.id} 
          image={product.image} 
          name={product.name} 
          colors={product.colors} 
          cart={cart} 
          setCart={setCart} 
          cartQuantity={cartQuantity} 
          setCartQuantity={setCartQuantity}/>
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


function ProductImage({image, name, colors, cart, setCart, cartQuantity, setCartQuantity}){

  

  function addToCart(){
    cart.push(name);
    setCart(cart);
    console.log(cart);
    setCartQuantity(cartQuantity + 1);
  }

  function removeFromCart(){
      cart.pop(name);
      setCart(cart);
      console.log(cart);
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
            <button onClick={addToCart}>Add to Cart</button>  
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

    function renderCart(cart){
      for(let i = 0; i < cart.length; i++){
        cartItems.push(cart[i]);
      }
    
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
              {renderCart(cart)}
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

