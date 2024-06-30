'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (!delivery) {
            router.push('/deliverypartner');
        } else {
            getMyOrders(delivery._id);
        }
    }, []);

    const getMyOrders = async (deliveryId) => {
        let response = await fetch('http://localhost:3000/api/deliverypartners/orders/' + deliveryId);
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result);
        }
    };

    return (
        <div>
            <DeliveryHeader />
            <h1>My Order List</h1>
            {myOrders.length > 0 ? (
                myOrders.map((item) => (
                    <div className="restaurant-wrapper" key={item.id} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <h4>Name: {item.data ? item.data.name : 'No name available'}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data ? item.data.address : 'No address available'}</div>
                        <div>Status: {item.status}</div>
                        <div>Update Status:
                            <select>
                                <option>Confirm</option>
                                <option>On the way</option>
                                <option>Delivered</option>
                                <option>Failed to deliver</option>
                            </select>
                        </div>
                    </div>
                ))
            ) : (
                <div>No orders found.</div>
            )}
        </div>
    );
};

export default Page;
