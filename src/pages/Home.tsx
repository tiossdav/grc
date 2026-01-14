import { Header } from "@/components/layout/header";
import AboutSection from "./home/about-section";
import FAQAccordion from "./home/faq-accordion";
import aerial from "@/assets/videos/aerial.mp4";
import power from "@/assets/images/power.jpg";
import { PartnerReport } from "./home/partner-report";
import { Testimonial } from "./home/testimonial";
import { UserTestimonial } from "./home/user-testimonial";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";

const Home = () => {
  return (
    <div className="bg-[#f2edff] flex space-y-0 flex-col">
      <Header />
      <div className="space-y-8">
        <section className="relative h-[70vh] w-full overflow-hidden">
          {/* Background video */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={aerial} type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto max-w-4xl px-6 text-center text-white">
              <h1 className="text-3xl md:text-5xl font-bold">
                Advancing Knowledge Together
              </h1>
            </div>
          </div>
        </section>
        <AboutSection />
        <Testimonial />
        <section className="bg-[#f2edff]  px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl">
              {/* Image section */}
              <div className="relative">
                <img
                  src={power} // replace with your image path
                  alt="Social Investment"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content section */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-xl font-semibold text-indigo-800">
                  Good Finance Presents:
                </h2>

                <h1 className="mt-2 text-3xl font-bold text-indigo-900">
                  Benny&apos;s Social Investment Story
                </h1>

                <p className="mt-4 text-lg font-medium text-indigo-900">
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
                  <button className="rounded-lg bg-purple-600 px-6 py-3 text-white font-semibold shadow-md transition hover:bg-purple-700">
                    Watch the series
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PartnerReport />
        <section className="bg-[#f2edff]  px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl">
              {/* Content section */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-xl font-semibold text-indigo-800">
                  Good Finance Presents:
                </h2>

                <h1 className="mt-2 text-3xl font-bold text-indigo-900">
                  Benny&apos;s Social Investment Story
                </h1>

                <p className="mt-4 text-lg font-medium text-indigo-900">
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
                  <button className="rounded-lg bg-purple-600 px-6 py-3 text-white font-semibold shadow-md transition hover:bg-purple-700">
                    Watch the series
                  </button>
                </div>
              </div>

              {/* Image section */}
              <div className="relative">
                <img
                  src={power} // replace with your image path
                  alt="Social Investment"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <UserTestimonial />
        <FAQAccordion />
        <div className="bg-[#190974] py-10 text-center flex flex-col items-center justify-center">
          <p className="text-4xl text-white mb-5 ">
            Explore recent case studies
          </p>
          <div className="flex items-end gap-4 text-white">
            <div className="flex flex-col min-w-[220px] text-base items-start">
              <label className="mb-1 pl-3 text-sm font-medium">Location</label>
              <select
                defaultValue=""
                className="w-full px-3 py-2 border bg-white outline-none rounded-md text-gray-400"
              >
                <option value="" disabled hidden>
                  -Any-
                </option>
                <option value="nigeria">Nigeria</option>
              </select>
            </div>

            <div className="flex flex-col min-w-[220px] items-start">
              <label className="mb-1 pl-3 text-sm font-medium">
                Investment range
              </label>
              <select
                defaultValue=""
                className="w-full px-3 py-2 border bg-white outline-none rounded-md text-gray-400"
              >
                <option value="" disabled hidden>
                  -Any-
                </option>
                <option value="any">Any</option>
                <option value="0-10k">0 – 10k</option>
              </select>
            </div>

            <div className="flex flex-col min-w-[220px] items-start">
              <label className="mb-1 pl-3 text-sm font-medium">
                Social issue area
              </label>
              <select
                defaultValue=""
                className="w-full px-3 py-2 border bg-white outline-none rounded-md text-gray-400"
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
              className="text-white bg-[#004fd7] border-white py-1 px-6"
            >
              <span className="tracking-wider">Apply</span>
            </Button>
          </div>
        </div>

        <section className="bg-[#f2edff]  px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl">
              {/* Image section */}
              <div className="relative">
                <img
                  src="" // replace with your image path
                  alt="Social Investment"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content section */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-xl font-semibold text-indigo-800">
                  Good Finance Presents:
                </h2>

                <h1 className="mt-2 text-3xl font-bold text-indigo-900">
                  Benny&apos;s Social Investment Story
                </h1>

                <p className="mt-4 text-lg font-medium text-indigo-900">
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
                  <button className="rounded-lg bg-purple-600 px-6 py-3 text-white font-semibold shadow-md transition hover:bg-purple-700">
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
