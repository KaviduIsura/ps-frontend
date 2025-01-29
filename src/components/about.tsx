import React from "react";
import { Link } from "react-scroll";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 transition-transform transform hover:scale-105">
          About Our Greenhouse Automation System
        </h1>

        <p className="text-lg text-gray-700 mb-12 text-center transition-opacity opacity-75 hover:opacity-100">
          Welcome to the{" "}
          <span className="font-semibold text-green-600">
            Greenhouse Automation Project
          </span>
          , a cutting-edge initiative designed to revolutionize sustainable
          agriculture through technology. Our mission is to make greenhouse
          management smarter, more efficient, and environmentally friendly by
          leveraging the power of the Internet of Things (IoT) and advanced
          automation.
        </p>

        {/* What We Do Section */}
        <section
          id="what-we-do"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-500 ease-in-out"
        >
          <div className="space-y-4 animate__animated animate__fadeIn animate__delay-1s">
            <h2 className="text-2xl font-semibold text-gray-900">What We Do</h2>
            <p className="text-lg text-gray-700">
              Our system monitors and controls key environmental factors within
              the greenhouse, such as temperature, humidity, lighting, and soil
              moisture. Using real-time sensor data, we ensure optimal growing
              conditions for your plants while minimizing resource wastage.
              Whether it’s regulating fans, LED strips, or irrigation systems,
              our solution empowers you to automate tasks and focus on what
              matters most—your crops.
            </p>
          </div>

          {/* Key Features Section */}
          <div className="space-y-4 animate__animated animate__fadeIn animate__delay-2s">
            <h2 className="text-2xl font-semibold text-gray-900">
              Key Features
            </h2>
            <ul className="list-inside list-disc space-y-2 text-lg text-gray-700">
              <li>
                <strong>Real-Time Monitoring:</strong> View live data from
                sensors directly on this platform, giving you insights into the
                health of your greenhouse.
              </li>
              <li>
                <strong>Remote Control:</strong> Adjust lighting, irrigation,
                and temperature settings from the comfort of your home or on the
                go.
              </li>
              <li>
                <strong>Data Visualization:</strong> Analyze historical trends
                with interactive charts and graphs, enabling better
                decision-making for plant growth.
              </li>
              <li>
                <strong>Seamless Integration:</strong> The system is powered by
                NodeMCU microcontrollers and ESP8266, ensuring efficient
                communication between components.
              </li>
              <li>
                <strong>User-Friendly Interface:</strong> Built with the MERN
                stack, the platform offers a responsive and intuitive user
                experience.
              </li>
            </ul>
          </div>
        </section>

        {/* Our Vision Section */}
        <section
          id="our-vision"
          className="mt-16 text-center animate__animated animate__fadeIn animate__delay-3s"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We believe in creating sustainable solutions to meet the growing
            demand for efficient agriculture. By integrating IoT and automation,
            our system empowers farmers and greenhouse owners to produce
            healthier crops with fewer resources.
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section
          id="why-choose-us"
          className="mt-16 bg-blue-100 p-8 rounded-lg shadow-md transition-all duration-500 ease-in-out hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center space-x-4 hover:bg-green-200 p-4 rounded-lg transition-colors duration-300">
              <span className="text-4xl text-green-600">💡</span>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Innovation-Driven
                </h3>
                <p className="text-gray-700">
                  Combining advanced hardware and software for smarter farming.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 hover:bg-green-200 p-4 rounded-lg transition-colors duration-300">
              <span className="text-4xl text-green-600">🌍</span>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Environmentally Conscious
                </h3>
                <p className="text-gray-700">
                  Reducing water and energy usage through precise control
                  systems.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 hover:bg-green-200 p-4 rounded-lg transition-colors duration-300">
              <span className="text-4xl text-green-600">🚀</span>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Future-Ready
                </h3>
                <p className="text-gray-700">
                  Scalable features to meet the evolving needs of modern
                  agriculture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Thank You Section */}
        <section className="mt-16 text-center animate__animated animate__fadeIn animate__delay-4s">
          <p className="text-lg text-gray-700">
            Thank you for being part of our journey toward a greener, smarter
            future. Explore our platform and experience the difference
            technology can make in agriculture!
          </p>
          <Link
            to="what-we-do"
            smooth={true}
            duration={500}
            className="mt-8 inline-block text-green-600 text-lg font-semibold hover:underline"
          >
            Learn More
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
