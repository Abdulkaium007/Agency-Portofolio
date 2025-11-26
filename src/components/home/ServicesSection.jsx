const services = [
  { title: "Brand Identity", desc: "Logos, visual systems & strategy" },
  { title: "Web Design", desc: "Beautiful, high-converting websites" },
  { title: "Development", desc: "React, Next.js, custom solutions" },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-base-200 dark:bg-base-300 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-base-content dark:text-base-content mb-16">
          What We Do
        </h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-base-100 dark:bg-base-200 shadow-xl hover:shadow-2xl transition-shadow rounded-lg p-8 text-center"
            >
              {/* Icon / Number */}
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: i % 2 === 0 ? "#E0F2FE" : "#FEF3C7", // Light blue or amber tone for variation
                }}
              >
                <span
                  className={`text-2xl font-bold ${
                    i % 2 === 0 ? "text-blue-600" : "text-amber-500"
                  }`}
                >
                  {i + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 text-base-content dark:text-base-content">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sec" data-theme-text>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
