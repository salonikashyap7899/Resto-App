'use client'
import Link from 'next/link'
import { usePathname,useRouter } from 'next/navigation';
import Image from 'next/image';

import { useEffect, useState } from 'react';
const RestaurantHeader=()=>{
    const [details,setDetails]=useState();
    const pathName=usePathname();
    const router=useRouter();
    useEffect(()=>{
        const data = localStorage.getItem("restaurantUser");
        if(!data && pathName=="/restaurant/dashboard")
        {
            router.push("/restaurant")
        }
        else if(data && pathName=="/restaurant")
        {
            router.push("/restaurant/dashboard")
        }
        
        if(data){
            setDetails(JSON.parse(data));
            
        }
    },[pathName, router])

    const logout=()=>{
        localStorage.removeItem("restaurantUser");
        router.push("/restaurant")
    }
    return(
        <div className='header-wrapper'>
            <div className="logo">
                <Image style={{width:100}} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" alt='' />
            </div>
            <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                {
                    details && details.name?
                    <> 
                    <Link href="/">Profile</Link>
                    <button onClick={logout}>Logout</button>
                    </>
                    :<Link href="/">Login/SignUp</Link>

                }
                
            </li>
            
            </ul>
        </div>
    )
}

export default RestaurantHeader;