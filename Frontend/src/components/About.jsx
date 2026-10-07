const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-8 md:px-20 text-(--text-primary)">
      {/* Hero */}
      <section className="pt-24 pb-16">
        <p className="border border-(--border) rounded-full px-4 py-1 w-fit text-(--primary) font-semibold tracking-widest text-sm mb-4">
          About ClassyWear
        </p>
        <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6">
          Thoughtful essentials <br /> for everyday life.
        </h1>
        <p className="text-(--text-secondary) text-lg max-w-2xl leading-relaxed">
          ClassyWear curates products that balance utility, quality, and lasting
          value. We focus on pieces that fit naturally into daily routines and
          remain useful over time.
        </p>
      </section>

      <hr className="border-(--border)" />

     {/* The problem */}
      <section className="py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display md:w-1/3 shrink-0">
            The problem we're solving
          </h2>

          <div className="flex flex-col gap-5 md:w-2/3">
            <p className="text-(--text-secondary) leading-relaxed">
              The average person makes 164 purchases per year. Most of those
              items break, lose their appeal, or end up in a drawer within
              months. We're drowning in stuff we never truly wanted.
            </p>
            <p className="text-(--text-secondary) leading-relaxed">
              ClassyWear exists to disrupt that cycle. We don't sell impulse
              buys — we design essentials. Pieces that earn their space in
              your life through superior craft, timeless aesthetics, and
              honest value.
            </p>
            <p className="text-(--text-secondary) leading-relaxed">
              Every product in our collection has been tested, refined, and
              tested again. We'd rather lose a sale than ship something we're
              not proud of.
            </p>
          </div>
        </div>

        <hr className="border-(--border) mt-12" />
      </section>

      {/* What we stand for */}
      <section className="py-16">
        <h3 className="text-3xl md:text-4xl font-bold font-display mb-8">
          What we stand for
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: "Intentional Design",
              text: "Every product begins with a question: does this need to exist? If the answer is yes, we obsess over every detail until it's right.",
            },
            {
              title: "Built to Last",
              text: "We use materials that age gracefully — full-grain leather, heavy cotton, machined metals. Things that get better with time.",
            },
            {
              title: "No Compromises",
              text: "Quality isn't negotiable. We'd rather make fewer things exceptionally well than flood the market with mediocrity.",
            },
            {
              title: "Radical Transparency",
              text: "We show our work — sourcing, costs, margins. You deserve to know what you're paying for and why.",
            },
          ].map((box, i) => (
            <div
              key={i}
              className="bg-(--bg-card) border border-(--border) rounded-(--radius) p-6 hover:border-(--primary) hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <h2 className="text-xl font-bold font-display mb-3">
                {box.title}
              </h2>
              <p className="text-(--text-secondary) leading-relaxed">
                {box.text}
              </p>
            </div>
          ))}
        </div>

        <hr className="border-(--border) mt-12" />
      </section>

      {/* Journey */}
      <section className="py-16">
        <h3 className="text-sm font-semibold tracking-widest text-(--primary) mb-8">
          OUR JOURNEY
        </h3>

        <div className="flex flex-col">
          {[
            { year: "2021", text: "Started in a garage with three products and a stubborn refusal to make anything average." },
            { year: "2022", text: "Grew to 20 products. Launched our direct-to-consumer model, cutting out the middlemen." },
            { year: "2023", text: "Reached 10,000 customers who cared enough to choose better over cheaper." },
            { year: "2024", text: "Expanded into home and tech. Proved that utility and beauty aren't mutually exclusive." },
            { year: "2025", text: "Introduced our repair program. Because throwing things away should be the last option." },
          ].map((item, i, arr) => (
            <div key={item.year}>
              <div className="flex flex-col md:flex-row gap-2 md:gap-8 py-5 hover:pl-2 transition-all duration-300">
                <span className="text-(--primary) font-bold font-display w-16 shrink-0">
                  {item.year}
                </span>
                <p className="text-(--text-secondary) leading-relaxed">
                  {item.text}
                </p>
              </div>
              {i !== arr.length - 1 && <hr className="border-(--border)" />}
            </div>
          ))}
        </div>
      </section>

      <hr className="border-(--border)" />

      {/* CTA */}
      <section className="py-20 text-center flex flex-col items-center">
        <h3 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Ready to buy less, buy better?
        </h3>
        <p className="text-(--text-secondary) mb-8 max-w-md">
          Explore our curated collection. Every piece designed with purpose,
          built with care.
        </p>
        <button className="bg-(--primary) hover:bg-(--accent) active:scale-95 text-white font-semibold rounded px-8 py-3 transition-all duration-200 cursor-pointer">
          Browse Collections
        </button>
      </section>

  
    </div>
  );
};

export default About;