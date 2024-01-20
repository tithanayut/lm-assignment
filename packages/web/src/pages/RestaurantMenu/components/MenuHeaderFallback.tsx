import { PageContainer } from "@/common/components/container";

export function MenuHeaderFallback() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[calc(100vh*0.25)] lg:h-[calc(100vh*0.3)] bg-gray-300 animate-pulse" />
      <PageContainer>
        <div className="w-3/4 md:w-1/2 h-[40px] mt-4 lg:mt-8 bg-gray-300 rounded-xl animate-pulse" />
      </PageContainer>
    </div>
  );
}
