"use client"

import React,{useState, useEffect} from 'react'
import Wrapper from './Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './Menu'
import MenuMobile from './MenuMobile'
import { useSelector } from 'react-redux'



//icons
import {IoMdHeartEmpty} from "react-icons/io"
import { BsCart } from 'react-icons/bs' 
import {BiMenuAltRight} from 'react-icons/bi'
import { IoMdClose } from "react-icons/io";
import { fetchDataFromApi } from '@/utlis/api'

const Header = () => {
  const [mobileView, setMobileView] = useState(false)
  const [showCatmenu, setShowCatmenu] = useState(false)
  const [show, setShow] = useState("translate-y-0")
  const [lastScrollY , setLastScrollY]= useState(0)
  const [categories,setCategories] = useState(null)

  const { carItem } = useSelector((state) => state.cart);  // Ensure you're accessing 'carItem', not 'cartItems'

  // Safely check if carItem is an array and has elements
  const cartItemCount = Array.isArray(carItem) ? carItem.length : 0;

  const controllNavBar = ()=>{
    if(window.scrollY > 200 ){
      if(window.scrollY > lastScrollY && !mobileView){
        setShow("-translate-y-[80px]")
      }else {
        setShow("shadow-sm")
      }
      
    } else {
      setShow("translate-y-0")
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener("scroll", controllNavBar);
    return ()=>{
      window.removeEventListener("scroll", controllNavBar);
    } 
  },[lastScrollY])

  useEffect(()=>{
    fetchCategories()
  },[])

  const fetchCategories = async ()=>{
    const {data} = await fetchDataFromApi('/api/categories?populate=*')
    setCategories(data)
  }

  return (
    <header className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}>
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
        <Image
          src={'/logo.svg'}
          alt='logo'
          width={60}
          height={40}
          className='w-[40px] md:w-[60px]'
        />
        </Link>
        <Menu 
          showCatmenu={showCatmenu} 
          setShowCatmenu={setShowCatmenu}
          categories={categories}
        />
        {mobileView && 
        <MenuMobile 
          showCatmenu={showCatmenu} 
          setShowCatmenu={setShowCatmenu} 
          setMobileView={setMobileView} 
          categories={categories}
        />
        }

        <div className='flex items-center gap-2 text-black'>
          {/* icon start  */}
          <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative'>
            <IoMdHeartEmpty className='text-[19px] md:text-[24px]'/>
            <div className='h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]'>51</div>
          </div>
          {/* icon end  */}

          {/* icon start  */}
          <Link href="/cart">
          <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative'>
            <BsCart className='text-[15px] md:text-[20px]'/>
            {cartItemCount > 0 && <div className='h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]'> {cartItemCount}
              
            </div>}
          </div>
          </Link>
          {/* icon end  */}

          {/* Mobile View  Start*/}
          <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2'>
            {mobileView ? (
              <IoMdClose className="text-[16px]"
                onClick={()=>setMobileView(false)}
              />
            ): (
              <BiMenuAltRight className="text-[20px]"
                onClick={()=>setMobileView(true)}
              />
            )}
          </div>
          {/* Mobile View  End*/}
        </div>
        
      </Wrapper>
    </header>
  )
}

export default Header