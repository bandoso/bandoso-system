import DialogWrapper from "@/components/blocks/DialogWrapper";
import Footer from "@/components/blocks/footer/footer";
import LoaderBlock from "@/components/blocks/LoaderBlock";
import MapDialogBlock from "@/components/blocks/MapBlock";
import Navbar from "@/components/blocks/navbar/navbar";
import { SectionWrapper } from "@/components/wrappers/SectionWrapper";
import { SECTION_IDS, SECTIONS_CONFIG } from "@/constants/sections.constants";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import useVRStore from "@/stores/vr.store";
import { useRef, useEffect } from "react";
// import { SECTIONS_CONFIG, SECTION_IDS } from "@/constants/sections.constants";
// import { SectionWrapper } from "../wrappers/SectionWrapper";
// import { useScrollSpy } from "@/hooks/useScrollSpy";
// import useVRStore from '@/store/vr.store'
// import LoaderBlock from '../block/LoaderBlock'

const LandingPage = () => {
  const { loadData, isLoading } = useVRStore((state) => state);

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);
  const navbarRef = useRef<HTMLElement | null>(null);
  const { activeSection, scrollToSection } = useScrollSpy({
    sectionIds: SECTION_IDS,
    offset: 20,
  });

  useEffect(() => {
    console.log("Current active section:", activeSection);
  }, [activeSection]);

  return (
    <>
      {isLoading && <LoaderBlock />}

      <div className="dark bg-background text-foreground w-full min-h-screen">
        <Navbar
          ref={navbarRef}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />
        {SECTIONS_CONFIG.map((section) => {
          const Component = section.component;
          const isHero = section.id === "hero";

          return (
            <SectionWrapper
              key={section.id}
              id={section.id}
              className={isHero ? "min-h-[100vh]" : ""}
            >
              <Component />
            </SectionWrapper>
          );
        })}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
