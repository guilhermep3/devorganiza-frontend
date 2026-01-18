"use client"
import { Button } from "@/components/button";
import { CreateStudyModal } from "@/components/layout/studies/createStudyModal";
import { StudySkeleton } from "@/components/layout/studies/studySkeleton";
import { StudyCard } from "@/components/layout/studies/studyCard";
import { useStudies } from "@/src/api/study/useStudies";
import { StudyTask } from "@/src/types/study";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { data, isLoading, refetch } = useStudies();
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="layoutDiv">
      <section className="flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="dashboardSectionTitle">Estudos</h1>
            <h2 className="dashboardSectionSubtitle">Veja seus estudos e progresso</h2>
          </div>
          <Button size={1} className="flex items-center gap-2 h-fit px-1! md:px-4! text-white"
            onClick={() => setIsCreating(true)}
          >
            <Plus />
            <p className="hidden lg:block">Criar</p>
          </Button>
        </div>
        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <StudySkeleton key={index} />
              ))}
            </div>
          ) : data ? (
            <>
              {data.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
                  {data.map((i: StudyTask, index) => (
                    <StudyCard key={index} data={i} />
                  ))}
                </div>
              ) : <p className="text-sm w-full text-gray-60">Nenhum estudo criado ainda, crie seu primeiro</p>
              }
            </>
          ) : (
            <p className="text-gray-40 w-full">Nenhum dado encontrado</p>
          )}
        </div>
      </section>
      <CreateStudyModal isOpen={isCreating} setIsOpen={setIsCreating} refetch={refetch} />
    </div>
  )
}