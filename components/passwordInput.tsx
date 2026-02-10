import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type props = {
  value: string,
  onChange: (newV: any) => void;
  className?: string;
}
export const PasswordInput = ({ value, onChange, className }: props) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className={`inputCustom flex gap-2 focus-within:ring focus-within:ring-main-30
      ${className ?? ''}
    `}>
      <input type={showPass ? 'text' : 'password'}
        placeholder="Senha"
        className="text-base w-full outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div
        onClick={() => {
          setShowPass(prev => !prev);
        }}
      >
        {showPass
          ? <Eye className="cursor-pointer" />
          : <EyeOff className="cursor-pointer" />
        }
      </div>
    </div>
  )
}