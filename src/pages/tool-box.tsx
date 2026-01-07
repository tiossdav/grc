import { Header } from "@/components/layout/header";
import witus from "@/assets/images/witus.png";
import outmat from "@/assets/images/outmat.png";
import turbine from "@/assets/images/turbine.png";
import support from "@/assets/images/support.png";
import Footer from "@/components/layout/footer";
import DiagnosticCard from "./toolbox/diagnostic-card";
import CostDialog from "./toolbox/cost-dialog";
import LoanCalculator from "./toolbox/loan-calculator";

const ToolBox = () => {
  return (
    <div className="bg-[#f2edff] flex space-y-8 flex-col">
      <Header />
      <section className=" flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Section - Teal Background */}
            <div className="bg-[#087e6e] px-12 py-6 flex flex-col justify-center text-white">
              <h1 className="text-3xl md:text-3xl font-bold font-serif mb-4">
                Is it right for us?
              </h1>

              <p className="text-3xl md:text-3xl mb-4 leading-tight">
                This diagnostic tool will help you to decide whether social
                investment is right for your organisation.
              </p>

              <p className="text-sm md:text-lg mb-4 leading-tight opacity-95">
                If you're new to the world of social investment, start your
                journey today with our quick and easy 'Is It Right For Us' tool,
                designed to give you the answers you need in a matter of
                minutes!
              </p>

              <p className="text-sm md:text-lg mb-4 leading-tight opacity-95">
                To complete this tool, you'll need to provide some basic
                information about your organisation, including legal structure,
                location, annual income, how much finance you need and what you
                plan to achieve with the finance.
              </p>

              <div className="flex justify-center">
                <button className="bg-[#190974] text-white font-semibold py-2 px-8 rounded-lg transition-colors duration-200">
                  Find out now
                </button>
              </div>
            </div>

            {/* Right Section - Purple Background with Image */}
            <div className="w-full bg-red-400">
              <img
                src={witus} // replace with your image path
                alt="Person Thinking"
                className="max-w-full max-h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#180971] py-6 text-white text-center flex items-center flex-col flex-1 leading-4 ">
        <p className="text-4xl max-w-3xl font-semibold">
          Measuring social impact
        </p>
      </div>

      {/* Outcome Matrix Section */}
      <section className=" flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Section - Teal Background */}

            <div className="w-full bg-red-400">
              <img
                src={outmat} // replace with your image path
                alt="Person Thinking"
                className="max-w-full max-h-full object-cover"
              />
            </div>

            {/* Right Section - Purple Background with Image */}
            <div className="bg-[#B0004B] px-12 py-6 flex flex-col justify-center text-white">
              <h1 className="text-3xl md:text-3xl font-bold font-serif mb-6">
                The Outcomes Matrix
              </h1>

              <p className="text-2xl md:text-2xl mb-6 leading-tight">
                The Outcomes Matrix is a practical tool to help social impact
                organisations plan and measure their social impact.
              </p>

              <p className="text-sm md:text-sm mb-4 leading-relaxed tracking-wider opacity-95">
                The tool includes outcomes and measures for nine outcome areas
                and four lenses for considering the service users of your
                organisation. You can use this tool to...
              </p>

              <ul className="list-disc pl-8 text-sm leading-relaxed tracking-wider mb-4">
                <li>
                  Gain a starting point for planning and measuring your social
                  impact outcomes
                </li>
                <li>
                  Communicate your impact to social investors and key
                  stakeholders
                </li>
                <li>
                  Think about future areas of development for your organisation
                </li>
              </ul>
              <div className="flex justify-center">
                <button className="bg-[#190974] text-white font-semibold py-2 px-8 rounded-lg transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Card */}
      <DiagnosticCard />

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
            <div className="bg-[#60358c] px-12 py-2 flex flex-col justify-center text-white">
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
export default ToolBox;
