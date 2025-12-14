"use client";
import { BookOpenCheck, ListChecks, GaugeCircle, CircleQuestionMark, Loader2 } from "lucide-react";
import { useUser } from "@/src/api/user/useUser";
import { ProfileAttemptTable } from "@/components/layout/profile/profileAttemptTable";
import { ProfileCard } from "@/components/layout/profile/profileCard";
import { useState } from "react";
import { EditProfileModal } from "@/components/layout/profile/editProfileModal";
import { DeleteProfileModal } from "@/components/layout/profile/deleteProfileModal";
import { ProfileCardSkeleton } from "@/components/layout/profile/profileCardSkeleton";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, loading, fetchUser } = useUser();

  return (
    <div className="layoutDiv flex flex-col gap-10">
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Perfil</h1>
        <h2 className="dashboardSectionSubtitle">Veja e gerencie seus dados pessoais</h2>
        <div className="flex flex-col lg:flex-row items-start gap-4">
          {loading || !data?.user ? (
            <ProfileCardSkeleton />
          ) : (
            <ProfileCard data={data?.user}
              setIsEditing={setIsEditing} setIsDeleting={setIsDeleting}
            />
          )}
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 flex-1 w-full">
              <div className="flex flex-col gap-3 p-3 lg:p-4 bg-card border border-gray-20 rounded-md">
                <div className="flex items-center gap-2 text-sm xl:text-base">
                  <BookOpenCheck className="text-main-30" />
                  Total de estudos
                </div>
                <div className="font-bold text-xl lg:text-3xl">{data?.studiesCount ?? <Loader2 className="w-5 h-5 animate-spin" />}</div>
              </div>
              <div className="flex flex-col gap-3 p-3 lg:p-4 bg-card border border-gray-20 rounded-md">
                <div className="flex items-center gap-2 text-sm xl:text-base">
                  <ListChecks className="text-main-30" />
                  Total de tarefas
                </div>
                <div className="font-bold text-xl lg:text-3xl">{data?.tasksCount ?? <Loader2 className="w-5 h-5 animate-spin" />}</div>
              </div>
              <div className="flex flex-col gap-3 p-3 lg:p-4 bg-card border border-gray-20 rounded-md col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 text-sm xl:text-base">
                  <GaugeCircle className="text-main-30" />
                  Conclusão geral
                </div>
                <div className="font-bold text-xl lg:text-3xl">{data?.studiesPercentage ?? <Loader2 className="w-5 h-5 animate-spin" />}</div>
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
      {data && data.user &&
        <EditProfileModal isEditing={isEditing} setIsOpen={setIsEditing} fetchUser={fetchUser}
          defaultValues={{
            name: data.user.name,
            username: data.user.username,
            profileImage: data.user.profileImage
          }}
        />
      }
      <DeleteProfileModal isDeleting={isDeleting} setIsDeleting={setIsDeleting} />
    </div>
  );
}