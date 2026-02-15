"use client";

import React from "react";

interface MarqueeProps {
  items?: string[];
  speed?: number;
}

const defaultItems = [
  "First In Cricket Inter-School Babai Gaupalika",
  "Excellence in Education Since 2008",
  "100% SEE Pass Rate",
  "Modern Science Lab & Computer Center",
  "Experienced & Dedicated Teachers",
];

export const Marquee: React.FC<MarqueeProps> = ({
  items = defaultItems,
  speed = 20,
}) => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="md:hidden w-full bg-accent/10 border-y border-accent/20 overflow-hidden py-2">
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-6 text-xs font-black uppercase tracking-wider text-primary"
          >
            <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
