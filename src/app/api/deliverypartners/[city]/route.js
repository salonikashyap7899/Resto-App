import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersMode";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(request,content){
    let city= content.params.city
    let success=false;
    mongoose.connect('mongodb+srv://isalonikashyap:sonakashyap@cluster0.fyjgfib.mongodb.net/RestoDB?retryWrites=true&w=majority&appName=Cluster0y', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('MongoDB connected...');
      }).catch(err => {
        console.error('Connection error', err);
      });
    let filter ={city:{$regex:new RegExp(city,'i')}}
    const result = await deliveryPartnersSchema.find(filter)
   return NextResponse.json({result})
}