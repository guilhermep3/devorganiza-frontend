"use client"
import { Button } from "@/components/button";
import { CreateStudyModal } from "@/components/layout/studies/createStudyModal";
import { LoadingStudy } from "@/components/layout/studies/loadingStudy";
import { StudyCard } from "@/components/layout/studies/studyCard";
import { useStudies } from "@/src/api/useStudies";
import { StudyTask } from "@/src/types/study";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { data, loading, error } = useStudies();
  const [isCreating, setIsCreating] = useState(false);

  console.log("Data from API:", data);
  console.log("Type of data:", typeof data);

  return (
    <div className="layoutDiv">
      <section className="flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="dashboardSectionTitle">Dados dos seus estudos</h1>
            <h2 className="dashboardSectionSubtitle">Veja seus estudos e progresso</h2>
          </div>
          <Button size={1} className="flex items-center gap-2 h-fit px-1! md:px-4!"
            onClick={() => setIsCreating(true)}
          >
            <Plus />
            <p className="hidden lg:block">Criar</p>
          </Button>
        </div>
        <div className="">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <LoadingStudy />
              <LoadingStudy />
            </div>
          ) : data ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {data.map((study: StudyTask, index) => (
                <StudyCard key={index} data={study} />
              ))}
            </div>
          ) : (
            <p className="text-gray-30 w-full">Nenhum dado encontrado</p>
          )}
        </div>
      </section>
      <CreateStudyModal isCreating={isCreating} setIsCreating={setIsCreating} />
    </div>
  )
}