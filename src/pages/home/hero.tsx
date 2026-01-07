import aerial from "@/assets/videos/aerial.mp4";

function Hero() {
  return (
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
  );
}

export default Hero;
