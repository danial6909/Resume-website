import Link from "next/link"
import MenuItem from "./MenuItem"
import LoginBtn from "./LoginBtn"




export default function Header(){

    const menuItems = [
        {title: 'خانه', link: '/' },
        {title: 'نمونه کارها', link: '/portfolio' },
        {title: 'خدمات ما', link: '/services' },
        {title: 'درباره ما', link: '/about' },
        {title: 'تماس با ما', link: '/contact' },
    ]

    return(
        
        <header className="sticky top-0 z-50 bg-white shadow-md">
            
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                
                
                <div>
                    <Link href="/" className="text-2xl font-extrabold text-blue-700 tracking-wide">
                        دانیال.dev
                    </Link>
                </div>

           
                <nav className="hidden md:block">
                    <ul className="flex space-x-6 space-x-reverse">
                        {menuItems.map((item)=>(
                            <MenuItem key={item.title} title={item.title} href={item.link} />
                        ))}
                    </ul>
                </nav>


                
                <div className="flex items-center space-x-4 space-x-reverse">
                    
                  <LoginBtn />

                    {/* در آینده می‌توانید دکمه منوی موبایل (همبرگر) را اینجا اضافه کنید */}
                    {/* <button className="md:hidden">...همبرگر...</button> */}
                </div>
            </div>
            
        </header>
    )
}