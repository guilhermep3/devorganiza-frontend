"use client";
import { BookOpenCheck, ListChecks, GaugeCircle, CircleQuestionMark } from "lucide-react";
import { useUser } from "@/src/api/useUser";
import { useQuizAttempts } from "@/src/api/useQuizAttempts";
import { ProfileAttemptTable } from "@/components/layout/profile/profileAttemptTable";
import { ProfileCard } from "@/components/layout/profile/profileCard";
import { useState } from "react";
import { EditProfileModal } from "@/components/layout/profile/editProfileModal";
import { DeleteProfileModal } from "@/components/layout/profile/deleteProfileModal";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, loading } = useUser();
  const { data: attemptsData } = useQuizAttempts();
  console.log("userData", data, loading);
  console.log("attemptData", attemptsData, loading);

  return (
    <div className="layoutDiv flex flex-col gap-10">
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Perfil do Usuário</h1>
        <h2 className="dashboardSectionSubtitle">Veja e gerencie seus dados pessoais</h2>
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <ProfileCard setIsEditing={setIsEditing} setIsDeleting={setIsDeleting} />
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 flex-1 w-full">
              <div className="flex flex-col gap-3 p-3 lg:p-4 bg-card border border-gray-20 rounded-md">
                <div className="flex items-center gap-2 text-sm xl:text-base">
                  <BookOpenCheck className="text-main-30" />
                  Total de estudos
                </div>
                <div className="font-bold text-xl lg:text-3xl">15</div>
              </div>
              <div className="flex flex-col gap-3 p-3 lg:p-4 bg-card border border-gray-20 rounded-md">
                <div className="flex items-center gap-2 text-sm xl:text-base">
                  <ListChecks className="text-main-30" />
                  Total de tarefas
                </div>
                <div className="font-bold text-xl lg:text-3xl">250</div>
              </div>
              <div className="flex flex-col gap-3 p-3 lg:p-4 bg-card border border-gray-20 rounded-md col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 text-sm xl:text-base">
                  <GaugeCircle className="text-main-30" />
                  Conclusão geral
                </div>
                <div className="font-bold text-xl lg:text-3xl">80%</div>
              </div>
            </div>
            <div className="flex flex-col gap-8 bg-card p-4 rounded-md border border-gray-20">
              <div className="flex gap-2">
                <CircleQuestionMark className="text-main-30" />
                <p className="text-sm xl:text-base">Histórico de tentativas de quizzes</p>
              </div>
              <ProfileAttemptTable />
            </div>
          </div>
        </div>
      </section>
      <EditProfileModal isEditing={isEditing} setIsEditing={setIsEditing}
        defaultValues={{
          name: "Nome de usuário",
          username: "username",
          password: "Minhasenha1234",
          profileImageUrl: "https://res.cloudinary.com/dvuxplf3j/image/upload/v1762865460/Users/ei4tafudigauwduwluws.jpg"
        }}
      />
      <DeleteProfileModal isDeleting={isDeleting} setIsDeleting={setIsDeleting} />
    </div>
  );
}
