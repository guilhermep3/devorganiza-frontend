import { ReactNode } from "react";

type props = {
  children: ReactNode;
}
export default function Layout({ children }: props) {

  return (
    <div>
      layout
      {children}
    </div>
  )
}