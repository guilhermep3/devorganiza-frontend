"use client";
import { BookOpenCheck, ListChecks, GaugeCircle, CircleQuestionMark, Loader2 } from "lucide-react";
import { useUser } from "@/src/api/user/useUser";
import { ProfileAttemptTable } from "@/components/layout/profile/profileAttemptTable";
import { ProfileCard } from "@/components/layout/profile/profileCard";
import { useEffect, useState } from "react";
import { EditProfileModal } from "@/components/layout/profile/editProfileModal";
import { DeleteProfileModal } from "@/components/layout/profile/deleteProfileModal";
import { ProfileCardSkeleton } from "@/components/layout/profile/profileCardSkeleton";
import { TopCard } from "@/components/layout/profile/topCard";
import { LogoutModal } from "@/components/layout/profile/logoutModal";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLogOut, setIsLogout] = useState(false);
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
              setIsLogout={setIsLogout}
            />
          )}
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 flex-1 w-full">
              <TopCard title="Total de estudos"
                data={data?.studiesCount ?? 0}
                Icon={BookOpenCheck}
              />
              <TopCard title="Total de tarefas"
                data={data?.tasksCount ?? 0}
                Icon={ListChecks}
              />
              <TopCard title="Conclusão geral"
                data={data?.studiesPercentage ?? 0}
                Icon={GaugeCircle}
                percentage
              />
            </div>
            <div className="flex flex-col gap-8 bg-card p-4 rounded-md border border-gray-20">
              <div className="flex gap-2">
                <CircleQuestionMark className="text-main-30" />
                <p className="text-sm xl:text-base">Histórico de tentativas de quizzes</p>
              </div>
              {data ? (
                <ProfileAttemptTable />
              ) : (
                <div className="text-gray-40 w-full">Nenhum dado encontrado</div>
              )
              }
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
      <LogoutModal isLogOut={isLogOut} setIsLogout={setIsLogout} />
    </div>
  );
}