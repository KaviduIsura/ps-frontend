import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const AboutPage: React.FC = () => {
  return (
    <div className="bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl font-extrabold text-center text-green-800 mb-8 transition-transform transform hover:scale-105"
        >
          Greenhouse Automation System
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-lg text-green-700 mb-12 text-center opacity-75 hover:opacity-100"
        >
          Our Greenhouse Automation System integrates advanced technologies to
          optimize farming conditions, ensuring sustainability and efficiency.
        </motion.p>

        <section id="what-we-do" className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-800">What We Do</h2>
            <p className="text-lg text-green-700">
              We leverage sensors, IoT, and AI-driven automation to control temperature,
              humidity, irrigation, and lighting—ensuring optimal plant growth while
              conserving resources.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-800">Key Features</h2>
            <ul className="list-inside list-disc space-y-2 text-lg text-green-700">
              <li><strong>Automated Irrigation:</strong> Smart water management system.</li>
              <li><strong>Climate Control:</strong> Adjusts temperature & humidity dynamically.</li>
              <li><strong>Energy Efficiency:</strong> Reduces power consumption with AI optimizations.</li>
              <li><strong>Remote Access:</strong> Monitor & control via web & mobile apps.</li>
              <li><strong>AI Insights:</strong> Predicts environmental changes for proactive adjustments.</li>
            </ul>
          </motion.div>
        </section>

        <motion.section initial="hidden" animate="visible" variants={fadeInUp} id="our-vision" className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Vision</h2>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            We aim to revolutionize agriculture by integrating cutting-edge automation,
            reducing resource waste, and increasing yields through sustainable farming practices.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          id="why-choose-us"
          className="mt-16 bg-green-100 p-8 rounded-lg shadow-md hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-green-800 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: "💡", title: "Innovation-Driven", text: "Utilizing AI & IoT for efficiency." },
              { icon: "🌍", title: "Eco-Friendly", text: "Optimized water & energy consumption." },
              { icon: "🚀", title: "Scalable Solutions", text: "Designed for farms of all sizes." }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm hover:bg-green-200 transition-colors duration-300"
              >
                <span className="text-4xl text-green-600">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg text-green-800">{item.title}</h3>
                  <p className="text-green-700">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial="hidden" animate="visible" variants={fadeInUp} className="mt-16 text-center">
          <p className="text-lg text-green-700">
            Join us in building a smarter, more efficient future for agriculture.
          </p>
          <Link
            to="what-we-do"
            smooth={true}
            duration={500}
            className="mt-8 inline-block text-green-600 text-lg font-semibold hover:underline"
          >
            Learn More
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;
