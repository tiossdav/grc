import power from "@/assets/images/power.jpg";

export default function Trustees() {
  return (
    <>
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
                hope into a thriving venture for animals in need — a real social
                investment journey told through the eyes of the animal world.
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
    </>
  );
}
