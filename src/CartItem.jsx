import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice'; // Ensure these actions are imported

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items); // Assuming items are stored in cart

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item.name)); // or whatever unique identifier you have
    };

    const handleUpdateQuantity = (item, quantity) => {
        dispatch(updateQuantity({ name: item.name, quantity }));
    };

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.name} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Price: {item.cost}</p>
                            <div>
                                <button onClick={() => handleRemoveItem(item)}>Remove</button>
                                <button onClick={() => handleAddItem(item)}>Add More</button>
                                <input
                                    type="number"
                                    value={item.quantity || 1}
                                    min="1"
                                    onChange={(e) => handleUpdateQuantity(item, Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                ))
            )}
            <button onClick={onContinueShopping}>Continue Shopping</button>
        </div>
    );
}

export default CartItem;
