import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    mongoose.connect('mongodb+srv://isalonikashyap:sonakashyap@cluster0.fyjgfib.mongodb.net/RestoDB?retryWrites=true&w=majority&appName=Cluster0y', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('MongoDB connected...');
      }).catch(err => {
        console.error('Connection error', err);
      });
    const data = await restaurantSchema.find()
    console.log(data);

    return NextResponse.json({ result: data })
}

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success=false
    mongoose.connect('mongodb+srv://isalonikashyap:sonakashyap@cluster0.fyjgfib.mongodb.net/RestoDB?retryWrites=true&w=majority&appName=Cluster0y', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('MongoDB connected...');
      }).catch(err => {
        console.error('Connection error', err);
      });

    if (payload.login) {
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
        if(result){
            success=true
        }
    } else {
        const restaurant = new restaurantSchema(payload)
        result = await restaurant.save();
        if(result){
            success=true;
        }
    }

    return NextResponse.json({ result, success })
}