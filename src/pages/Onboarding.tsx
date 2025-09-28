import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartPulse, Check } from "lucide-react";

const Onboarding = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'gu'>('en');
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md space-y-8">
        
        {/* Logo and Brand */}
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-slate-900 border-2 border-green-500/30 rounded-full">
                <HeartPulse className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-slate-50">
                NabhaCare
            </h1>
            <p className="text-slate-400 mt-2">
                Connecting Rural Communities to Quality Healthcare
            </p>
        </div>

        {/* Language Selection */}
        <Card className="bg-slate-900 border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4 text-center text-slate-200">
            Choose Your Language / તમારી ભાષા પસંદ કરો
          </h2>
          
          <div className="space-y-3">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`w-full p-4 rounded-xl border-2 transition-colors duration-200 flex items-center justify-between ${
                selectedLanguage === 'en'
                  ? 'border-green-500 bg-green-950/50'
                  : 'border-slate-700 bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <span className="text-lg font-semibold text-slate-100">English</span>
              {selectedLanguage === 'en' && <Check className="h-6 w-6 text-green-500" />}
            </button>
            
            <button
              onClick={() => setSelectedLanguage('gu')}
              className={`w-full p-4 rounded-xl border-2 transition-colors duration-200 flex items-center justify-between ${
                selectedLanguage === 'gu'
                  ? 'border-green-500 bg-green-950/50'
                  : 'border-slate-700 bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <span className="text-lg font-semibold text-slate-100">ગુજરાતી</span>
              {selectedLanguage === 'gu' && <Check className="h-6 w-6 text-green-500" />}
            </button>
          </div>
        </Card>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full h-14 text-lg font-bold bg-slate-50 hover:bg-slate-200 text-slate-900 rounded-xl"
        >
          Continue / ચાલુ રાખો
        </Button>

      </div>
    </div>
  );
};

export default Onboarding;

