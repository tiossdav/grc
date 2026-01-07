import { useState } from "react";
import { Plus } from "lucide-react";

interface Section {
  id: string;
  title: string;
}

interface Card {
  id: string;
  title: string;
  sections: Section[];
  buttonText: string;
}

type ExpandedSections = Record<string, boolean>;

export default function DiagnosticCard(): React.ReactElement {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );

  const toggleSection = (cardId: string, sectionId: string): void => {
    const key = `${cardId}-${sectionId}`;
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isExpanded = (cardId: string, sectionId: string): boolean => {
    return expandedSections[`${cardId}-${sectionId}`] || false;
  };

  const cards: Card[] = [
    {
      id: "outcomes-matrix",
      title: "How does the Outcomes Matrix work?",
      sections: [
        { id: "what", title: "What does it do?" },
        {
          id: "step1",
          title:
            "Step 1: The area you work in - what impact do you contribute to?",
        },
        { id: "step2", title: "Step 2: Choose your outcomes and indicators" },
        { id: "step3", title: "Step 3: Who will this impact?" },
        { id: "step4", title: "Steps 4 and 5: Review, edit and download" },
      ],
      buttonText: "Read the full guidance",
    },
    {
      id: "measuring-impact",
      title: "Measuring your social impact",
      sections: [
        { id: "intro", title: "Introduction" },
        { id: "plan", title: "Plan" },
        { id: "do", title: "Do" },
        { id: "assess", title: "Assess" },
        { id: "review", title: "Review" },
      ],
      buttonText: "Read more via NPC",
    },
    {
      id: "other-tools",
      title: "Other tools and resources",
      sections: [
        { id: "case-studies", title: "Case studies" },
        { id: "videos", title: "Videos" },
        { id: "podcasts", title: "Podcasts" },
        { id: "outcomes-matrix", title: "The Outcomes Matrix" },
      ],
      buttonText: "Try the Outcomes Matrix",
    },
  ];

  return (
    <div className="bg-linear-to-br from-purple-100 via-blue-50 to-purple-100 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card: Card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col"
            >
              <h2 className="text-2xl font-bold text-indigo-900 mb-6">
                {card.title}
              </h2>

              <div className="flex-1 space-y-4 mb-8">
                {card.sections.map((section: Section) => (
                  <div
                    key={section.id}
                    className="border-b border-gray-200 pb-4"
                  >
                    <button
                      onClick={() => toggleSection(card.id, section.id)}
                      className="w-full flex items-start justify-between text-left group hover:text-indigo-700 transition-colors"
                      aria-expanded={isExpanded(card.id, section.id)}
                      aria-controls={`content-${card.id}-${section.id}`}
                    >
                      <span className="text-base font-semibold text-gray-800 pr-4">
                        {section.title}
                      </span>
                      <span className="shrink-0 mt-1">
                        <Plus className="w-5 h-5 text-gray-600 group-hover:text-indigo-700" />
                      </span>
                    </button>

                    {isExpanded(card.id, section.id) && (
                      <div
                        id={`content-${card.id}-${section.id}`}
                        className="mt-3 text-sm text-gray-600 pl-2"
                      >
                        Content for {section.title} would go here...
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
