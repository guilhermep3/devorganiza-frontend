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
export const Button = ({
  whiteBg, size = 2, className, onClick, children, href, submit
}: Props) => {

  const sizes = {
    1: "px-4 py-1 text-sm",
    2: "px-6 py-2 text-base",
    3: "px-10 py-3 text-lg",
  };

  const baseClasses = `
    group relative inline-flex items-center justify-center font-semibold rounded-lg
    transition-all duration-300 ease-out overflow-hidden cursor-pointer shadow-md hover:shadow-lg
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-40
    hover:-translate-y-[1px] active:translate-y-[1px]
    ${sizes[size]}
    ${whiteBg
      ? "bg-main-10 text-foreground hover:bg-main-20"
      : "bg-main-30 text-white hover:bg-main-50"
    }
    ${className}
  `;

  const glow = (
    <span className={`absolute inset-x-0 bottom-0 h-6 bg-linear-to-r from-transparent to-transparent
        opacity-60 blur-md transition-all duration-300 group-hover:h-8 group-hover:opacity-80
        ${whiteBg ? "via-main-20" : "via-main-50 group-hover:via-main-30"}
      `}
    ></span>
  );

  if (href) {
    return (
      <a href={href} role="link"
        className={baseClasses}
        onClick={onClick}
      >
        <span className="flex gap-2 relative z-10">{children}</span>
        {glow}
      </a>
    );
  }

  return (
    <button role="button"
      type={submit ? "submit" : "button"}
      className={baseClasses}
      onClick={onClick}
    >
      <span className="flex gap-2 relative z-10">{children}</span>
      {glow}
    </button>
  );
};
