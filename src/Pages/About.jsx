import { motion } from "framer-motion";
import "./About.css"; // 🔥 external CSS included

export default function About() {
  return (
    <div className="about-wrapper">

      {/* HEADER SECTION */}
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="about-title">
          About <span className="highlight">EcoInsight AI</span>
        </h1>

        <p className="about-subtitle">
          Transforming sustainability through intelligent insights,  
          eco-friendly tools, and real-time environmental intelligence.
        </p>
      </motion.div>

      {/* MISSION + VISION */}
      <div className="info-grid">

        {/* MISSION CARD */}
        <motion.div
          className="info-card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="info-title">🌱 Our Mission</h2>
          <p className="info-text">
            To make sustainability simple, intelligent, and accessible —  
            empowering individuals and organizations to make greener choices  
            using AI-driven recommendations and data insights.
          </p>
        </motion.div>

        {/* VISION CARD */}
        <motion.div
          className="info-card"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="info-title">🌍 Our Vision</h2>
          <p className="info-text">
            A world where every home, city, and business understands  
            its environmental impact — and has the tools to reduce it effortlessly.
          </p>
        </motion.div>
      </div>

      {/* WHY CHOOSE SECTION */}
      <div className="why-section">
        <h2 className="why-title">
          Why <span className="highlight">EcoInsight AI</span>?
        </h2>

        <div className="why-grid">

          {/* CARD 1 */}
          <motion.div
            className="why-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="why-card-title">⚡ AI Intelligence</h3>
            <p className="why-card-text">
              Smart eco-suggestions to reduce energy consumption,  
              carbon emissions, and daily environmental impact.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            className="why-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="why-card-title">🌡 Real-Time Data</h3>
            <p className="why-card-text">
              Integrated weather, air-quality, and energy-usage APIs  
              for fully personalized eco-insights.
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            className="why-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="why-card-title">🧩 Sustainability Suite</h3>
            <p className="why-card-text">
              Track carbon footprint, discover eco-friendly alternatives,  
              and monitor your progress effortlessly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <motion.div
        className="cta-section"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="cta-title">Start Your Sustainable Journey</h2>
        <p className="cta-text">
          Join thousands of users making smarter, greener decisions  
          with real-time AI-powered guidance.
        </p>

        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Now →
        </motion.button>
      </motion.div>

    </div>
  );
}
