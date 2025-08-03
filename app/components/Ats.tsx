
import React from 'react';

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine colors based on score
  const getScoreColors = () => {
    if (score > 69) {
      return {
        bg: 'bg-[var(--color-badge-green-bg)]',
        border: 'border-[var(--color-badge-green)]',
        text: 'text-[var(--color-badge-green-text)]',
        icon: '/icons/ats-good.svg',
        subtitle: 'Great Job!',
      };
    } else if (score > 49) {
      return {
        bg: 'bg-[var(--color-badge-yellow-bg)]',
        border: 'border-[var(--color-badge-yellow)]',
        text: 'text-[var(--color-badge-yellow-text)]',
        icon: '/icons/ats-warning.svg',
        subtitle: 'Good Start',
      };
    } else {
      return {
        bg: 'bg-[var(--color-badge-red-bg)]',
        border: 'border-[var(--color-badge-red)]',
        text: 'text-[var(--color-badge-red-text)]',
        icon: '/icons/ats-bad.svg',
        subtitle: 'Needs Improvement',
      };
    }
  };

  const { bg, border, text, icon, subtitle } = getScoreColors();

  return (
    <div className={`bg-black  rounded-2xl p-6 w-full backdrop-blur-sm`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-2 rounded-lg ${bg} border ${border}`}>
          <img 
            src={icon} 
            alt="ATS Score Icon" 
            className="w-8 h-8" 
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">ATS Score</h2>
          <p className={`text-sm ${text}`}>{subtitle}</p>
        </div>
        <div className="ml-auto text-3xl font-bold">
          <span className={text}>{score}</span>
          <span className="text-gray-400">/100</span>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <p className="text-gray-300 mb-6">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`p-1 rounded-full ${suggestion.type === 'good' ? 'bg-green-900/50' : 'bg-amber-900/50'}`}>
                <img
                  src={suggestion.type === "good" ? "/icons/ats-good.svg" : "/icons/ats-warning.svg"}
                  alt={suggestion.type === "good" ? "Check" : "Warning"}
                  className="w-4 h-4"
                />
              </div>
              <p className={`text-sm ${suggestion.type === 'good' ? 'text-green-300' : 'text-amber-300'}`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2.5 mb-6">
        <div 
          className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" 
          style={{ width: `${score}%` }}
        ></div>
      </div>

      {/* Closing encouragement */}
      <p className="text-gray-400 text-sm italic">
        Keep refining your resume to improve your chances of getting past ATS filters.
      </p>
    </div>
  )
}

export default ATS