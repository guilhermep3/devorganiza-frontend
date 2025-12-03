import { Button } from "@/components/button";
import { Study } from "@/src/api/useStudies";
import { List, ListCheck } from "lucide-react";

type props = {
  data?: Study;
}
export const StudyCard = ({ data }: props) => {

  return (
    <div className="flex flex-col border border-gray-30 hover:border-main-30 rounded-md overflow-hidden transition">
      <div className="flex flex-col gap-3 border-t border-gray-30 p-2 md:p-3">
        <div className="flex flex-col">
          <p className="font-semibold text-base md:text-lg mb-1">{data?.name ?? "Nome do estudo"}</p>
          <p className="text-sm text-gray-50">{data?.type ?? 'Área de estudo'}</p>
          <p className="text-sm text-gray-50">{data?.description ?? 'Descrição de estudo'}</p>
        </div>
        <div className="flex mt-5">
          <div
            className="flex-1 flex justify-center items-center gap-1 font-bold text-sm md:text-lg text-main-30"
            title="Total de tarefas"
          >
            <List className="w-5 h-5 md:w-6 md:h-6" />
            {data?.tasks ?? 20}
          </div>
          <div
            className="flex-1 flex justify-center items-center gap-1 font-bold text-sm md:text-lg text-green-20 border-x border-gray-20"
            title="Tarefas finalizadas"
          >
            <ListCheck className="w-5 h-5 md:w-6 md:h-6" />
            {data?.tasks.finished ?? 20}
          </div>
          <div
            className="flex-1 flex justify-center items-center gap-1 font-bold text-sm md:text-lg text-main-40"
            title="Progresso"
          >
            <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-main-40 rounded-full"></div>
            15
          </div>
        </div>
        <Button
          className="w-full text-sm md:text-base"
          href={`/studies/1/tasks`}
        >
          Ver Estudo
        </Button>
      </div>
    </div>
  );
};
