import React from 'react';
import Image from 'next/image'; // Import the Image component

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Copyright Notice (Left Side) */}
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
          </p>
          
          {/* Logo (Right Side) */}
          <div>
            {/* The <a> tag is correct here for an external link */}
            <a href="https://credencerm.com/" target="_blank" rel="noopener noreferrer">
              {/* Use the optimized Image component */}
              <Image 
                src="https://credencerm.com/assets/images/logo.png" 
                alt="Credence RCM Logo" 
                width={150} // Specify an appropriate width
                height={35}  // Specify an appropriate height
                className="h-8 w-auto" // Tailwind classes control the final display size
              />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;