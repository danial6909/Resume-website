import Link from "next/link";


export default function MenuItem({href,title}){
    return(
        <li>
            {/* تغییرات: متن کمی پررنگ‌تر (medium)، هاور رنگی */}
            <Link 
                href={href} 
                className="text-gray-600 font-medium hover:text-blue-600 transition duration-200 p-2"
            >
                {title}
            </Link>
        </li>
    )
}