import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux'; // Importer useDispatch et useSelector
import { addItem } from './CartSlice';

function ProductList() {
    const dispatch = useDispatch(); // Initialiser useDispatch
    const cartItems = useSelector(state => state.cart.items); // Récupérer les articles du panier
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculer la quantité totale

    const [addedToCart, setAddedToCart] = useState({});
    const handleAddToCart = (product) => {
        dispatch(addItem(product)); // Utiliser dispatch pour ajouter l'article au panier
        setAddedToCart((prevState) => ({
            ...prevState, [product.name]: true,
        }));
    };

    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);

    const plantsArray = [
        // Votre tableau de plantes ici
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div>
                        <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                            <h1 className='cart'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path>
                                </svg>
                                {totalQuantity > 0 && <span className="cart-quantity">{totalQuantity}</span>} {/* Afficher la quantité totale */}
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        {/* Afficher d'autres détails comme description et coût si nécessaire */}
                                        <button className="product-button" onClick={() => handleAddToCart(plant)}>Add to Cart</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
