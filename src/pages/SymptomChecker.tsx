import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. Please describe your symptoms, and I'll help assess your condition. Remember, this is not a substitute for professional medical advice.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const commonSymptoms = [
    { emoji: "🤒", text: "Fever", category: "general" },
    { emoji: "🤕", text: "Headache", category: "general" },
    { emoji: "😷", text: "Cough", category: "respiratory" },
    { emoji: "🤧", text: "Cold", category: "respiratory" },
    { emoji: "😵", text: "Nausea", category: "digestive" },
    { emoji: "💔", text: "Chest Pain", category: "cardiac" },
    { emoji: "🦵", text: "Joint Pain", category: "musculoskeletal" },
    { emoji: "😴", text: "Fatigue", category: "general" }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const generateAIResponse = (symptom: string) => {
    const responses = [
      "I understand you're experiencing these symptoms. Can you tell me when they started and how severe they are on a scale of 1-10?",
      "Thank you for that information. Are you experiencing any additional symptoms like fever, chills, or changes in appetite?",
      "Based on your symptoms, I recommend scheduling a consultation with one of our doctors. Would you like me to help you book an appointment?",
      "Your symptoms warrant medical attention. I'm connecting you with our triage system to prioritize your care needs."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSymptomClick = (symptom: string) => {
    setInputMessage(symptom);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-float"></div>

      {/* Header */}
      <div className="glass border-0 p-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-full glass border-primary/30 flex items-center justify-center"
          >
            ←
          </button>
          <h1 className="font-orbitron text-xl font-bold text-foreground">
            Symptom Checker
          </h1>
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center glow-primary">
            🔍
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 mobile-padding overflow-y-auto">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-scale-in`}
            >
              <Card
                className={`max-w-[80%] p-4 border-0 ${
                  message.isUser
                    ? 'bg-white text-black shadow-lg'
                    : 'glass'
                }`}
              >
                <p className={`text-sm ${
                  message.isUser ? 'text-black' : 'text-foreground'
                }`}>
                  {message.text}
                </p>
                <p className={`text-xs mt-2 opacity-70 ${
                  message.isUser ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </Card>
            </div>
          ))}
        </div>

        {/* Quick Symptoms */}
        {messages.length === 1 && (
          <div className="animate-fade-in">
            <p className="text-foreground font-medium mb-4">
              Quick symptom selection:
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom.text}
                  onClick={() => handleSymptomClick(symptom.text)}
                  className="glass border-0 p-3 rounded-2xl text-left transition-all duration-300 hover:scale-105 glow-primary"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{symptom.emoji}</span>
                    <span className="text-foreground text-sm font-medium">
                      {symptom.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="glass border-0 p-4 animate-slide-in-right">
        <div className="flex space-x-3">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1 glass border-primary/30 rounded-2xl text-foreground placeholder:text-muted-foreground"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className="w-12 h-12 rounded-2xl bg-gradient-primary border-0 glow-primary hover:glow-accent transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </Button>
        </div>
        
        {/* Voice Input Button */}
        <div className="flex justify-center mt-3">
          <Button
            variant="outline"
            className="glass border-primary/30 rounded-2xl px-6 text-sm"
          >
            🎤 Voice Input
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;