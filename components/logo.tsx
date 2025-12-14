import Image from "next/image"
import Link from "next/link"

type Props = {
  width: number;
  height?: number;
}

export const Logo = ({ width, height }: Props) => {
  const logoHeight = height ? `${height}px` : 'auto';

  return (
    <Link href={'/'} style={{ width: `${width}px`, height: logoHeight }}>
      <Image
        src={"/devorganiza-logo.png"} alt="devorganiza-logo"
        width={width} height={0}
        style={{ height: 'auto', width: '100%' }}
      />
    </Link>
  )
}