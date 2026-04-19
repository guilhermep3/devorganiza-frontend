"use client"
import { TopInfos } from "@/components/layout/dashboard/topInfos";
import { useStudies } from "@/src/api/study/useStudies";
import { useQuizzes } from "@/src/api/quiz/useQuizzes";
import { useQuizzesLocked } from "@/src/api/quiz/useQuizzesLocked";
import { TopInfosSkeleton } from "@/components/layout/dashboard/topInfosSkeleton";
import { useUser } from "@/src/api/user/useUser";
import { DashboardStudiesSection } from "@/components/layout/dashboard/studiesSection";
import { DashboardQuizzesSection } from "@/components/layout/dashboard/quizzesSection";

export default function Page() {
  const { data: userData } = useUser();
  const { data: studiesData } = useStudies();
  const { data: quizzesData } = useQuizzes();
  const { data: quizzesLockData } = useQuizzesLocked();

  const hasTopInfosData = !!userData && !!studiesData && !!quizzesData && !!quizzesLockData;

  return (
    <div className="ds-layout-container">
      {!hasTopInfosData ? (
        <TopInfosSkeleton />
      ) : (
        <TopInfos
          userData={userData}
          studiesData={studiesData}
          quizzesData={quizzesData}
          quizzesLockData={quizzesLockData}
        />
      )}
      <DashboardStudiesSection />
      <DashboardQuizzesSection />
    </div>
  )
}