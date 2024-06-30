
import { orderSchema } from "@/app/lib/ordersMode";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request) {
    const payload = await request.json();
    mongoose.connect('mongodb+srv://isalonikashyap:sonakashyap@cluster0.fyjgfib.mongodb.net/RestoDB?retryWrites=true&w=majority&appName=Cluster0y', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('MongoDB connected...');
      }).catch(err => {
        console.error('Connection error', err);
      });
    let success = false;
    const orderObj = new orderSchema(payload);
    const result = await orderObj.save();
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}

export async function GET(request) {
    const userId = request.nextUrl.searchParams.get('id');
    let success = false
    mongoose.connect('mongodb+srv://isalonikashyap:sonakashyap@cluster0.fyjgfib.mongodb.net/RestoDB?retryWrites=true&w=majority&appName=Cluster0y', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('MongoDB connected...');
      }).catch(err => {
        console.error('Connection error', err);
      });
    let result = await orderSchema.find({ user_id: userId });
    if (result) {
        let restoData = await Promise.all(
            result.map(async (item) => {
                let restoInfo = {};
                restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id })
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                return restoInfo;
            })
        )
        result = restoData;
        success = true
    }

    return NextResponse.json({ result,success })

}