
import './App.css';
import {useState} from 'react';



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
      {pureProductImages}
    </>
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
      setCartQuantity(cartQuantity - 1);
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
        </div>
        <div className="row">
          <div className="col">
            {cartQuantity}
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





