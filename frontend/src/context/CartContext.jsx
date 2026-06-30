import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';

const CartContext = createContext();
const API = 'http://localhost:5000/api/cart';

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.items;
    case 'ADD_ITEM': {
      const existing = state.find(i => i.itemId === action.item._id);
      if (existing) {
        return state.map(i => i.itemId === action.item._id
          ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...state, {
        itemId:   action.item._id,
        itemName: action.item.itemName,
        price:    action.item.price,
        imageUrl: action.item.imageUrl,
        category: action.item.category,
        quantity: 1
      }];
    }
    case 'INCREMENT':
      return state.map(i => i.itemId === action.id
        ? { ...i, quantity: i.quantity + 1 } : i);
    case 'DECREMENT':
      return state.map(i => i.itemId === action.id
        ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i);
    case 'REMOVE':
      return state.filter(i => i.itemId !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const { userId, isSignedIn, isLoaded } = useAuth();
  const hasLoadedFromDB = useRef(false);

  // Load cart from DB once Clerk confirms a real signed-in user
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) return;

    fetch(`${API}/${userId}`)
      .then(r => r.json())
      .then(items => {
        dispatch({ type: 'LOAD', items });
        hasLoadedFromDB.current = true;
      })
      .catch(console.error);
  }, [userId, isSignedIn, isLoaded]);

  // Save cart to DB only AFTER the initial load has completed
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) return;
    if (!hasLoadedFromDB.current) return;

    fetch(`${API}/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart })
    }).catch(console.error);
  }, [cart, userId, isSignedIn, isLoaded]);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);