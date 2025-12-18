'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export function AOSPage({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: 'ease-out-cubic',
      offset: 120,
    });

    window.addEventListener('load', () => {
      AOS.refreshHard();
    });

    return () => {
      window.removeEventListener('load', () => {
        AOS.refreshHard();
      });
    };
  }, []);

  return <>{children}</>;
}

// "use client"
// import { ReactNode, useEffect } from "react"
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// export const AOSPage = ({ children }: { children: ReactNode }) => {
//   useEffect(() => {
//     AOS.init({
//       duration: 700,
//       easing: 'ease-in-out',
//       once: true,
//       delay: 100,
//     })
//   }, [])

//   return (
//     <>{children}</>
//   )
// }