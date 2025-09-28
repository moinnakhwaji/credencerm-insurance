import React from 'react';
import Link from 'next/link'; // Import the Link component
import Image from 'next/image'; // Import the Image component

// It's a good practice to define props for components.
// Since there are no props, we can remove the interface for now,
// or use a type alias if we expect props later. For simplicity, we'll remove it.

const TopBar = () => { // Removed the React.FC<TopBarProps> type for simplicity
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            {/* Use Link component for internal navigation */}
            <Link href="/" title="Homepage">
              {/* Use the optimized Image component */}
              <Image
                width={150} // Specify the original width of the image or an appropriate display width
                height={35}  // Specify the original height of the image or an appropriate display height
                className="h-8 w-auto" // Tailwind classes still control the rendered size
                src="https://elportalimaging.com/wp-content/themes/elportal/assets/img/logo.png"
                alt="El Portal Imaging Logo"
              />
            </Link>
          </div>

          {/* 
            You can add navigation links or other elements here in the future.
            For example:
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/home" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              </div>
            </div>
          */}

        </div>
      </nav>
    </header>
  );
};

export default TopBar;