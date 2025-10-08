"use client";

import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

const FloatingButtons = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
      {/* WhatsApp Button */}
      <div
        className="relative flex items-center gap-3"
        onMouseEnter={() => setHovered("whatsapp")}
        onMouseLeave={() => setHovered(null)}
      >
        <a
          href="https://wa.me/61450567739"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-orange-500 text-white px-5 py-3 rounded-full shadow-lg transform transition-all hover:scale-105 hover:bg-orange-600"
        >
          <FaWhatsapp size={28} />
          <span className="font-semibold">Chat on WhatsApp</span>
        </a>
        {hovered === "whatsapp" && (
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-white text-orange-500 px-3 py-1 rounded-full shadow-lg text-sm font-medium whitespace-nowrap">
            Questions? Let's chat now!
          </span>
        )}
      </div>

      {/* Email Button */}
      <div
        className="relative flex items-center gap-3"
        onMouseEnter={() => setHovered("email")}
        onMouseLeave={() => setHovered(null)}
      >
        <a
          href="mailto:sales@hsengineeringsolution.com"
          className="flex items-center gap-3 bg-white text-orange-500 px-5 py-3 rounded-full shadow-lg border border-orange-500 transform transition-all hover:scale-105 hover:bg-orange-500 hover:text-white"
        >
          <FaEnvelope size={26} />
          <span className="font-semibold">Email Us</span>
        </a>
        {hovered === "email" && (
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-orange-500 text-white px-3 py-1 rounded-full shadow-lg text-sm font-medium whitespace-nowrap">
            Have a question? Email us!
          </span>
        )}
      </div>
    </div>
  );
};

export default FloatingButtons;
