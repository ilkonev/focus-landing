import { TrendingUp, Zap, Trophy, Target } from "lucide-react";

const PhoneMockup = () => {
  return (
    <div className="relative animate-float-slow">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl rounded-full scale-110 animate-pulse-glow" />
      
      {/* Phone frame - responsive: smaller on narrow screens */}
      <div className="relative w-[240px] h-[480px] sm:w-[280px] sm:h-[560px] md:w-[300px] md:h-[600px] rounded-[2.5rem] sm:rounded-[3rem] bg-foreground p-1.5 sm:p-2 shadow-2xl">
        {/* Screen */}
        <div className="w-full h-full bg-background rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3">
            <span className="text-xs font-medium text-muted-foreground">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-6 h-3 bg-foreground rounded-sm" />
            </div>
          </div>

          {/* App content */}
          <div className="p-3 sm:p-5 space-y-3 sm:space-y-5">
            {/* Header */}
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Сегодня</p>
              <h3 className="font-bold text-xl text-foreground">Уровень 12</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-extrabold text-gradient">2,450</span>
                <span className="text-sm text-muted-foreground">очков</span>
              </div>
            </div>

            {/* Progress ring */}
            <div className="flex justify-center">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${0.72 * 264} 264`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-foreground">72%</span>
                  <span className="text-xs text-muted-foreground">цель дня</span>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: TrendingUp, label: "Фокус", value: "+18%", color: "text-success" },
                { icon: Zap, label: "Энергия", value: "85/100", color: "text-warning" },
                { icon: Trophy, label: "Ачивки", value: "24", color: "text-primary" },
                { icon: Target, label: "Серия", value: "7 дней", color: "text-primary" },
              ].map((stat, i) => (
                <div key={i} className="bg-secondary/50 rounded-2xl p-3 space-y-1 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-1.5">
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    <span className="text-[10px] text-muted-foreground font-medium">{stat.label}</span>
                  </div>
                  <p className="text-sm font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Daily challenge */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[10px] text-primary font-semibold uppercase tracking-wide">Челлендж дня</p>
                  <p className="text-sm font-medium text-foreground">30 мин без соцсетей</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-background/30 rounded-full" />
      </div>
    </div>
  );
};

export default PhoneMockup;
