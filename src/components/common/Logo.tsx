import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only';
  className?: string;
  isDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`} id="elibrary-brand-logo">
      {/* Custom stylized modern digital book icon */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/20 group hover:shadow-indigo-500/30 transition-shadow duration-300`}>
        <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden relative">
          {/* Subtle circuit backdrop glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-cyan-400/20 opacity-80" />
          
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 drop-shadow-sm"
          >
            {/* Left Page (Classic Book Layer) */}
            <path
              d="M17 9.5C13 8 7 8.5 5 10.5V27.5C7.5 25.5 13 25.5 17 27V9.5Z"
              fill="url(#leftPageGrad)"
            />
            {/* Right Page (Digital Node Layer) */}
            <path
              d="M19 9.5C23 8 29 8.5 31 10.5V27.5C28.5 25.5 23 25.5 19 27V9.5Z"
              fill="url(#rightPageGrad)"
            />
            {/* Central Book Spine & Digital Circuit Beam */}
            <line
              x1="18"
              y1="8"
              x2="18"
              y2="28"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Digital Node Spark & Connection Circuit on the Book */}
            <circle cx="18" cy="8.5" r="2" fill="#E0F2FE" />
            <circle cx="25" cy="15" r="1.5" fill="#38BDF8" />
            <circle cx="23" cy="21" r="1.5" fill="#38BDF8" />
            <circle cx="11" cy="16" r="1.5" fill="#818CF8" />
            <path
              d="M18 13.5L25 15L23 21"
              stroke="#38BDF8"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2 1.5"
            />
            {/* Gradients */}
            <defs>
              <linearGradient id="leftPageGrad" x1="5" y1="9" x2="17" y2="27" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#4338CA" />
              </linearGradient>
              <linearGradient id="rightPageGrad" x1="19" y1="9" x2="31" y2="27" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06B6D4" />
                <stop offset="1" stopColor="#0284C7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Typography with distinctive e + Library */}
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <div className={`font-extrabold tracking-tight ${textSizes[size]} text-slate-900 dark:text-white flex items-center`}>
            <span className="text-cyan-600 dark:text-cyan-400 font-black">e</span>
            <span className="text-indigo-600 dark:text-indigo-400">Lib</span>
            <span className="text-slate-800 dark:text-slate-100">rary</span>
          </div>
          <span className="text-[9px] tracking-wider uppercase font-semibold text-slate-600 dark:text-slate-300">
            Digital Campus
          </span>
        </div>
      )}
    </div>
  );
};
