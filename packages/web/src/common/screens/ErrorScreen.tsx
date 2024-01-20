import { Button } from "../components/button";

export function ErrorScreen() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 justify-center items-center w-screen h-screen">
      <h1 className="text-2xl lg:text-3xl text-center font-bold">ขออภัย เกิดปัญหาบางประการ</h1>
      <Button asChild>
        <a href="/">กลับหน้าหลัก</a>
      </Button>
    </div>
  );
}
