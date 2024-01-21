export function MenuDrawerContentFallback() {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto rounded-xl animate-pulse">
      <div className="flex justify-center py-6 sticky top-0 bg-white">
        <h2 className="text-3xl lg:text-4xl text-center w-[calc(100%-180px)]">
          <div className="w-full h-10 bg-gray-200 rounded-xl" />
        </h2>
      </div>
      <div className="w-full h-[330px] bg-gray-200 rounded-xl" />
      <div className="flex flex-col items-center gap-2 px-6 w-full">
        <div className="text-2xl lg:text-3xl border-b pb-3 border-gray-300 w-full">
          <div className="w-full h-6 bg-gray-200 rounded-lg" />
        </div>
        <div className="flex flex-col gap-2 py-1 w-full">
          <div className="w-full h-6 bg-gray-200 rounded-lg" />
          <div className="w-full h-6 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
