import { Link } from "react-router-dom";

import { cn } from "@/common/utils/cn";

interface MenuItemProps {
  id: string;
  name: string;
  image?: string;
  fullPrice: number;
  discountedPrice?: number;
  isInStock: boolean;
}

export function MenuItem(props: MenuItemProps) {
  const { id, name, image, fullPrice, discountedPrice, isInStock } = props;

  return (
    <Link to={id} className="flex gap-4 hover:bg-gray-200 p-3 rounded-[18px]">
      {image ? (
        <img
          src={image}
          className={cn("min-w-[110px] h-[110px] object-cover rounded-xl", !isInStock && "grayscale")}
          alt={name}
        />
      ) : (
        <div className="flex justify-center items-center min-w-[110px] h-[110px] text-sm bg-gray-300 rounded-xl">
          ไม่มีภาพประกอบ
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg">
          {name} <span>{!isInStock && "(หมด)"}</span>
        </h2>
        <div className="flex items-center gap-2">
          <p className={cn(fullPrice !== discountedPrice && "line-through")}>{fullPrice} บาท</p>
          {fullPrice !== discountedPrice && <p>{discountedPrice} บาท</p>}
        </div>
      </div>
    </Link>
  );
}
