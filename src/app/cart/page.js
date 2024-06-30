'use client';
import { useState, useEffect } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import Footer from '../_components/Footer';
import { DELIVERY_CHARGES, TAX } from '../lib/constant';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Page = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartStorage(cart);
        const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalAmount);
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cartStorage.filter(item => item._id !== id);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        const updatedTotal = updatedCart.reduce((acc, item) => acc + item.price, 0);
        setTotal(updatedTotal);
    };

    const orderNow = () => {
        if (JSON.parse(localStorage.getItem('user'))) {
            router.push('/order');
        } else {
            router.push('/user-auth?order=true');
        }
    };

    return (
        <div>
            <CustomerHeader />
            <div className="food-list-wrapper">
                {cartStorage.length > 0 ? cartStorage.map(item => (
                    <div className="list-item" key={item._id}>
                        <div className="list-item-block-1">
                            <Image style={{ width: 100 }} src={item.img_path} alt={item.name} />
                        </div>
                        <div className="list-item-block-2">
                            <div>{item.name}</div>
                            <div className="description">{item.description}</div>
                            <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                        </div>
                        <div className="list-item-block-3">Price: {item.price}</div>
                    </div>
                )) : <h1>No Food Items for this Restaurant</h1>}
            </div>
            <div className="total-wrapper">
                <div className="block-1">
                    <div className="row">
                        <span>Food Charges: </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax: </span>
                        <span>{(total * TAX / 100).toFixed(2)}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges: </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount: </span>
                        <span>{(total + DELIVERY_CHARGES + (total * TAX / 100)).toFixed(2)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
