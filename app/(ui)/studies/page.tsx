"use client"
import { LoadingStudy } from "@/components/layout/studies/loadingStudy";
import { StudyCard } from "@/components/layout/studies/studyCard";
import { useStudies } from "@/src/api/useStudies";

export default function Page() {
  const { data, loading, error } = useStudies();

  return (
    <div className="layoutDiv">
      <section className="flex flex-col">
        <h1 className="dashboardSectionTitle">Dados dos seus estudos</h1>
        <h2 className="dashboardSectionSubtitle">Veja seus estudos e progresso</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {loading && <LoadingStudy />}
          {!loading && data && data?.length > 0 ? (
            data!.map((study: any) => (
              <StudyCard key={study.id} data={study} />
            ))
          ) : (
            <StudyCard />
          )}
        </div>
      </section>
    </div>
  )
}