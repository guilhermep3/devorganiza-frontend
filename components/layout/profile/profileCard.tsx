import { Button } from "@/components/ui/button"
import { User } from "@/src/types/user";
import { AtSign, Mail, User2 } from "lucide-react"
import Image from "next/image"

type props = {
  data: User;
  setIsEditing: (value: boolean) => void;
  setIsDeleting: (value: boolean) => void;
}
export const ProfileCard = ({ data, setIsEditing, setIsDeleting }: props) => {

  return (
    <div className="flex flex-col items-center gap-4 w-full lg:w-1/3 p-4 bg-card border border-gray-20 rounded-md">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <img
          src={`${data.profileImage || '/no-profile.webp'}`}
          alt="Foto de perfil"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full flex flex-col gap-2 text-center">
        <p className="font-semibold text-xl flex items-center justify-center gap-1">
          <User2 className="text-main-30" /> {data.name}
        </p>
        <p className="font-semibold text-xs lg:text-sm text-gray-40 flex items-center justify-center gap-1">
          <AtSign className="text-main-30 w-4 h-4" /> {data.username}
        </p>
        <p className="text-sm lg:text-base text-gray-50 flex justify-center items-center gap-1">
          <Mail className="text-main-30" /> {data.email}
        </p>
      </div>
      <div className="flex gap-4 mt-4 w-full">
        <Button className="flex-1 bg-main-30 text-white p-2 rounded-md hover:bg-main-50 transition"
          onClick={() => setIsEditing(true)}
        >
          Editar
        </Button>
        <Button className="flex-1 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition"
          onClick={() => setIsDeleting(true)}
        >
          Excluir
        </Button>
      </div>
    </div>
  )
}