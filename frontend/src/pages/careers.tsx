
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import hiring1 from "@/assets/images/hiring1.jpeg";
import hiring2 from "@/assets/images/hiring2.jpeg";
import hiring3 from "@/assets/images/hiring3.jpeg";
import hiring4 from "@/assets/images/hiring4.jpeg";
import hiring5 from "@/assets/images/hiring5.jpeg";
import { Briefcase, ArrowRight, CheckCircle } from "lucide-react";

export default function Careers() {
  const hiringImages = [
    { src: hiring1, alt: "Call for Applications 1" },
    { src: hiring2, alt: "Call for Applications 2" },
    { src: hiring3, alt: "Call for Applications 3" },
    { src: hiring4, alt: "Call for Applications 4" },
    { src: hiring5, alt: "Call for Applications 5" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#95111c]/10 via-white to-orange-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#95111c]/5 rounded-bl-[100px] -z-10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6">
              <Briefcase className="w-4 h-4" />
              We're Hiring!
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Join Our Mission to Transform <span className="text-[#95111c]">African Research</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              We are looking for passionate, driven individuals to join our team. If you believe in empowering researchers and driving innovation across the continent, we want to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#open-roles" className="px-8 py-4 bg-[#95111c] text-white rounded-xl font-bold hover:bg-[#7a0e16] transition-colors flex items-center gap-2">
                View Open Roles
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="mailto:graduteresearchclinic@gmail.com" className="px-8 py-4 bg-white text-[#95111c] border border-[#95111c] rounded-xl font-bold hover:bg-gray-50 transition-colors">
                Contact HR
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Impact-Driven Work</h3>
              <p className="text-gray-600">Every project you work on directly contributes to advancing research and innovation in Africa.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-[#95111c]/10 text-[#95111c] rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Culture</h3>
              <p className="text-gray-600">Work alongside brilliant minds across the continent in an inclusive and supportive environment.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Growth</h3>
              <p className="text-gray-600">We invest in our team's continuous learning with access to resources, mentorship, and training.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles (Fliers) */}
      <section id="open-roles" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our current openings below. To apply, please follow the instructions listed on each flyer and submit your application via email.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hiringImages.map((image, idx) => (
              <div key={idx} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200 hover:shadow-xl transition-shadow group overflow-hidden">
                <div className="relative rounded-2xl overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <a href="mailto:graduteresearchclinic@gmail.com" className="bg-[#95111c] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-[#7a0e16] transition-colors">
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
