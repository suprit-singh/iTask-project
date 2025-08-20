import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between bg-purple-800 text-white py-4 w-full'>
        <div className="logo ">
          <span className='mx-9 font-extrabold text-2xl'> iTask</span>
          </div>
        <ul className='flex gap-8 mx-9 text-lg '>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Your tasks</li>
            
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
