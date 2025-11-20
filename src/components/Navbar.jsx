import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import EcoLogo from "./EcoLogo";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  // DARK MODE HANDLER
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // NAVBAR SHRINK ON SCROLL
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ACTIVE LINK STYLE
  const activeLink = (path) =>
    location.pathname === path
      ? "text-green-600 dark:text-green-400 font-semibold"
      : "text-gray-800 dark:text-gray-200";

  return (
    <>
      {/* TOP SCROLL BAR */}
      <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r 
      from-green-400 to-emerald-600 shadow-lg z-[70]
      animate-[pulse_2s_ease-in-out_infinite] w-full"></div>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        backdrop-blur-xl 
        border-b border-white/10
        bg-white/20 dark:bg-black/20
        shadow-[0_0_40px_rgba(0,255,120,0.15)]
        ${isScrolled ? "py-2" : "py-5"}
      `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 relative group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-green-500/40 opacity-0 group-hover:opacity-80 transition-all rounded-full scale-150"></div>
              <EcoLogo size={50} />
            </div>

            <h1
              className="text-2xl font-extrabold tracking-wide 
            text-gray-900 dark:text-white transition-all
            bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent
            group-hover:brightness-150"
            >
              <span className="text-green-900 dark:text-green-400"> Eco</span>Insight<span className="text-green-900 dark:text-green-400"> AI</span>
            </h1>

            {/* Smooth Shine Sweep */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
              bg-gradient-to-r from-transparent via-white/40 to-transparent 
              animate-[shine_1.6s_ease-in-out] pointer-events-none">
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex items-center gap-10 text-lg">
            {[
              { text: "Home", path: "/" },
              { text: "Features", path: "/features" },
              { text: "Dashboard", path: "/dashboard" },
              { text: "About", path: "/about" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative navlink group ${activeLink(item.path)}`}
                >
                  {/* Text */}
                  {item.text}

                  {/* Underline Animation */}
                  <span
                    className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 
                  group-hover:w-full transition-all duration-300 rounded-full"
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* BUTTONS */}
          <div className="flex items-center gap-5">

            {/* DARK MODE TOGGLE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-3xl p-1 rounded-full 
              hover:scale-110 transition-all 
              text-gray-800 dark:text-gray-200"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            <Link to="/login">
              <button className="hidden md:block px-6 py-2 text-lg
                bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                rounded-full font-semibold shadow-xl
                hover:scale-110 hover:shadow-2xl 
                transition-all relative overflow-hidden">
                <span className="relative z-10">Login</span>
                <span
                  className="absolute inset-0 bg-white/20 opacity-0 
                  group-hover:opacity-100 transition-all rounded-full"
                ></span>
              </button>
            </Link>

            {/* MOBILE MENU ICON */}
            <div className="md:hidden text-4xl text-gray-900 dark:text-white cursor-pointer">
              ☰
            </div>
          </div>
        </div>
      </nav>

      {/* Keyframe animations */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
