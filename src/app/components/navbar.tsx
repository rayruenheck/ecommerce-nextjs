import React, { useState } from 'react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const dropdownMenu = (
      <ul className="dropdown-menu absolute top-0 w-1/2 mt-10 py-4 bg-white rounded-lg flex flex-col justify-center items-center border shadow-lg z-50">
        <a href='/men' className="hover:border-b-black hover:border-b-[4px] block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Men</a>
        <a ref='/women' className="hover:border-b-black hover:border-b-[4px]block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Women</a>
        <a href='/jewelery' className="hover:border-b-black hover:border-b-[4px] block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Jewelery</a>
        <a href='/electronics' className="hover:border-b-black hover:border-b-[4px] block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Electronics</a>
      </ul>
    )
  
    
    return (
      <header className="flex z-10 text-neutral-dark w-full bg-white">
        <a href="/" className="flex justify-start text-[20px] w-full">
          MyShop
        </a>
    
        <nav className="hidden md:flex items-center justify-center w-1/2 mr-6 ">
          <a href='/men' className="hover:border-b-black hover:border-b-[3px] mr-5 hover:text-accent">
            Men
          </a>
          <a href='/women' className="hover:border-b-black hover:border-b-[3px] mr-5 hover:text-accent" >
            Women
          </a>
          <a href='/jewelery' className="hover:border-b-black hover:border-b-[3px] mr-5 hover:text-accent" >
            Jewelery
          </a>
          <a href='/electronics' className="hover:border-b-black hover:border-b-[3px] mr-5 hover:text-accent">
            Electronics
          </a>
          <a href="/favorites">
          <svg className='w-10 h-6' viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" strokeWidth="1.272" strokeLinecap="round" strokeLinejoin="round"></path><text>2</text> </g></svg>
          </a>
          <a href="/cart">
          <svg className="w-10 h-6"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 483.1 483.1" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M434.55,418.7l-27.8-313.3c-0.5-6.2-5.7-10.9-12-10.9h-58.6c-0.1-52.1-42.5-94.5-94.6-94.5s-94.5,42.4-94.6,94.5h-58.6 c-6.2,0-11.4,4.7-12,10.9l-27.8,313.3c0,0.4,0,0.7,0,1.1c0,34.9,32.1,63.3,71.5,63.3h243c39.4,0,71.5-28.4,71.5-63.3 C434.55,419.4,434.55,419.1,434.55,418.7z M241.55,24c38.9,0,70.5,31.6,70.6,70.5h-141.2C171.05,55.6,202.65,24,241.55,24z M363.05,459h-243c-26,0-47.2-17.3-47.5-38.8l26.8-301.7h47.6v42.1c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h141.2v42.1 c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h47.6l26.8,301.8C410.25,441.7,389.05,459,363.05,459z"></path> </g> </g></svg>
          </a>
          </nav>
          <div className="dropdown relative md:hidden w-1/2 flex items-center justify-end">
        <button
          className="dropdown-toggle flex items-center justify-center h-10 w-1/2 transition-all"
          onClick={handleToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        {isOpen && dropdownMenu}
      </div>
        
      </header>
    );
}
