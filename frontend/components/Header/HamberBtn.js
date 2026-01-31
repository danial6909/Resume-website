

export default function HamberBtn({isMenuOpen , isTransparent , setIsMenuOpen}){
    return(
        
        <button
              className="md:hidden group flex flex-col items-center justify-center gap-1.5 z-[70] cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* خط اول */}
              <div
                className={`h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "w-8 rotate-45 translate-y-2 bg-white" : "w-6"
                } ${
                  isTransparent && !isMenuOpen ? "bg-white" : "bg-foreground"
                }`}
              />

              {/* خط دوم */}
              <div
                className={`h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "w-8"
                } ${
                  isTransparent && !isMenuOpen ? "bg-white" : "bg-foreground"
                }`}
              />

              {/* خط سوم */}
              <div
                className={`h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen
                    ? "w-8 -rotate-45 -translate-y-2 bg-white"
                    : "w-4 self-end"
                } ${
                  isTransparent && !isMenuOpen ? "bg-white" : "bg-foreground"
                }`}
              />
            </button>
    )
}