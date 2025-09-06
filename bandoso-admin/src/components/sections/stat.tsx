import { countAreas } from "@/services/areas.service";
import { countPanoramas } from "@/services/panoramas.service";
import { countVisitLogs } from "@/services/visitor_logs.service";
import { useEffect, useState } from "react";
import { NumberTicker } from "@/components/magicui/number-ticket";

import { TextAnimate } from "../magicui/text-animate";
import GradientCardBlock from "../blocks/GradientCardBlock";

export function StatsSection() {
  const [totalVisitorLogs, setTotalVisitorLogs] = useState(0);
  const [totalAreas, setTotalAreas] = useState(0);
  const [totalPanoramas, setTotalPanoramas] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [visitorLogsCount, areasCount, panoramasCount] =
          await Promise.all([countVisitLogs(), countAreas(), countPanoramas()]);

        setTotalVisitorLogs(visitorLogsCount);
        setTotalAreas(areasCount);
        setTotalPanoramas(panoramasCount);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="pt-8 px-4 sm:pt-12 sm:px-6 md:pt-8 lg:px-24 flex w-full justify-center">
      <div className="container">
        <h2 className="py-8  text-2xl text-center font-bold md:text-4xl lg:text-5xl">
          <TextAnimate animation="blurIn" as="h1">
            Những con số biết nói
          </TextAnimate>
        </h2>

        <div className="mt-4 sm:mt-8 grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5 justify-center">
          <GradientCardBlock className="!p-4 col-span-2">
            <span className="text-5xl md:text-6xl font-bold text-white text-shadow-md">
              <NumberTicker value={totalVisitorLogs} />+
            </span>
            <p className="mt-6 font-semibold text-xl font-bold">lượt xem</p>
            <p className="mt-2 text-[17px] text-white">
              đã được thực hiện trong khu vực.
            </p>
          </GradientCardBlock>
          <GradientCardBlock className="!p-4 col-span-1 !bg-accent">
            <span className="text-5xl md:text-6xl font-bold text-white text-shadow-md">
              <NumberTicker value={totalAreas} />
            </span>
            <p className="mt-6 font-semibold text-xl font-bold">địa điểm</p>
            <p className="mt-2 text-[17px] text-white">
              đã được cập nhật lên hệ thống.
            </p>
          </GradientCardBlock>
          <GradientCardBlock className="!p-4 col-span-1    ">
            <span className="text-5xl md:text-6xl font-bold text-white text-shadow-md">
              <NumberTicker value={totalPanoramas} />
            </span>
            <p className="mt-6 font-semibold text-xl font-bold">điểm nhìn</p>
            <p className="mt-2 text-[17px] text-white">
              đã được số hóa thành công trong các địa điểm.
            </p>
          </GradientCardBlock>
        </div>
      </div>
    </section>
  );
}
