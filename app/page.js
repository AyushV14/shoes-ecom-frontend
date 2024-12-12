'use client'

import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utlis/api";
import { useEffect, useState } from "react";



export default  function Home() {

  const [data, setData] = useState(null);
  useEffect(()=>{
    fetchProducts();
  },[])

  const fetchProducts =async () =>{
    const {data} = await fetchDataFromApi('/api/products?populate=*')
    setData(data)
  }


  return (
    <main>
      <HeroBanner/>
      {/* heading and paragharph start  */}
      <Wrapper className="text-center max-w-[1000px] mx-auto my-[50px] md:my-[80px]">
        <div className="text-[20px] md:text-[34px] mb-5 font-semibold leading-tight">Cushioning for Your Miles</div>
        <div className="text-md md:text-xl">
          A lightweight Nike ZoomX midsole is combined with increased stack heights to help provide cushioning during extended stretches of runing
        </div>
        {/* heading and paragharph end  */}

        {/* Product grid start  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-2 md:px-0">
          {data?.map((product)=>(
            <ProductCard key={product.id} data={product}/>
          ))}
          {/* <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/> */}
        </div>

        {/* Product grid end  */}

      </Wrapper>
      

    </main>
  );
}


// export async function getStaticProps() {
//   const products = await fetchDataFromApi('/api/products');

//   return{
//     props:{products}
//   }
// }
