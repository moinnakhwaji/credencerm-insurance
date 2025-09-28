import React from 'react';

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
            <a href="https://credencerm.com/" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://credencerm.com/assets/images/logo.png" 
                alt="Credence RCM Logo" 
                className="h-8 w-auto" // You can adjust the height (e.g., h-10)
              />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;