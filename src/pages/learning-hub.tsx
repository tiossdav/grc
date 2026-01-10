import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import learn from "@/assets/images/learn.png";
import unpicked from "@/assets/images/unpicked.png";
import comm from "@/assets/images/comm.png";
import TestimonialCards from "./learning-hub/testimonial-card";

interface AccordionItem {
  id: string;
  title: string;
  content?: string;
}

export default function LearningHub(): React.ReactElement {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const accordionItems: AccordionItem[] = [
    { id: "about", title: "About" },
    { id: "why-unpicked", title: "Why Social Investment Unpicked?" },
    { id: "content-overview", title: "Content Overview" },
    { id: "course-schedule", title: "Course Schedule" },
    { id: "faqs", title: "FAQs" },
    { id: "bursaries", title: "Bursaries" },
  ];

  return (
    <div className="space-y-8 bg-[#ebe7ff] font-montserrat">
      <Header />
      <div className=" space-y-8 ">
        {/* Hero Section */}
        <div className="bg-white max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Content */}
            <div className="px-12 py-6 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-indigo-900 mb-6 leading-tight">
                Welcome to Good Finance's E-Learning Hub
              </h1>

              <p className="text-sm text-gray-700 mb-8 leading-relaxed">
                Build your understanding of social investment with cohort based,
                interactive and accessible e-learning programmes. In this
                section, find out more about the e-learning programmes available
                and the dates of our upcoming cohorts.
              </p>

              <div>
                <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg">
                  Register your interest
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full bg-red-400">
              <img
                src={learn}
                alt="Person Learning"
                className="max-w-full max-h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-[#006455] max-w-7xl mx-auto rounded-2xl shadow-xl px-12 py-6 text-center">
          <blockquote>
            <p className="text-[1.7rem] font-medium text-white leading-tight">
              "Learning materials were easy to use, and regular sessions to talk
              through what we had learnt were well run.
            </p>
            <p className="text-[1.7rem] font-medium text-white leading-tight">
              Excellent content with links to further reading"
            </p>
            <p className="text-lg text-white/90 font-medium mt-2">
              - Good Finance learner
            </p>
          </blockquote>
        </div>

        {/* Social Investment Unpicked Section */}
        <div className="bg-[#180971] py-8 w-full text-white text-center ">
          <p className="text-3xl font-montserrat w-full font-semibold">
            Social Investment Unpicked
          </p>
        </div>

        {/* Accordion Section */}
        <div className="bg-white max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left - Accordion */}
            <div className="p-12">
              <h2 className="text-3xl font-bold text-indigo-900 mb-8">
                Social Investment Unpicked
              </h2>

              <div className="space-y-4">
                {accordionItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 pb-4">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between text-left group hover:text-indigo-700 transition-colors"
                      aria-expanded={expandedSections[item.id]}
                    >
                      <span className="text-base font-semibold text-gray-800 pr-4">
                        {item.title}
                      </span>
                      <span className="shrink-0">
                        {expandedSections[item.id] ? (
                          <Minus className="w-6 h-6 text-gray-600 group-hover:text-indigo-700" />
                        ) : (
                          <Plus className="w-6 h-6 text-gray-600 group-hover:text-indigo-700" />
                        )}
                      </span>
                    </button>

                    {expandedSections[item.id] && (
                      <div className="mt-4 text-sm text-gray-600 pl-2 leading-relaxed">
                        <p>
                          Content for {item.title} would go here. This is where
                          detailed information about this section would be
                          displayed.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                  Read more about bursaries
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="w-full ">
              <img
                src={unpicked}
                alt="Person Learning"
                className="max-w-full max-h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bitesize Section */}
        <div className="bg-[#180971] py-8 text-white text-center flex items-center flex-col flex-1 leading-4">
          <p className="text-3xl font-montserrat max-w-3xl font-semibold">
            Bitesize e-learning programmes
          </p>
        </div>

        {/* Accordion Section */}
        <div className="bg-white max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 bg-[#ebe7ff]">
            {/* Left - Accordion */}
            <div className="p-12 bg-white">
              <h2 className="text-3xl font-bold text-indigo-900 mb-8">
                Legal Structures
              </h2>

              <div className="space-y-2">
                {accordionItems.map((item) => (
                  <div key={item.id} className="border-b border-[#180971] pb-2">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between text-left group hover:text-[#180971] transition-colors"
                      aria-expanded={expandedSections[item.id]}
                    >
                      <span className="text-base font-semibold text-[#180971] pr-4">
                        {item.title}
                      </span>
                      <span className="shrink-0">
                        {expandedSections[item.id] ? (
                          <Minus className="w-6 h-6 text-gray-600 group-hover:text-indigo-700" />
                        ) : (
                          <Plus className="w-6 h-6 text-gray-600 group-hover:text-indigo-700" />
                        )}
                      </span>
                    </button>

                    {expandedSections[item.id] && (
                      <div className="mt-4 text-sm text-gray-600 pl-2 leading-relaxed">
                        <p>
                          Content for {item.title} would go here. This is where
                          detailed information about this section would be
                          displayed.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button className="bg-[#60358c] hover:bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                  Register
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="p-12 bg-white">
              <h2 className="text-3xl font-bold text-indigo-900 mb-8">
                Due Diligence
              </h2>

              <div className="space-y-2">
                {accordionItems.map((item) => (
                  <div key={item.id} className="border-b border-[#180971] pb-2">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between text-left group hover:text-[#180971] transition-colors"
                      aria-expanded={expandedSections[item.id]}
                    >
                      <span className="text-base font-semibold text-[#180971] pr-4">
                        {item.title}
                      </span>
                      <span className="shrink-0">
                        {expandedSections[item.id] ? (
                          <Minus className="w-6 h-6 text-gray-600 group-hover:text-indigo-700" />
                        ) : (
                          <Plus className="w-6 h-6 text-gray-600 group-hover:text-indigo-700" />
                        )}
                      </span>
                    </button>

                    {expandedSections[item.id] && (
                      <div className="mt-4 text-sm text-gray-600 pl-2 leading-relaxed">
                        <p>
                          Content for {item.title} would go here. This is where
                          detailed information about this section would be
                          displayed.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bitesize Section */}
        <div className="bg-[#180971] py-8 text-white text-center flex items-center flex-col flex-1 leading-4">
          <p className="text-3xl font-montserrat max-w-3xl font-semibold">
            Investment Committees of the Future
          </p>
        </div>

        {/* Accordion Section */}
        <div className="bg-white max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 ">
            {/* Left - Accordion */}
            <div className="p-12 bg-white">
              <h2 className="text-3xl font-bold text-indigo-900 mb-8">
                Legal Structures
              </h2>

              <div className="space-y-2">
                {accordionItems.map((item) => (
                  <div key={item.id} className="border-b border-[#180971] pb-2">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between text-left group hover:text-[#180971] transition-colors"
                      aria-expanded={expandedSections[item.id]}
                    >
                      <span className="text-base font-semibold text-[#180971] pr-4">
                        {item.title}
                      </span>
                      <span className="shrink-0">
                        {expandedSections[item.id] ? (
                          <Minus className="w-6 h-6 text-gray-600 group-hover:text-indigo-700" />
                        ) : (
                          <Plus className="w-6 h-6 text-gray-600 group-hover:text-indigo-700" />
                        )}
                      </span>
                    </button>

                    {expandedSections[item.id] && (
                      <div className="mt-4 text-sm text-gray-600 pl-2 leading-relaxed">
                        <p>
                          Content for {item.title} would go here. This is where
                          detailed information about this section would be
                          displayed.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button className="bg-[#60358c] hover:bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                  Register
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="w-full ">
              <img
                src={comm}
                alt="Person Learning"
                className="max-w-full max-h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-[#180971] py-8 text-white text-center flex items-center flex-col flex-1 leading-4">
          <p className="text-3xl font-montserrat max-w-3xl font-semibold">
            Testimonials
          </p>
        </div>

        <TestimonialCards />
      </div>
      <Footer />
    </div>
  );
}
