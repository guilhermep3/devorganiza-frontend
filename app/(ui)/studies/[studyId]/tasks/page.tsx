"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/button";
import { Button as ButtonCN } from "@/components/ui/button";
import { useStudy } from "@/src/api/useStudy";
import { Task } from "@/src/types/study";
import { EditStudyModal } from "@/components/layout/studies/editStudyModal";
import { TaskItem } from "@/components/layout/tasks/taskItem";
import { CreateTaskModal } from "@/components/layout/tasks/createTaskModal";
import { useDeleteStudy } from "@/src/api/useDeleteStudy";
import { DeleteModal } from "@/components/layout/dashboard/deleteModal";
import { useDeleteTask } from "@/src/api/useDeleteTask";
import { EditTaskModal } from "@/components/layout/tasks/editTaskModal";
import { TaskItemSkeleton } from "@/components/layout/tasks/taskItemSkeleton";

export default function Page() {
  const params = useParams();
  const studyId = Number(Array.isArray(params.studyId)
    ? params.studyId[0] : params.studyId);
  const { data, loading, fetchStudy } = useStudy(studyId!);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [isEditingStudy, setIsEditingStudy] = useState(false);
  const [isDeletingStudy, setIsDeletingStudy] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const {
    handleDelete: deleteStudy, loading: loadingDeleteStudy, error: errorDeleteStudy
  } = useDeleteStudy(studyId ?? null);
  const {
    handleDelete: deleteTask, loading: loadingDeleteTask, error: errorDeleteTask
  } = useDeleteTask(taskId);

  return (
    <div className="layoutDiv">
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="dashboardSectionTitle text-start">{data?.study?.name ?? "Estudo"}</h1>
            <h2 className="dashboardSectionSubtitle">
              studies/{studyId}/tasks
            </h2>
          </div>
          <div className="flex gap-2">
            <ButtonCN size={"sm"} onClick={() => setIsEditingStudy(true)} className="bg-main-30 hover:bg-main-30 hover:brightness-95">
              <Pencil size={18} />
            </ButtonCN>
            <ButtonCN size={"sm"} onClick={() => setIsDeletingStudy(true)} variant="destructive">
              <Trash size={18} />
            </ButtonCN>
          </div>
        </div>
        <div className="flex justify-start">
          <Button size={1} className="flex gap-2" onClick={() => setIsCreatingTask(true)}>
            <Plus size={18} />
            Nova tarefa
          </Button>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <TaskItemSkeleton key={index} />
            ))}
          </div>
        ) : data?.tasks?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {data.tasks.map((task: Task) => (
              <TaskItem key={task.id} task={task}
                setTaskId={() => setTaskId(task.id)}
                setIsEditingTask={setIsEditingTask} setIsDeletingTask={setIsDeletingTask}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Nenhuma tarefa cadastrada</p>
        )}
      </section>
      <EditStudyModal isOpen={isEditingStudy} setIsOpen={setIsEditingStudy}
        study={data?.study ?? null} fetchStudy={fetchStudy}
      />
      <DeleteModal isOpen={isDeletingStudy} setIsOpen={setIsDeletingStudy}
        id={studyId} handleAction={deleteStudy}
        title="Excluir estudo" description="Essa ação não poderá ser desfeita."
        loading={loadingDeleteStudy} error={errorDeleteStudy}
      />
      <EditTaskModal isOpen={isEditingTask} setIsOpen={setIsEditingTask}
        task={data?.tasks.find((i) => i.id === taskId)} fetchStudy={fetchStudy}
      />
      <DeleteModal isOpen={isDeletingTask} setIsOpen={setIsDeletingTask}
        id={studyId} handleAction={deleteTask}
        title="Excluir tarefa" description="Essa ação não poderá ser desfeita."
        loading={loadingDeleteTask} error={errorDeleteTask}
      />
      <CreateTaskModal isOpen={isCreatingTask} setIsOpen={setIsCreatingTask}
        studyId={studyId}
      />
    </div>
  );
}
