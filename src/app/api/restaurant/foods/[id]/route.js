import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    const id = content.params.id
    let success=false;
    mongoose.connect('mongodb+srv://isalonikashyap:sonakashyap@cluster0.fyjgfib.mongodb.net/RestoDB?retryWrites=true&w=majority&appName=Cluster0y', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('MongoDB connected...');
      }).catch(err => {
        console.error('Connection error', err);
      });
    const result = await foodSchema.find({resto_id:id});
    if(result){
        success=true
    }
    return NextResponse.json({result,success})

}
export async function DELETE(request,content){
    const id = content.params.id;
    let success = false;
    mongoose.connect('mongodb+srv://isalonikashyap:sonakashyap@cluster0.fyjgfib.mongodb.net/RestoDB?retryWrites=true&w=majority&appName=Cluster0y', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('MongoDB connected...');
    }).catch(err => {
      console.error('Connection error', err);
    });
    const result = await foodSchema.deleteOne({_id:id})
    if(result.deletedCount>0){
        success=true
    }

    return NextResponse.json({result,success})
}
