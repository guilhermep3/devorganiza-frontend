import Image from "next/image"
import Link from "next/link"

export const Logo = () => {

  return (
    <Link href={'/'} className="w-12 md:w-16 h-fit">
      <Image
        src={"/devorganiza-logo.png"} alt="devorganiza-logo"
        width={80} height={80}
        className="w-full h-full"
      />
    </Link>
  )
}