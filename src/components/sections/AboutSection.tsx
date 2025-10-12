import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="flex items-center w-full text-background px-4 md:px-16 lg:px-32 py-[120px] overflow-hidden">
      {/* Left - Experiance */}
      <div className="flex flex-col text-white">
        <h1 className="text-5xl">15</h1>
        <span>Years</span>
        <span>Exparience</span>
      </div>
    </section>
  );
};

export default AboutSection;
