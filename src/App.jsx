import Stopwatch from "@/components/Stopwatch";
import TodoListContainer from "./components/TodoListContainer";
import { useSelector } from "react-redux";
import { TIMER_MODE } from "@/lib/constants";

const App = () => {
  const mode = useSelector((state) => state.timer.mode);
  const isBreakTime = mode === TIMER_MODE.BREAK;

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-all duration-1000 ${
      isBreakTime
        ? "bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900"
        : "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
    }`}>
      {/* Grid Background */}
      <div className={`pointer-events-none absolute inset-0 opacity-20 transition-all duration-1000 ${
        isBreakTime ? "bg-grid-pattern-green" : "bg-grid-pattern"
      }`} />

      {/* Pixel Art Mascots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left Mascot - Pomodoro Tomato */}
        <div className="absolute left-8 top-8 opacity-40 hover:opacity-60 transition-opacity duration-300">
          <svg width="80" height="80" viewBox="0 0 16 16" className="pixel-art">
            {/* Stem */}
            <rect x="7" y="2" width="2" height="2" fill="#22c55e" />
            <rect x="6" y="3" width="1" height="1" fill="#22c55e" />
            <rect x="9" y="3" width="1" height="1" fill="#22c55e" />
            {/* Tomato Body */}
            <rect x="4" y="5" width="8" height="8" fill="#dc2626" />
            <rect x="5" y="4" width="6" height="1" fill="#dc2626" />
            <rect x="5" y="13" width="6" height="1" fill="#dc2626" />
            {/* Highlights */}
            <rect x="5" y="6" width="2" height="2" fill="#ef4444" />
            <rect x="9" y="8" width="1" height="1" fill="#ef4444" />
            {/* Eyes */}
            <rect x="6" y="8" width="1" height="1" fill="#1e293b" />
            <rect x="9" y="8" width="1" height="1" fill="#1e293b" />
            {/* Smile */}
            <rect x="6" y="10" width="1" height="1" fill="#1e293b" />
            <rect x="7" y="11" width="2" height="1" fill="#1e293b" />
            <rect x="9" y="10" width="1" height="1" fill="#1e293b" />
          </svg>
        </div>

        {/* Top Right Mascot - Coffee Cup */}
        <div className="absolute right-8 top-8 opacity-40 hover:opacity-60 transition-opacity duration-300">
          <svg width="80" height="80" viewBox="0 0 16 16" className="pixel-art">
            {/* Steam */}
            <rect x="5" y="1" width="1" height="2" fill="#94a3b8" />
            <rect x="7" y="0" width="1" height="2" fill="#94a3b8" />
            <rect x="9" y="1" width="1" height="2" fill="#94a3b8" />
            {/* Cup Body */}
            <rect x="3" y="4" width="8" height="8" fill="#a855f7" />
            <rect x="4" y="12" width="6" height="1" fill="#a855f7" />
            <rect x="5" y="13" width="4" height="1" fill="#a855f7" />
            {/* Coffee */}
            <rect x="4" y="5" width="6" height="3" fill="#78350f" />
            {/* Highlights */}
            <rect x="4" y="6" width="2" height="2" fill="#c084fc" />
            <rect x="9" y="8" width="1" height="2" fill="#7c3aed" />
            {/* Handle */}
            <rect x="11" y="6" width="1" height="4" fill="#a855f7" />
            <rect x="12" y="7" width="1" height="2" fill="#a855f7" />
          </svg>
        </div>

        {/* Bottom Left Mascot - Clock */}
        <div className="absolute bottom-8 left-8 opacity-40 hover:opacity-60 transition-opacity duration-300">
          <svg width="80" height="80" viewBox="0 0 16 16" className="pixel-art">
            {/* Clock Body */}
            <rect x="4" y="3" width="8" height="10" fill="#e879f9" />
            <rect x="5" y="2" width="6" height="1" fill="#e879f9" />
            <rect x="5" y="13" width="6" height="1" fill="#e879f9" />
            {/* Clock Face */}
            <rect x="5" y="4" width="6" height="6" fill="#f0abfc" />
            {/* Clock Hands */}
            <rect x="8" y="5" width="1" height="2" fill="#7c3aed" />
            <rect x="8" y="7" width="2" height="1" fill="#7c3aed" />
            {/* Base */}
            <rect x="6" y="11" width="4" height="2" fill="#c084fc" />
          </svg>
        </div>

        {/* Bottom Right Mascot - Star */}
        <div className="absolute bottom-8 right-8 opacity-40 hover:opacity-60 transition-opacity duration-300">
          <svg width="80" height="80" viewBox="0 0 16 16" className="pixel-art">
            {/* Star */}
            <rect x="7" y="2" width="2" height="2" fill="#fbbf24" />
            <rect x="5" y="4" width="6" height="2" fill="#fbbf24" />
            <rect x="6" y="6" width="4" height="2" fill="#fbbf24" />
            <rect x="4" y="8" width="8" height="2" fill="#fbbf24" />
            <rect x="6" y="10" width="4" height="2" fill="#fbbf24" />
            <rect x="5" y="12" width="2" height="1" fill="#fbbf24" />
            <rect x="9" y="12" width="2" height="1" fill="#fbbf24" />
            {/* Highlights */}
            <rect x="7" y="3" width="1" height="1" fill="#fde047" />
            <rect x="6" y="5" width="2" height="1" fill="#fde047" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center gap-2 pt-5">
        <Stopwatch />
        <TodoListContainer />
      </div>
    </div>
  );
};

export default App;
