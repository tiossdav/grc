import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const itemsPerPage = 5;

  const faqs = [
    {
      question:
        "Is social investment more expensive than mainstream commercial lending?",
      answer:
        "Social investment rates can vary depending on the investor and the organization's circumstances. While some social investors offer below-market rates to support social enterprises, others may charge rates comparable to commercial lending. The key difference is that social investors often provide more flexible terms and patient capital.",
    },
    {
      question: "Are loans more expensive through social investment?",
      answer:
        "Not necessarily. Social investment loans can be competitively priced and often come with more flexible repayment terms than traditional commercial loans. Many social investors prioritize social impact alongside financial returns, which can result in more favorable terms for qualifying organizations.",
    },
    {
      question: "Is equity investment cheaper with social investment?",
      answer:
        "Equity investment through social investors can offer advantages beyond just cost. While the equity stake might be similar to commercial investors, social equity investors often bring sector expertise, networks, and a commitment to long-term social impact that can add significant value to your organization.",
    },
    {
      question:
        "Is social investment suitable for social enterprises and charities at every stage of their development e.g. start-up?",
      answer:
        "Social investment can be appropriate at various stages of organizational development, including start-up. However, readiness depends on factors like having a viable business model, capacity to service repayments, and appropriate governance structures. Some social investors specialize in early-stage funding, while others focus on growth-stage organizations.",
    },
    {
      question:
        "Is there a benefit of social investment instead of commercial investment?",
      answer:
        "Yes, social investment offers several benefits including: patient capital with longer repayment terms, investors who understand the social sector, potential for below-market rates, access to networks and expertise, alignment with social mission, and flexibility during challenging times.",
    },
    {
      question:
        "Is it wrong for charities to use their own charitable funds to repay investors?",
      answer:
        "This is a nuanced question. Using charitable funds to repay social investment isn't inherently wrong if the investment has generated social impact or helped the charity achieve its mission more effectively. However, trustees must ensure this approach aligns with their charitable purposes and represents good stewardship of charitable assets.",
    },
    {
      question:
        "If my organisation has lots of reserves, why would we borrow money?",
      answer:
        "Even with reserves, borrowing can be strategic for: preserving reserves for emergencies, taking advantage of growth opportunities without depleting assets, maintaining cash flow for operations, funding specific projects while keeping core reserves intact, and building credit history for future needs.",
    },
    {
      question:
        "Are Board Trustees and Directors personally liable for taking on or making a social investment?",
      answer:
        "Generally, trustees and directors are not personally liable if they act within their powers, exercise proper care and diligence, and make decisions in good faith in the organization's best interests. However, they could be liable for losses arising from negligence or breach of duty. It's important to ensure proper authorization and documentation.",
    },
    {
      question: "What happens if my organisation can't make repayments?",
      answer:
        "If your organization faces repayment difficulties, communicate with your social investor immediately. Many social investors are willing to work with borrowers to find solutions such as: restructuring the loan, adjusting repayment schedules, providing a payment holiday, or refinancing. Early communication is key to finding a workable solution.",
    },
    {
      question:
        "Why do social investors ask so many questions before being able to make a decision about lending?",
      answer:
        "Social investors conduct thorough due diligence to: assess your organization's ability to repay, understand your social impact model, ensure the investment aligns with their mission, evaluate risks and opportunities, determine appropriate investment terms, and comply with their own governance requirements. This process protects both parties and increases the likelihood of a successful partnership.",
    },
    {
      question: "What do I do if my application for investment is turned down?",
      answer:
        "If your application is declined: ask for detailed feedback on why, work on addressing the concerns raised, explore whether you might be investment-ready in the future, consider other social investors who might be a better fit, look at alternative funding sources like grants, and use the experience to strengthen your business planning and financial management.",
    },
  ];

  //   const totalPages = Math.ceil(faqs.length / itemsPerPage);
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const currentFaqs = faqs.slice(startIndex, endIndex);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //   const goToPage = (page) => {
  //     setCurrentPage(page);
  //     setOpenIndex(null);
  //   };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-[#006455] rounded-lg shadow-2xl p-8 md:p-12">
        <h1 className="text-2xl md:text-5xl font-bold text-white mb-2">
          Frequently asked questions
        </h1>
        <p className="text-teal-100 text-lg mb-12">
          We've got you covered, read on.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            //   const actualIndex = startIndex + index;
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-slate-50 ">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 flex items-center justify-between text-left group hover:opacity-90 transition-opacity"
                >
                  <span className="text-white font-medium text-lg pr-8">
                    {faq.question}
                  </span>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <ChevronDown
                      className={`w-5 h-5 text-teal-700 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-teal-50 leading-relaxed pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? "bg-white text-teal-700 shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div> */}

        <div className="mt-8 text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
