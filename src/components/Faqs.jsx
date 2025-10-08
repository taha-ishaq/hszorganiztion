"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqsData = [
  {
    question: "What products do you offer?",
    answer: "We offer a wide range of industrial and consumer products with high-quality standards.",
  },
  {
    question: "How can I request a quote?",
    answer: "Click on 'Get a Quote' on any product or go to the full products page and submit your request.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries. Shipping charges may vary depending on your location.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept PayPal, credit/debit cards, and bank transfers.",
  },
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 bg-gray-100 text-gray-800 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {isDesktop ? (
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold text-center mb-16"
          >
            Frequently <span className="text-orange-500">Asked Questions</span>
          </motion.h2>
        ) : (
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16">
            Frequently <span className="text-orange-500">Asked Questions</span>
          </h2>
        )}

        <div className="space-y-4">
          {faqsData.map((faq, i) =>
            isDesktop ? (
              <motion.div
                key={i}
                layout
                initial={{ borderRadius: 12 }}
                className="bg-white/10 border border-white/10 rounded-xl p-5 cursor-pointer hover:bg-white/20 transition"
                onClick={() => toggleFaq(i)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-orange-500 text-lg">{faq.question}</h3>
                  {openIndex === i ? <ChevronUp /> : <ChevronDown />}
                </div>
                <motion.p
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: openIndex === i ? 1 : 0,
                    height: openIndex === i ? "auto" : 0,
                  }}
                  className="text-black mt-2"
                >
                  {faq.answer}
                </motion.p>
              </motion.div>
            ) : (
              <div
                key={i}
                className="bg-white/10 border border-white/10 rounded-xl p-5 cursor-pointer"
                onClick={() => toggleFaq(i)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-orange-500 text-lg">{faq.question}</h3>
                  {openIndex === i ? <ChevronUp /> : <ChevronDown />}
                </div>
                {openIndex === i && (
                  <p className="text-black mt-2">{faq.answer}</p>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
