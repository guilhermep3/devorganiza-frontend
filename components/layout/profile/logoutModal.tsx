"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button as ButtonCN } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  isLogOut: boolean;
  setIsLogout: (value: boolean) => void;
};
export const LogoutModal = ({ isLogOut, setIsLogout }: Props) => {
  const router = useRouter();

  function handleLogout() {
    if (isLogOut) {
      localStorage.removeItem('token');
      setIsLogout(false);
      router.replace('/');
    }
  }

  return (
    <Dialog open={isLogOut} onOpenChange={setIsLogout}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sair do login</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja sair do login da sua conta?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 pt-4">
          <div className="flex items-center gap-3">
            <ButtonCN variant="outline" type="button"
              className="bg-gray-200 hover:bg-gray-300"
              onClick={() => setIsLogout(false)}
            >
              Cancelar
            </ButtonCN>
            <ButtonCN
              onClick={handleLogout}
              className={`bg-red-600 hover:bg-red-700 text-white`}
            >
              Sair da conta
            </ButtonCN>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};