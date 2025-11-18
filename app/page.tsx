import { containerStyle } from "@/src/styles/styles";
import Image from "next/image";

export default function Home() {
  return (
    <div className={containerStyle}>
      <div className="flex flex-col">
        <Image
          src={"/devorganiza-logo.png"} alt="devorganiza-logo"
          width={200} height={200}
        />
      </div>
    </div>
  );
}
