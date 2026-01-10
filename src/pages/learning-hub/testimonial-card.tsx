import React from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role?: string;
  organization?: string;
  image?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <Quote className="w-10 h-10 text-[#180971]" />
      </div>

      <blockquote className="flex-1">
        <p className="text-gray-700 text-base leading-relaxed mb-6">
          "{testimonial.quote}"
        </p>
      </blockquote>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#180971] flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {testimonial.author.charAt(0)}
            </span>
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-900">{testimonial.author}</p>
          {testimonial.role && (
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          )}
          {testimonial.organization && (
            <p className="text-sm text-gray-500">{testimonial.organization}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function TestimonialCards(): React.ReactElement {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "Learning materials were easy to use, and regular sessions to talk through what we had learnt were well run. Excellent content with links to further reading.",
      author: "Sarah Johnson",
      role: "Programme Director",
      organization: "Community Trust",
    },
    {
      id: 2,
      quote:
        "The social investment course helped me understand complex financial concepts in a way that was accessible and practical for our organization.",
      author: "Michael Chen",
      role: "CEO",
      organization: "Social Enterprise UK",
    },
    {
      id: 3,
      quote:
        "Great experience! The interactive sessions and cohort-based learning made it easy to apply concepts directly to our work. Highly recommend.",
      author: "Emma Thompson",
      role: "Finance Manager",
      organization: "Green Futures Charity",
    },
    {
      id: 4,
      quote:
        "The bitesize format was perfect for fitting learning into a busy schedule. The content was relevant and immediately applicable to our funding strategy.",
      author: "David Okoye",
      role: "Operations Lead",
      organization: "Youth Action Network",
    },
    {
      id: 5,
      quote:
        "Exceptional support from the Good Finance team throughout. The course materials were comprehensive yet easy to digest.",
      author: "Lisa Martinez",
      role: "Funding Coordinator",
      organization: "Arts for All",
    },
    {
      id: 6,
      quote:
        "This course gave us the confidence to explore social investment options we hadn't considered before. The peer learning aspect was invaluable.",
      author: "James Wilson",
      role: "Trustee",
      organization: "Education First Foundation",
    },
  ];

  return (
    <div className="bg-linear-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-900 mb-4">
            What Our Learners Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from people who have completed our e-learning programmes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
