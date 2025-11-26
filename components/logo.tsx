import Image from "next/image"
import Link from "next/link"

type props = {
  width: number;
  height?: number;
}
export const Logo = ({ width, height }: props) => {
  const logoHeight = height ?? 'fit-content';

  return (
    <Link href={'/'} style={{ width: `${width}px`, height: logoHeight }}>
      <Image
        src={"/devorganiza-logo.png"} alt="devorganiza-logo"
        width={width} height={width}
        style={{ width: `${width}px`, height: logoHeight }}
      />
    </Link>
  )
}