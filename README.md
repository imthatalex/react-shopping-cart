# React Shopping Cart Component
This repository contains a simple shopping cart component built using React & Chakra. The component demonstrates how React handles state and how state can be passed down from parent components to child components.

### Features
- Add items to the cart
- Remove items from the cart
- Display the number of items in the cart

### Prerequisites
- npm (or yarn)
- Basic understanding of React and JSX

### Usage
1. Clone or Download the Repo.
2. Run npm i or yarn.
3. In your Index.js file, Insert & Update the Product List to use your Products.
```javascript
const productList = [
  { id: 0, name: 'Cap', colors: ['orange', 'blue', 'black'], image: 'balenciaga-c.jpeg' },
  { id: 1, name: 'Hoodie', colors: ['orange', 'blue', 'black'], image: 'balenciaga-h.jpeg' },
  { id: 2, name: 'T-Shirt', colors: ['orange', 'blue', 'black'], image: 'balenciaga-t.jpeg' },
]
```
4. Import the CSS Stylings. 
5. Import the Shopping Cart Component.

### Note
This component is intended to demonstrate the basic usage of React state and is not meant to be used in a production environment. There is no backend integration and no handling of any data persistence.
