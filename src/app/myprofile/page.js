'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Page = () => {
    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        getMyOrders();
    }, []);

    const getMyOrders = async () => {
        const userStorage = JSON.parse(localStorage.getItem('user'));
        let response = await fetch('http://localhost:3000/api/order?id=' + userStorage._id);
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result);
        }
    };

    return (
        <div>
            <CustomerHeader />
            {myOrders.length > 0 ? (
                myOrders.map(item => (
                    <div
                        className="restaurant-wrapper1"
                        key={item.id} // Assuming each item has a unique 'id'
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    >
                        <h4>Name: {item.data ? item.data.name : 'No name available'}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data ? item.data.address : 'No address available'}</div>
                        <div>Status: {item.status}</div>
                    </div>
                ))
            ) : (
                <div>No orders found.</div>
            )}
            <Footer />
        </div>
    );
}

export default Page;
