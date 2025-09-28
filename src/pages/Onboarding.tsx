import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Onboarding = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'pa'>('en');
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden animate-gradient">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-40 animate-float">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-bl from-accent/25 to-primary/15 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl glow-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl glow-pulse" style={{ animationDelay: '1.5s' }}></div>

      {/* Enhanced Main Content */}
      <div className="z-10 w-full max-w-md animate-fade-in">
        {/* Enhanced Logo/Brand */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <h1 className="font-poppins text-5xl font-black bg-gradient-button bg-clip-text text-transparent mb-3 glow-primary">
              NabhaCare
            </h1>
            <div className="w-24 h-1 bg-gradient-button mx-auto rounded-full glow-primary"></div>
          </div>
          <p className="text-foreground/80 text-lg font-medium">
            Rural Healthcare Revolution
          </p>
        </div>

        {/* Enhanced Illustration */}
        <div className="w-full h-64 mb-8 glass-card rounded-3xl flex items-center justify-center animate-float card-hover">
          <div className="text-center p-6">
            <div className="relative mb-6">
              <div className="w-28 h-28 bg-gradient-button rounded-full mx-auto flex items-center justify-center glow-primary neumorphic">
                <svg className="w-14 h-14 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full glow-secondary animate-float" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-accent rounded-full glow-accent animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
            <p className="text-foreground font-medium">
              Connecting Rural Communities to Quality Healthcare
            </p>
          </div>
        </div>

        {/* Enhanced Language Selection */}
        <Card className="glass-card border-0 p-6 mb-8 animate-scale-in neumorphic">
          <h2 className="text-xl font-bold mb-4 text-center text-foreground font-poppins">
            Choose Your Language / ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ
          </h2>
          
          <div className="space-y-3">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`w-full p-5 rounded-3xl border-2 transition-all duration-300 neumorphic-inset ${
                selectedLanguage === 'en'
                  ? 'border-primary glow-primary bg-gradient-card'
                  : 'border-border glass-surface hover:glow-hover'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-foreground font-poppins">English</span>
                <span className="text-3xl">🇬🇧</span>
              </div>
            </button>
            
            <button
              onClick={() => setSelectedLanguage('pa')}
              className={`w-full p-5 rounded-3xl border-2 transition-all duration-300 neumorphic-inset ${
                selectedLanguage === 'pa'
                  ? 'border-primary glow-primary bg-gradient-card'
                  : 'border-border glass-surface hover:glow-hover'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-foreground font-poppins">ਪੰਜਾਬੀ</span>
                <span className="text-3xl">🇮🇳</span>
              </div>
            </button>
          </div>
        </Card>

        {/* Enhanced Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full py-5 text-lg font-bold btn-gradient border-0 rounded-3xl glow-primary hover:glow-accent transition-all duration-300 transform hover:scale-105 font-poppins"
        >
          Continue / ਜਾਰੀ ਰੱਖੋ
        </Button>

        {/* Enhanced Voice Assistant Note */}
        <div className="text-center mt-6 p-4 glass-card rounded-3xl neumorphic">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl animate-float">🎤</span>
            <p className="text-sm font-medium text-foreground">
              Voice assistance available in all features
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Speak naturally - we understand multiple languages
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;