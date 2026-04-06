import Image from "next/image";
import Link from "next/link";

type Props = {
  width?: number;
  height?: number;
};
export const Logo = ({ width = 140, height }: Props) => {
  return (
    <Link href="/"
      style={{
        width: `${width}px`,
        height: height ? `${height}px` : "auto",
        aspectRatio: height ? undefined : "3 / 2"
      }}
      className="relative block"
    >
      <Image
        src="/devorganiza-v2.png"
        alt="devorganiza"
        fill
        className="object-contain"
        sizes={`${width}px`}
      />
    </Link>
  );
};