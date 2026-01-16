import { useRef, useEffect } from "react";
import { Header } from "@/components/layout/header";
import AboutSection from "./home/about-section";
import FAQAccordion from "./home/faq-accordion";
// import hero from "@/assets/videos/hero.mp4";
import library from "@/assets/images/library.jpg";
import power from "@/assets/images/power.jpg";
import { PartnerReport } from "./home/partner-report";
import { Testimonial } from "./home/testimonial";
import { UserTestimonial } from "./home/user-testimonial";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // 0.5 = half speed
    }
  }, []);
  return (
    <div className="bg-[#f2edff] flex space-y-0 flex-col">
      <Header />
      <div className="space-y-8 font-montserrat">
        <section className="relative h-[80vh] w-full overflow-hidden">
          {/* <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={hero} type="video/mp4" />
          </video> */}
          <img
            src={library}
            alt="library"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full justify-center items-center text-center px-6 lg:px-12">
            <div className="max-w-7xl text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Advancing Knowledge Together
              </h1>
              <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto">
                Connect, learn, and collaborate with researchers and mentors
                committed to advancing African scholarship and solving
                real-world development challenges.
              </p>
            </div>
            <Button className="mt-12 lg:mt-20 px-8 py-3 text-white font-semibold tracking-wider hover:scale-105 transition-transform">
              Get Started
            </Button>
          </div>
        </section>
        <AboutSection />
        <Testimonial />
        <section className="bg-[#f2edff] py-12 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl">
              {/* Image section */}
              <div className="relative h-64 md:h-auto">
                <img
                  src={power}
                  alt="Social Investment"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content section */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-xl font-semibold text-[#95111c]">
                  Good Finance Presents:
                </h2>

                <h1 className="mt-2 text-3xl font-bold text-[#95111c]">
                  Benny&apos;s Social Investment Story
                </h1>

                <p className="mt-4 text-lg font-medium text-[#95111c]">
                  A beaver with a big heart. A fairy with big ideas. A forest
                  ready for change.
                </p>

                <p className="mt-4 max-w-xl text-gray-600">
                  Follow Benny as he discovers social investment and transforms
                  hope into a thriving venture for animals in need — a real
                  social investment journey told through the eyes of the animal
                  world.
                </p>

                <div className="mt-6">
                  <button className="rounded-lg bg-[#95111c] px-6 py-3 text-white font-semibold shadow-md transition hover:bg-[#7a0e16]">
                    Watch the series
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PartnerReport />
        <section className="bg-[#f2edff] py-12 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl">
              {/* Content section */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-xl font-semibold text-[#95111c]">
                  Good Finance Presents:
                </h2>

                <h1 className="mt-2 text-3xl font-bold text-[#95111c]">
                  Benny&apos;s Social Investment Story
                </h1>

                <p className="mt-4 text-lg font-medium text-[#95111c]">
                  A beaver with a big heart. A fairy with big ideas. A forest
                  ready for change.
                </p>

                <p className="mt-4 max-w-xl text-gray-600">
                  Follow Benny as he discovers social investment and transforms
                  hope into a thriving venture for animals in need — a real
                  social investment journey told through the eyes of the animal
                  world.
                </p>

                <div className="mt-6">
                  <button className="rounded-lg bg-[#95111c] px-6 py-3 text-white font-semibold shadow-md transition hover:bg-[#7a0e16]">
                    Watch the series
                  </button>
                </div>
              </div>

              {/* Image section */}
              <div className="relative h-64 md:h-auto">
                <img
                  src={power}
                  alt="Social Investment"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <UserTestimonial />
        <FAQAccordion />
        <div className="bg-[#190974] py-10 lg:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-3xl lg:text-4xl text-white mb-8 text-center">
              Explore recent case studies
            </p>
            <div className="flex flex-wrap lg:flex-nowrap items-end gap-4 justify-center text-white">
              <div className="flex flex-col w-full lg:min-w-[220px] lg:w-auto text-base items-start">
                <label className="mb-1 pl-3 text-sm font-medium">
                  Location
                </label>
                <select
                  defaultValue=""
                  className="w-full px-3 py-2 border bg-white outline-none rounded-md text-gray-700"
                >
                  <option value="" disabled hidden>
                    -Any-
                  </option>
                  <option value="nigeria">Nigeria</option>
                </select>
              </div>

              <div className="flex flex-col w-full lg:min-w-[220px] lg:w-auto items-start">
                <label className="mb-1 pl-3 text-sm font-medium">
                  Investment range
                </label>
                <select
                  defaultValue=""
                  className="w-full px-3 py-2 border bg-white outline-none rounded-md text-gray-700"
                >
                  <option value="" disabled hidden>
                    -Any-
                  </option>
                  <option value="any">Any</option>
                  <option value="0-10k">0 – 10k</option>
                </select>
              </div>

              <div className="flex flex-col w-full lg:min-w-[220px] lg:w-auto items-start">
                <label className="mb-1 pl-3 text-sm font-medium">
                  Social issue area
                </label>
                <select
                  defaultValue=""
                  className="w-full px-3 py-2 border bg-white outline-none rounded-md text-gray-700"
                >
                  <option value="" disabled hidden>
                    -Any-
                  </option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                </select>
              </div>

              <Button
                variant="custom"
                size="sm"
                className="w-full lg:w-auto text-white bg-[#004fd7] border-white py-2 px-8 hover:bg-[#003aa8] transition-colors"
              >
                <span className="tracking-wider">Apply</span>
              </Button>
            </div>
          </div>
        </div>

        <section className="bg-[#f2edff] py-12 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl">
              {/* Image section */}
              <div className="relative h-64 md:h-auto bg-gray-200">
                <img
                  src={power}
                  alt="Social Investment"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content section */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-xl font-semibold text-[#95111c]">
                  Good Finance Presents:
                </h2>

                <h1 className="mt-2 text-3xl font-bold text-[#95111c]">
                  Benny&apos;s Social Investment Story
                </h1>

                <p className="mt-4 text-lg font-medium text-[#95111c]">
                  A beaver with a big heart. A fairy with big ideas. A forest
                  ready for change.
                </p>

                <p className="mt-4 max-w-xl text-gray-600">
                  Follow Benny as he discovers social investment and transforms
                  hope into a thriving venture for animals in need — a real
                  social investment journey told through the eyes of the animal
                  world.
                </p>

                <div className="mt-6">
                  <button className="rounded-lg bg-[#95111c] px-6 py-3 text-white font-semibold shadow-md transition hover:bg-[#7a0e16]">
                    Watch the series
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
