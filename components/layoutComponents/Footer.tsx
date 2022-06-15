import { useRouter } from "next/router";
import React from "react";



const pages = [
  "/",
  "/add-product-to-cart",
  "/change-password",
  "/individual-product",
  "/login",
  "/profile-edit",
  "/profile",
  "/register",
  "/shopping",
  "/upload-file",
  "/videos",
  '/products',
  '/products/owned',
]

function Footer() {
  const router = useRouter();

  return (
    <footer 
      className="flex flex-row justify-around p-6 items-start bg-white" 
      style={
        {
          bottom: '0',
          width:'100%',
          "overflowY":"scroll"
        }
      }
    >
      {" "}
      <div className="">
        <h1 className="font-bold">Customer Services</h1>
        <p className="cursor-pointer hover:text-blue-600">Services title 01</p>
        <p className="cursor-pointer hover:text-blue-600">Services title 02</p>
        <p className="cursor-pointer hover:text-blue-600">Services title 03</p>
      </div>
      <div>
        <h1 className="font-bold">About Us</h1>
        <p className="cursor-pointer hover:text-blue-600">About Us title 01</p>
        <p className="cursor-pointer hover:text-blue-600">About Us title 02</p>
        <p className="cursor-pointer hover:text-blue-600">About Us title 03</p>
        <p className="cursor-pointer hover:text-blue-600">About Us title 04</p>
        <p className="cursor-pointer hover:text-blue-600">About Us title 05</p>
      </div>
      <div>
        <h1 className="font-bold">Need Help ?</h1>
        <p className="cursor-pointer hover:text-blue-600">Help title 01</p>
        <p className="cursor-pointer hover:text-blue-600">Help title 02</p>
      </div>
      <div>
        <h1 className="font-bold">Download</h1>
      </div>
      <div>
        <h1 className="font-bold">Index</h1>
        {
          pages.map(
            endpoint => {
              return <p 
                className="cursor-pointer hover:text-blue-600"
                onClick = {()=>router.push(endpoint)}
                key={endpoint}
              >
                {endpoint}
              </p>
            }
          )
        }
      </div>
    </footer>
  );
}

export default Footer;
