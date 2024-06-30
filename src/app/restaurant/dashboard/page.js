"use client"
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import './../style.css'
import AddFoodItems from "@/app/_components/AddFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/FoodItemList";
const Dashboard = () => {
    const [addItem, setAddItem] = useState(false)
    return (
        <div className="links-button">
        <RestaurantHeader />
        <div className="button-container">
            <button className="add-food-link" onClick={() => setAddItem(true)}>Add Food</button>
            <button className="add-food-dash" onClick={() => setAddItem(false)}>Dashboard</button>
        </div>
        {addItem ? <AddFoodItems setAddItem={setAddItem} /> : <FoodItemList />}
    </div>
    )
}

export default Dashboard;