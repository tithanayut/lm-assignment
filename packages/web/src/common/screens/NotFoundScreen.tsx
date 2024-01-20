import { Link } from "react-router-dom";

import { Button } from "@/common/components/button";

export function NotFoundScreen() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 justify-center items-center w-screen h-screen">
      <h1 className="text-2xl lg:text-3xl text-center font-bold">ไม่พบหน้าที่คุณต้องการ</h1>
      <Button asChild>
        <Link to="/">กลับหน้าหลัก</Link>
      </Button>
    </div>
  );
}
