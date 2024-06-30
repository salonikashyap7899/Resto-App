'use client'
import Link from "next/link"
import Image from 'next/image'

const DeliveryHeader = (props) => {


    return (
        <div className="header-wrapper">
            <div className="logo">
            <Image
        src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
        alt="Description of the image"
        style={{ width: 100 }} 
        width={100}
        
      />

            </div>
            <ul>
                <li>
                    <Link href="/" >Home</Link>
                </li>
                
            </ul>
        </div>
    )
}

export default DeliveryHeader