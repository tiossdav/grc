import { Header } from "@/components/layout/header";
import hher from "@/assets/images/hher.png";
import debyt from "@/assets/images/debyt.png";
import equity from "@/assets/images/equity.png";
import turbine from "@/assets/images/turbine.png";
import support from "@/assets/images/support.png";
import Footer from "@/components/layout/footer";
import DiagnosticCard from "./toolbox/diagnostic-card";
import CostDialog from "./toolbox/cost-dialog";
import LoanCalculator from "./toolbox/loan-calculator";

const Hub = () => {
  return (
    <div className="bg-[#f2edff] flex space-y-8 flex-col">
      <Header />
      <section className=" flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Section - Teal Background */}
            <div className="w-full bg-red-400">
              <img
                src={hher} // replace with your image path
                alt="Person Thinking"
                className="max-w-full max-h-full object-cover"
              />
            </div>

            {/* Right Section - Purple Background with Image */}
            <div className="bg-white px-12 py-10 flex flex-col font-montserrat text-black">
              <p className="text-2xl md:text-2xl  font-montserrat mb-6">
                Social investment is the use of{" "}
                <span className="font-bold">repayable finance</span> to help an
                organisation achieve a social purpose.
              </p>

              <p className="text-2xl md:text-2xl mb-6 font-montserrat leading-8 tracking-normal">
                <span className="font-bold">Charities</span> and{" "}
                <span className="font-bold">social enterprises</span> can use
                repayable finance to help them increase their impact on society,
                by growing their business, providing working capital for
                contract delivery, or buying assets.
              </p>

              <p className="text-sm md:text-lg mb-6 leading-tight opacity-95">
                Social investment is repayable, often with interest. Charities
                and social enterprises may generate a surplus through trading
                activities, contracts for delivering public services, grants and
                donations, or a combination of some or all of these. This
                surplus is then used to repay investors.
              </p>

              <p className="text-sm md:text-lg mb-6 leading-tight opacity-95">
                Social investment is not suitable for everyone, and it should be
                considered alongside other options.
              </p>

              <p className="font-bold text-base">
                Social investment is not a grant or a donation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* investment content */}

      <section className="flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="w-full bg-white aspect-video">
            <iframe
              src="https://www.youtube.com/embed/VPNWgX--WIY"
              title="YouTube video player"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Diagnostic Card */}
      <DiagnosticCard />

      <section className="text-white flex items-center flex-col flex-1 leading-4 space-y-3">
        <div className=" bg-[#b0004b] max-w-7xl space-y-4 p-8 rounded-2xl shadow-2xl overflow-hidden">
          <p className="text-xl font-montserrat font-semibold">
            "If I were to go down the traditional grant funding route, I'd
            probably be looking at more time to see an application through. And
            I thought, if we cut out the middle man and just do it ourselves, it
            would be more efficient and ultimately cheaper."
          </p>
          <p className="text-xl font-montserrat font-semibold">
            Matt Fountain, Freedom Bakery
          </p>
        </div>
      </section>

      {/* investment content */}

      <section className="flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="w-full bg-white aspect-video">
            <iframe
              src="https://www.youtube.com/embed/VPNWgX--WIY"
              title="YouTube video player"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <div className="bg-[#180971] py-8 text-white text-center flex items-center flex-col flex-1 leading-4 ">
        <p className="text-3xl font-montserrat max-w-3xl font-semibold">
          What types of social investment are available?
        </p>
      </div>

      {/* Borrowing Section */}
      <section className=" flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl font-montserrat overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Section - Teal Background */}
            <div className="bg-white px-12 py-6 flex flex-col  text-black">
              <h1 className="text-2xl md:text-3xl font-semibold mb-8">
                Borrowing (Debt)
              </h1>

              <p className="text-base mb-6 leading-tight">
                This is when an organisation borrows money and pays it back,
                usually with interest, over a period of time.
              </p>

              <p className="text-sm md:text-sm mb-4 leading-relaxed tracking-wider opacity-95">
                Example: An investor may loan an organisation £10,000; a total
                of £11,000 is then paid back at £229 per month over four years.
                The borrower has to demonstrate their ability to pay the money
                back from their income streams.
              </p>
              <p className="text-sm md:text-sm mb-4 leading-relaxed tracking-wider opacity-95">
                When it comes to debt, there are two main kinds of loans that a
                charity or social enterprise can take on: secured and unsecured.
              </p>
              <p className="text-sm md:text-sm mb-4 leading-relaxed tracking-wider opacity-95">
                A secured loan is when the borrower uses a tangible asset such
                as a building or equipment (called ‘collateral’) so they can
                acquire a loan.
              </p>
              <p className="text-sm md:text-sm mb-4 leading-relaxed tracking-wider opacity-95">
                An unsecured loan involves an organisation taking on an
                investment that has no ‘collateral’ (is not secured against an
                asset such as a building or equipment)
              </p>
            </div>

            {/* Right Section - Purple Background with Image */}

            <div className="w-full ">
              <img
                src={debyt} // replace with your image path
                alt="Person Thinking"
                className="max-w-full max-h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Equity Section */}
      <section className=" flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl font-montserrat overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Section - Teal Background */}

            <div className="w-full">
              <img
                src={equity} // replace with your image path
                alt="Person Thinking"
                className="max-w-full max-h-full object-cover"
              />
            </div>

            {/* Right Section - Purple Background with Image */}

            <div className="bg-white px-12 py-6 flex flex-col  text-black">
              <h1 className="text-2xl md:text-3xl font-semibold mb-8">
                Shares (equity)
              </h1>

              <p className="text-base mb-6 leading-tight">
                Equity refers to an investment in exchange for shares in an
                organisation.
              </p>

              <p className="text-sm md:text-sm mb-4 leading-relaxed tracking-wider opacity-95">
                So this will only be possible when the organisation has a legal
                structure that has shares. This can include:
              </p>

              <ul className="list-disc pl-8 text-sm leading-relaxed tracking-wider mb-4">
                <li>Co-operatives or Community Benefit Societies</li>
                <li>
                  Registered Societies (previously called an IPS Industrial
                  Provident Society)
                </li>
                <li>Community Interest Companies limited by shares.</li>
              </ul>

              <p className="text-sm md:text-sm mb-4 leading-relaxed tracking-wider opacity-95">
                Community shares are also a type of equity investment. Investors
                get a share of the organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#180971] py-6 text-white text-center flex items-center flex-col flex-1 leading-4 ">
        <p className="text-4xl max-w-3xl font-semibold">
          The Cost of Capital Calculator
        </p>
      </div>

      {/* Social Impact Section */}
      <section className=" flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Section - Teal Background */}
            <div className="bg-[#95111c] px-12 py-2 flex flex-col justify-center text-white">
              <h1 className="text-3xl font-bold font-serif mb-6">
                How much does it cost?
              </h1>

              <span className="text-2xl mb-6 leading-tight">
                The cost of capital is the cost associated with taking on a new
                investment.
              </span>

              <p className="text-sm md:text-sm mb-4 leading-relaxed tracking-wider opacity-95">
                Capital usually refers to financial capital or money, in
                particular, the amount of cash and assets held by an
                organisation. The cost of capital is the cost associated with
                taking on a new investment. In this case, when charities and
                social enterprises take on repayable finance (social
                investment).
              </p>
            </div>

            {/* Right Section - Purple Background with Image */}
            <div className="w-full bg-white aspect-video">
              <iframe
                src="https://www.youtube.com/embed/VPNWgX--WIY"
                title="YouTube video player"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cost Dialog */}
      <CostDialog />

      {/* Loan Calculator */}
      <LoanCalculator />

      <div className="bg-[#180971] py-6 text-white text-center flex items-center flex-col flex-1 leading-4 ">
        <p className="text-4xl max-w-3xl font-semibold">Resources</p>
      </div>

      {/* section */}

      {/* Energy Resilience Card */}
      <section className=" flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Section - Teal Background */}

            <div className="w-full">
              <img
                src={turbine} // replace with your image path
                alt="social investment for energy resilience"
                className="max-w-full max-h-full object-cover"
              />
            </div>

            {/* Right Section - Purple Background with Image */}
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-3xl  text-gray-900 mb-6">
                Social investment for energy resilience
              </h2>

              <p className="text-base text-gray-700 mb-6 font-semibold leading-tight">
                Towards the end of 2022, we asked our users some questions about
                energy resilience. More than 80% expressed interest in exploring
                measures to reduce organisational energy bills.
              </p>

              <p className="text-base text-gray-700 mb-6 leading-relaxed">
                We want to ensure we provide as much support as possible to
                those that might want to use social investment to fund such
                measures.
              </p>

              <p className="text-base text-gray-700 mb-6 leading-relaxed">
                Charities, Social Enterprises, and Community Organisations are
                tackling some of the most complex issues in the UK. Amidst a
                landscape of crippling increases to energy bills and
                ever-decreasing financial support for social sector
                organisations, we wanted to provide more information on how
                organisations can support and develop their energy resilience
                with social investment.
              </p>

              <div className="flex justify-center">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold tracking-widest py-2 px-8 rounded-lg transition-colors duration-200">
                  Enter the hub
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Investment Support Card */}
      <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left - Content */}
          <div className="px-12 py-6 flex flex-col justify-center">
            <h2 className="text-3xl text-gray-900 mb-6">
              Pre Investment Support
            </h2>

            <p className="text-base text-gray-700 mb-4 leading-relaxed">
              Here at Good Finance, one of our key goals is to improve knowledge
              on social investment, what it can be used for and the journey and
              process it requires.
            </p>

            <p className="text-base text-gray-700 mb-4 leading-relaxed">
              This Hub takes a step back to focus on the 'pre-investment' stage,
              supporting social enterprises and charities by signposting to
              tools, resources and organisations that can help them to achieve
              their next steps, even in the face of adversity.
            </p>

            <p className="text-base text-gray-700 mb-12 leading-relaxed">
              From business planning to diversity, equity and inclusion and
              everything in between - check out the Pre-Investment support hub.
            </p>

            <div className="flex justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Enter the hub
              </button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="w-full">
            <img
              src={support} // replace with your image path
              alt="social investment for energy resilience"
              className="max-w-full max-h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Hub;
