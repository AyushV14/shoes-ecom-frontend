"use client";

import CarItems from '@/components/CarItems'
import Wrapper from '@/components/Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import {loadStripe} from '@stripe/stripe-js';
import { makePaymentRequest } from '@/utlis/api';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const Cart = () => {
    const [loading, setloading]= useState(false)
    const { carItem } = useSelector((state) => state.cart);

    const subTotal = useMemo(()=>{
        return carItem.reduce((total, val)=> total + val.price, 0)
    },[carItem])


    const handlePayment = async ()=>{
        try {
            setloading(true)
            const stripe = await stripePromise;
            const res = await makePaymentRequest("/api/orders",{
                products: carItem
            }) 
            // console.log("Api response:",res);
            
            await stripe.redirectToCheckout({
                sessionId: res?.stripeSession?.id
            })
        } catch (error) {
            setloading(false)
            console.log(error);
            
        }
    }

    const cartItemCount = Array.isArray(carItem) ? carItem.length : 0; 
  return (
    <div className='w-full md:py-20'>
        <Wrapper>
            
            {cartItemCount > 0 && (
                <>
                {/* Heading and para start */}
                <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
                    <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                        Shopping Cart
                    </div>
                </div>
                {/* Heading and para end */}

                {/* Cart Content Start  */}
                <div className='flex flex-col lg:flex-row gap-12 py-10'>
                    {/* Cart Items Start  */}
                    <div className='flex-[2]'>
                        <div className='text-lg font-bold'>Cart Items</div>
                        {carItem.map((item)=>(
                            <CarItems key={item.id} data={item}/>
                        ))}
                    </div>
                    {/* Cart Items end  */}

                    {/* Cart Summary start  */}
                    <div className='flex-[1]'>
                        <div className='text-lg font-bold'>
                            <div className='p-5 my-5 bg-black/[0.05] rounded-xl'>
                                <div className='flex justify-between'>
                                    <div className='uppercase text-md md:text-lg font-medium text-black'>SubTotal</div>
                                    <div className='text-md md:text-lg font-medium text-black'>&#8377; {subTotal}</div>
                                </div>
                                <div className='text-sm md:text-md py-5 border-t mt-5 font-medium'>
                                    The Subtotal reflects the total price of your order, including duties and taxes, before any applicable discounts, It does not include delivery costs and international trasactions.
                                </div>
                            </div>
                            {/* BUTTON START */}
                            <button
                                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                                    onClick={handlePayment}
                                >
                                    Checkout
                                    {loading && <img src='/spinner.svg'/>}
                                    
                                </button>
                                {/* BUTTON END */}
                        </div>
                    </div>
                    {/* Cart Summary end  */}
                </div>
                {/* Cart Content end  */}
                </>
            )}
            


            {/* This is Empty cart  */}
            {cartItemCount < 1 && <div className='flex-[2] flex flex-col items-center pb-[50px] md:-mt-14'>
                <Image
                    src="/empty-cart.jpg"
                    alt=''
                    width={300}
                    height={300}
                    className='w-[300px] md:w-[400px]'
                />
                <span className='text-xl font-bold'>
                    Your Cart is empty
                </span>
                <span className="text-center mt-4">
                    Looks like you have not added anything in your cart.
                    <br />
                    Go ahead and explore top categories
                </span>
                <Link href="/" className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8'>
                    Continue Shopping
                </Link>
            </div>}
        </Wrapper>
    </div>
  )
}

export default Cart