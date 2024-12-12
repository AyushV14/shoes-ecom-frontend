"use client"

import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import RealtedProducts from '@/components/RealtedProducts'
import Wrapper from '@/components/Wrapper'
import { addToCart } from '@/store/cartSlice'
import { fetchDataFromApi } from '@/utlis/api'
import { getDiscountedPricePercentage } from '@/utlis/helper'
import React, { useEffect, useState } from 'react'
import {IoMdHeartEmpty} from "react-icons/io"
import ReactMarkdown from 'react-markdown'
import { useSelector, useDispatch } from 'react-redux'

import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductDetails = ({ params }) => {

    const slug = React.use(params).slug; 

    // State for product data, related products, and loading state
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state to handle async calls
    const [selectedSize, setselectedSize] = useState();
    const [showError, setshowError] = useState(false);
    const dispatch = useDispatch()

    const notify = ()=>{
      toast.success('Success. Check your cart!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }

  
    // UseEffect to fetch product data asynchronously
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          setLoading(true); // Start loading
          // Fetch product details
          const productData = await fetchDataFromApi(`/api/products?populate=*&filters[slug][$eq]=${slug}`);
          setProduct(productData?.data?.[0]);
          // console.log(productData?.data?.[0]);
          
          
          const relatedProductData = await fetchDataFromApi(`/api/products?populate=*&[filters][slug][$ne]=${slug}`);          
          setRelatedProducts(relatedProductData?.data || []);  
        } catch (error) {
          console.error("Error fetching product data:", error);
        } finally {
          setLoading(false); 
        }
        
        
      };
  
      fetchProductDetails();
    }, [slug]); // Dependency array with slug to trigger effect when the slug changes
  
    if (loading) {
        
      return (
      
      <div className='w-full h-[100vh] flex items-center justify-center'>
        <div className='w-[50%] h-[50%] p-10 bg-slate-300 rounded-md animate-pulse flex items-center justify-center'>
        Loading Your Shoes
        </div>
      </div>
      ); 
    }
  
    if (!product) {
        return (
      
            <div className='w-full h-[100vh] flex items-center justify-center'>
              <div className='w-[50%] h-[50%] p-10 bg-slate-300 rounded-md flex items-center justify-center'>
              Sorry No Product Found in such name :/
              </div>
            </div>
            ); 
    }


    // const product = await fetchDataFromApi(`/api/products?populate=*&filters[slug][$eq]=${slug}`)
    // const products = await fetchDataFromApi(`/api/products?populate=*&[filters][slug][$ne]=${slug}`)

    // const p = product?.data?.[0]

    // // console.log(product?.data?.[0]);

    // // console.log(p?.size?.data);
    



  return (
    <div className='w-full md:py-20'>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
        <Wrapper>
            <div className='flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]'>
            {/* left column start */}
           <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0'>
                <ProductDetailsCarousel images={product.image}/>
            </div> 
            {/* left column end */}

            {/* right column start */}
           <div className='flex-[1] py-3'>
                {/* Product title  */}
                <div className='text-[34px] font-semibold mb-2 leading-tight'>
                    {product.name}
                </div>

                {/* Product subtitle  */}
                <div className='text-lg font-semibold mb-5'>
                    {product.subtitle}
                </div> 

                {/* Product price */}
                <div className='flex items-center text-black/[0.5]'>
                <p className='mr-2 text-lg font-semibold text-black'>MRP: &#8377; {product.price}</p>
                <p className='mr-2 text-lg font-medium line-through'>&#8377; {product.original_price}</p>
                <p className='ml-auto text-base font-medium text-green-500'>{getDiscountedPricePercentage(product.original_price,product.price)}% off</p>
                </div>
                <div className='text-md font-medium text-black/[0.5]'>
                    incl. of taxes 
                </div>
                <div className='text-md font-medium text-black/[0.5] mb-20'>
                    {`(Also includes all applicable duties)`}
                </div>

                {/* product size range start  */}
                <div className='mb-10'>
                    {/* Heading start  */}
                    <div className='flex justify-between mb-2'>
                        <div className='text-md font-semibold'>
                            Select Size
                        </div>
                        <div className='text-md font-semibold'>
                            Select Guide
                        </div>
                    </div>
                    {/* Heading end  */}

                    {/* size chart  */}
                    <div id='sizesGrid' className='grid grid-cols-3 gap-2'> 
                        {product.size.data.map((item , i)=>(
                        <div key={i} className={`border rounded-md text-center py-3 font-medium ${item.enabled ? 'hover:border-black cursor-pointer' : 'cursor-not-allowed bg-black/[0.1]' } ${selectedSize === item.size ?'border-black' : ''}  `}
                        onClick={()=>{
                          setselectedSize(item.size)
                          setshowError(false)
                        }}
                        >
                            {item.size}
                        </div>
                        ))}
                        

                    </div>
                    {/* size end  */}

                    {/* error message  */}
                    {showError && (<div className='text-red-600 mt-1 text-base'>
                            Size selection is required
                        </div>)}

                </div>
                {/* product size range end  */}

                {/* Action Buttons  */}
                <div>
                        <button className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75' 
                        onClick={()=>{
                          if(!selectedSize){
                            setshowError(true)
                            document.getElementById("sizesGrid").scrollIntoView({
                              block:"center",
                              behavior:"smooth"
                            })
                          }else{
                            dispatch(addToCart({
                              ...product,
                              selectedSize,
                              oneQuantityPrice: product.price
                            }))
                            notify();
                          }
                        }} 
                        >
                        Add to Cart  
                        </button>
                        <button className='w-full py-4 rounded-full border  border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10'>
                            Wishlist  <IoMdHeartEmpty size={20}/>
                        </button>

                        <div>
                          <div className='text-lg font-bold mb-5'>
                            Product details
                            </div>
                            <div className='text-lg  mb-5'>
                            {product.description.map((item, index) => (
                              <ReactMarkdown key={index}>
                                {item.children[0].text}
                              </ReactMarkdown>
                            ))}
                          </div>
                        </div>

                </div>

           </div>
           {/* right column end */} 
           </div>

           <RealtedProducts products={relatedProducts}/>
           
        </Wrapper>
        
    </div>
  )
}

export default ProductDetails