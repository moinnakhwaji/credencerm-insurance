import React from 'react';

// It's a good practice to define props for components, even if they are empty for now.
// This makes the component more scalable for future additions.
interface TopBarProps {
  // You could add more props here later, like navigation links or user info.
}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <a href="/" title="Homepage">
              <img
                className="h-8 w-auto" // You can adjust the height (e.g., h-10)
                src="https://elportalimaging.com/wp-content/themes/elportal/assets/img/logo.png"
                alt="El Portal Imaging Logo"
              />
            </a>
          </div>

          {/* 
            You can add navigation links or other elements here in the future.
            For example:
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/home" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
              </div>
            </div>
          */}

        </div>
      </nav>
    </header>
  );
};

export default TopBar;