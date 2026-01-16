import investment from "@/assets/images/investment.png";

export default function AboutSection() {
  return (
    <>
      <section className="bg-[#f2edff] px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Image section */}
            <div className="relative">
              <img
                src={investment} // replace with your image path
                alt="Social Investment"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content section */}
            <div className="flex flex-col justify-center p-8 md:p-12 bg-[#ff9815] text-white">
              <h2 className="text-2xl text-center font-semibold  ">
                Graduate Research clinic
              </h2>

              <p className="mt-0 text-sm text-center font-bold ">
                Research. Mentorship. Impact.
              </p>

              <p className="mt-4 text-lg font-medium ">
                A beaver with a big heart. A fairy with big ideas. A forest
                ready for change.
              </p>

              <p className="mt-4 max-w-xl ">
                Follow Benny as he discovers social investment and transforms
                hope into a thriving venture for animals in need — a real social
                investment journey told through the eyes of the animal world.
              </p>

              <div className="mt-6">
                <button className="rounded-lg bg-slate-100 px-6 py-3 text-white font-semibold shadow-md transition hover:bg-[#95111c]">
                  Watch the series
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
