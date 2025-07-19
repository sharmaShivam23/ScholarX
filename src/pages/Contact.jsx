import React from "react"

import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"


const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-32 min-h-screen mb-20 flex max-w-[97%] md:max-w-[80vw] flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact


// import React from 'react'

// const Contact = () => {
//   return (
//     <div className='h-screen w-full bg-red-500'> 

//       helooo
      
//     </div>
//   )
// }

// export default Contact
