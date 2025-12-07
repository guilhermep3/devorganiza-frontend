import { ReactNode } from "react";

type Props = {
  whiteBg?: boolean;
  size?: 1 | 2 | 3;
  className?: string;
  onClick?: (value?: any) => void;
  children: ReactNode;
  href?: string;
  submit?: boolean;
};

export const Button = ({ whiteBg, size = 2, className, onClick, children, href, submit
}: Props) => {
  const commonClasses = `group relative z-10 text-white text-center font-bold rounded-md transition-all
    overflow-hidden w-fit cursor-pointer shadow-md shadow-main-50 hover:shadow-main-40/75
    ${whiteBg ? 'bg-main-10 hover:bg-main-10' : 'bg-main-30 hover:bg-main-30'}
    ${size === 1 && "px-4 py-1 text-sm"}
    ${size === 2 && "px-6 py-2 text-base"}
    ${size === 3 && "px-10 py-3 text-base"}
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        className={commonClasses}
        onClick={onClick}
      >
        {children}
        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent -z-10
          ${whiteBg ? 'via-main-10' : 'via-main-40'}
          to-transparent w-full h-5 blur-xs transition-all group-hover:h-6
        `}>
        </span>
        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent -z-10
          ${whiteBg ? 'via-main-10' : 'via-main-40'}
          to-transparent w-2/4 h-2 blur-sm transition-all group-hover:h-3
        `}>
        </span>
      </a>
    );
  }

  return (
    <button
      className={commonClasses}
      onClick={onClick}
      type={ submit ? 'submit' : 'button'}
    >
      {children}
      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent -z-10
        ${whiteBg ? 'via-main-10' : 'via-main-40'}
        to-transparent w-full h-5 blur-xs transition-all group-hover:h-6
      `}>
      </span>
      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent -z-10
        ${whiteBg ? 'via-main-10' : 'via-main-40'}
        to-transparent w-2/4 h-2 blur-sm transition-all group-hover:h-3
      `}>
      </span>
    </button>
  );
};
