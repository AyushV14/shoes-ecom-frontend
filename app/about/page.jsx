import React from 'react'

const AboutSection = () => {
  return (
    <div className="relative " id="home">
          <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-white to-purple-400 "></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 "></div>
          </div>
          <div>
            <div className="relative pt-36 ml-auto">
              <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-gray-900 font-bold text-5xl md:text-6xl xl:text-7xl">
                Step Into <span className="text-red-500">Comfort</span> & <span className="text-blue-500">Performance</span> with Nike
                </h1>
                <p className="mt-8 text-gray-700">
                Discover the perfect blend of innovation, style, and comfort with Nike shoes. Whether you're training hard, running long distances, or just looking for everyday style, our collection offers the ideal footwear for every step of your journey. Experience cutting-edge technology designed to elevate your performance and keep you moving forward.
                </p>

                <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6 px-5 md:px-0">
                  <a href="/" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-black before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                    <span className="relative text-base font-semibold text-white">Get started</span>
                  </a>
                  <a href="/contact" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-100 sm:w-max">
                    <span className="relative text-base font-semibold text-primary ">Learn more</span>
                  </a>
                </div>
                <div className="py-8 px-5 md:px-0 mt-16 border-y gap-x-10 border-gray-100 sm:flex justify-between">
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-semibold text-gray-700">Designed for Every Athlete</h6>
                        <p className="mt-2 text-gray-500">Our shoes are crafted to provide optimal comfort and support, no matter your activity.</p>
                    </div>
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-semibold text-gray-700">Innovative Performance</h6>
                        <p className="mt-2 text-gray-500">Featuring the latest in footwear technology, Nike shoes help you push your limits.</p>
                    </div>
                    <div className="text-center md:text-left">
                        <h6 className="text-lg font-semibold text-gray-700">Trusted by Champions</h6>
                        <p className="mt-2 text-gray-500">Join the millions of athletes worldwide who rely on Nike for their training and competition needs.</p>
                    </div>
                    </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default AboutSection