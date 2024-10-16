// CartItem.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Assurez-vous d'importer vos actions

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items); // Assurez-vous que 'items' est le bon chemin pour accéder à votre état de panier
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculer la quantité totale

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity === 1) {
            dispatch(removeItem(item.name));
        } else {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <div className="cart-icon">
                {/* Affichage de l'icône du panier avec la quantité totale */}
                <span className="cart-quantity">{totalQuantity}</span>
                <h1 className='cart-icon-svg'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                        <circle cx="80" cy="216" r="12" />
                        <circle cx="184" cy="216" r="12" />
                        <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                </h1>
            </div>
            {cartItems.map((item) => (
                <div key={item.name}>
                    <h3>{item.name}</h3>
                    <button onClick={() => handleIncrement(item)}>+</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleDecrement(item)}>-</button>
                </div>
            ))}
            <button onClick={onContinueShopping}>Continue Shopping</button>
        </div>
    );
}

export default CartItem;
