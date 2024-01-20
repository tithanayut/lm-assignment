export function MenuItemFallback() {
  return (
    <div className="flex gap-4 p-3 rounded-[18px] w-full animate-pulse">
      <div className="min-w-[110px] h-[110px] bg-gray-200 rounded-xl" />
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full h-5 bg-gray-200 rounded" />
        <p className="w-32 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
