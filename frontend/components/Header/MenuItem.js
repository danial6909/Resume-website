// src/components/MenuItem.js
import Link from "next/link";

export default function MenuItem({ href, title }) {
  return (
    <li className="mx-1">
      <Link
        href={href}
        className="relative px-3 py-2 rounded-md font-medium text-text-main transition-all duration-300 ease-out
                   hover:text-menu focus:outline-none 
                   dark:text-text-faded dark:hover:text-third-accent dark:focus:ring-third-accent/40
                   group"
      >
        {title}
        
        {/* خط زیر با انیمیشن */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-third-accent to-secondary-accent 
                         transition-all duration-700 ease-out group-hover:w-3/4 rounded-full" />
        
       
      </Link>
    </li>
  );
}