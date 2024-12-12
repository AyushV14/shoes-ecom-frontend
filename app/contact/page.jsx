import React from 'react'

const ContactPage = () => {
  return (
    <div className="relative" id="contact">
  <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
    <div className="blur-[106px] h-56 bg-gradient-to-br from-white to-purple-400"></div>
    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
  </div>

  <div>
    <div className="relative pt-36 ml-auto">
      <div className="lg:w-2/3 text-center mx-auto">
        <h1 className="text-gray-900 font-bold text-5xl md:text-6xl xl:text-7xl">
          Get in <span className="text-red-500">Touch</span> with Us
        </h1>
        <p className="mt-8 text-gray-700">
          Have questions or need support? We're here to help. Reach out to our team for assistance with your order, product inquiries, or anything else related to Nike shoes.
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6 px-5 md:px-0">
          <a href="mailto:support@nike.com" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-black before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
            <span className="relative text-base font-semibold text-white">Contact Support</span>
          </a>
          <a href="https://www.google.com/maps/search/nike+stores" target='_blank' className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-100 sm:w-max">
            <span className="relative text-base font-semibold text-primary">Find a Store</span>
          </a>
        </div>

        <div className="py-8 px-5 md:px-0 mt-16 border-y gap-x-10 border-gray-100 sm:flex justify-between">
          <div className="text-center md:text-left">
            <h6 className="text-lg font-semibold text-gray-700">Customer Support</h6>
            <p className="mt-2 text-gray-500">Reach out for help with any order issues, product details, or returns.</p>
          </div>
          <div className="text-center md:text-left">
            <h6 className="text-lg font-semibold text-gray-700">Product Inquiries</h6>
            <p className="mt-2 text-gray-500">Have questions about our shoes? We're here to provide all the info you need.</p>
          </div>
          <div className="text-center md:text-left">
            <h6 className="text-lg font-semibold text-gray-700">Feedback</h6>
            <p className="mt-2 text-gray-500">We value your thoughts! Let us know how we can improve your shopping experience.</p>
          </div>
        </div>

        <div className="mt-16 px-5 md:px-0">
          <form className="max-w-lg mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" required className="mt-2 w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" required className="mt-2 w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Your Message</label>
              <textarea id="message" name="message" required rows="4" className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
            </div>

            <div>
              <button type="submit" className="w-full h-12 bg-black text-white rounded-lg hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/50 mb-10">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default ContactPage