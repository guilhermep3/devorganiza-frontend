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
        src={"/devorganiza-v2.png"} alt="devorganiza-v2"
        width={width} height={0}
        style={{ height: 'auto', width: '100%' }}
      />
    </Link>
  )
}