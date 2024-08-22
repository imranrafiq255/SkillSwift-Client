import React, { useState } from "react";

const faqs = [
  {
    question: "What is the deipute policy?",
    answer:
      "You can return any item within 30 days of purchase for a full refund. The item must be in its original condition and packaging.",
  },
  {
    question: "How do I track my order?",
    answer:
      "After placing your order, you will receive an email with a tracking number. You can use this number to track your order on our website.",
  },
  {
    question: "How can I contact customer service?",
    answer:
      "You can contact our customer service team via email at support@example.com or call us at 1-800-123-4567.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and Apple Pay. Payments are processed securely through our payment gateway.",
  },
  {
    question: "Can I change my order after it's been placed?",
    answer:
      "Once an order has been placed, we cannot make changes. If you need to update your order, please contact us as soon as possible.",
  },
];

const FAQsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-8">FAQs</h2>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 p-4 bg-white rounded shadow-md">
            <button
              onClick={() => handleClick(index)}
              className="w-full text-left text-xl font-semibold text-gray-800"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="mt-2 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQsSection;
