const MissionSection = () => {
  return (
    <section className="py-20 px-6 lg:px-16">
      <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="p-8 rounded-xl shadow-lg bg-base-200">
          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p className="opacity-80">
            To help brands grow with user-centered design, modern web technology,
            and exceptional teamwork.
          </p>
        </div>

        <div className="p-8 rounded-xl shadow-lg bg-base-200">
          <h3 className="text-xl font-bold mb-4">Our Vision</h3>
          <p className="opacity-80">
            To become one of the most trusted digital agencies creating meaningful
            products across the globe.
          </p>
        </div>

        <div className="p-8 rounded-xl shadow-lg bg-base-200">
          <h3 className="text-xl font-bold mb-4">Our Values</h3>
          <p className="opacity-80">
            We focus on creativity, teamwork, honesty, learning, and product
            excellence in everything we do.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
