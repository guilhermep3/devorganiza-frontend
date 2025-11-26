import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type props = {
  value: string,
  onChange: (newV: any) => void;
}
export const PasswordInput = ({ value, onChange }: props) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="inputCustom flex focus-within:ring focus-within:ring-main-30">
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
          ? <Eye />
          : <EyeOff />
        }
      </div>
    </div>
  )
}