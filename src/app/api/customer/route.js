import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request){
    let queryParams= request.nextUrl.searchParams;
    console.log(queryParams.get("location"));
    let filter={};
    if(queryParams.get("location")){
        let city =queryParams.get("location");
        filter={city:{$regex: new RegExp(city,'i')}}
    }else if(queryParams.get("restaurant")){
        let name =queryParams.get("restaurant");
        filter={name:{$regex: new RegExp(name,'i')}}
    }
    mongoose.connect('mongodb+srv://isalonikashyap:sonakashyap@cluster0.fyjgfib.mongodb.net/RestoDB?retryWrites=true&w=majority&appName=Cluster0y', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('MongoDB connected...');
      }).catch(err => {
        console.error('Connection error', err);
      });
    let result = await restaurantSchema.find(filter);
    return NextResponse.json({success:true,result})
}