export function NoteCardSkeleton() {

  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl border border-gray-20 bg-white dark:bg-gray-10 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-20 dark:bg-gray-30 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 w-3/4 rounded bg-gray-20 dark:bg-gray-30" />
          <div className="h-3 w-1/3 rounded bg-gray-20 dark:bg-gray-30" />
        </div>
      </div>
    </div>
  );
}