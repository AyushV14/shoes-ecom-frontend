"use client"

import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import { fetchDataFromApi } from '@/utlis/api'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'


const maxResult = 3;

const Category = ({ params }) => {

  // const [pageIndex , setPageIndex] = useState(1)

  // const { data, error, isLoading } = useSWR(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`, fetchDataFromApi, {
  //   fallback: products
  // })
  const slug = React.use(params).slug; 
  const [category, setCategory] = useState(null);
  const [products, setProductsdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex]= useState(1)
  

  const {query} = useRouter();

  useEffect(()=>{
    setPageIndex(1)
  },[query])

  // console.log(pageIndex);
  



  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true); 

        // Fetch the category data
        const categoryData = await fetchDataFromApi(`/api/categories?filters[slug][$eq]=${slug}`);
        setCategory(categoryData?.data?.[0]); // Assuming the category data structure
        
        

        // Fetch the products based on the category slug
        const productsData = await fetchDataFromApi(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`);
        setProductsdata(productsData)
        // console.log(productsData);
        
        // console.log(productsData);
        setLoading(false)
        

      } catch (error) {
        console.error("Error fetching category or products data:", error);
        
      }
    };

    fetchCategoryAndProducts();
    // console.log(products);
    
  }, [slug, pageIndex]);


  return (
    <div className='w-full md:py-20 relative'>
        <Wrapper>
            <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
                <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                    {category?.data?.[0]?.name}
                </div>
            </div>

        {/* Product grid start  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-2 md:px-0">
          {products?.data?.map((product)=>(
            <ProductCard key={product.id} data={product}/>
          ))}
          
        </div>

        {/* Product grid end  */}

        
        {/* PAGINATION BUTTONS START */}
        {products?.meta?.pagination.total > maxResult && (
            <div className="flex gap-3 items-center justify-center my-16 md:my-0">
                <button
                    className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                    disabled={pageIndex === 1}
                    onClick={() => setPageIndex(pageIndex - 1)}
                >
                    Previous
                </button>

                <span className="font-bold">{`${pageIndex} of ${
                    products && products?.meta?.pagination.pageCount
                }`}</span>

                <button
                    className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                    disabled={
                        pageIndex ===
                        (products && products?.meta?.pagination?.pageCount)
                    }
                    onClick={() => setPageIndex(pageIndex + 1)}
                >
                    Next
                </button>
            </div>
        )}
        {/* PAGINATION BUTTONS END */}
        {loading && (
            <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
                <img src="/logo.svg" width={150} />
                <span className="text-2xl font-medium">Loading...</span>
            </div>
        )}
        </Wrapper>
    </div>
  )
}

export default Category

