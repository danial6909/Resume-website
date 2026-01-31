import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo/logo.jpg";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="Logo" className="w-20 h-10 object-contain" />
    </Link>
  );
}
