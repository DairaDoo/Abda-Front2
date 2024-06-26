import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col text-center items-center bg-gray-200 border-t-2 border-t-black w-full bottom-0'>
    <div className='container mx-auto'>
      <div className='flex flex-col md:flex-row justify-around py-6'>
  
        <div className='flex flex-col text-center items-center mb-6 md:mb-0'>
          <p className='text-xl font-semibold'>E-Commerce Website Developed by:</p>
          <h1 className='text-base'>ABDA Team Development</h1>
          <div className='text-sm'>
            <a href='https://www.linkedin.com/in/abimaelsanta' target='_blank' rel='noopener noreferrer'><p className='text-sm'>Abimael Santa</p></a>
            <a href='https://www.linkedin.com/in/brianmoralespaganpr' target='_blank' rel='noopener noreferrer'><p className='text-sm'>Brian Morales Pagan</p></a>
            <a href='https://www.linkedin.com/in/dairandejesusmora?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target='_blank' rel='noopener noreferrer'><p className='text-sm'>Dairan De Jesus</p></a>
            <a href='https://docs.google.com/document/d/10PvoP4Mqow4c2GdBx2joqOxg4wPu9xuA/edit?usp=sharing&ouid=100883875536578519710&rtpof=true&sd=true' target='_blank' rel='noopener noreferrer'><p className='text-sm'>Amarillys Hernandez</p></a>
          </div>
        </div>
  
        <div className='flex flex-col text-center items-center mb-6 md:mb-0'>
          <h1 className='text-xl py-2 font-semibold'>Team Development Supporters:</h1>
          <p className='text-sm'>Forte Puerto Rico - Forte Global</p>
          <p className='text-sm'>Digital School Colombia - Intersoftware Colombia</p>
          <p className='text-sm'>Departamento de Desarrollo Economico de Puerto Rico</p>
        </div>
  
      </div>
  
      <div className='flex flex-row justify-center gap-2 mb-6'>
        <img className='rounded-lg h-16' src='forteglobal_logo.jpeg' alt='Forte Global Logo' />
        <img className='rounded-lg h-16' src='digitalschoolco_logo.jpeg' alt='Digital School Colombia Logo' />
        <img className='rounded-lg h-16' src='intersoftwarecolombia_logo.jpeg' alt='Intersoftware Colombia Logo' />
        <img className='rounded-lg h-16' src='ddecpr_logo.jpeg' alt='Departamento de Desarrollo Economico de Puerto Rico Logo' />
      </div>
  
      <div className='text-sm text-center py-2 font-light text-blue-600'>
        <p>@ABDA 2024 All Rights Reserved</p>
      </div>
    </div>
  </div>
  
     
           
    
  )
}

export default Footer