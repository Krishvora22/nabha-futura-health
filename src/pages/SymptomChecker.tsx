import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mic, Bot } from "lucide-react";

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
      text: "Hello! I'm your AI health assistant. Please describe your symptoms. Remember, this is not a substitute for professional medical advice.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const commonSymptoms = [
    { emoji: "🤒", text: "Fever" },
    { emoji: "🤕", text: "Headache" },
    { emoji: "😷", text: "Cough" },
    { emoji: "🤧", text: "Cold" },
    { emoji: "😵", text: "Nausea" },
    { emoji: "💔", text: "Chest Pain" },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
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
      "Based on your symptoms, it would be best to schedule a consultation with one of our doctors. Would you like me to help you book an appointment?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSymptomClick = (symptom: string) => {
    setInputMessage(prev => prev ? `${prev}, ${symptom}` : symptom);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans">
      <header className="p-4 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button onClick={() => navigate('/home')} variant="outline" size="icon" className="bg-slate-900 border-slate-700 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-slate-50">AI Symptom Checker</h1>
          <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
            <Bot className="h-5 w-5 text-green-500"/>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-end gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-green-500" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-green-800 text-white rounded-br-none' // CHANGED to a darker green
                    : 'bg-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-2 text-right ${
                    message.isUser ? 'text-green-200/70' : 'text-slate-400/70'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="p-4 border-t border-slate-800 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          {messages.length < 3 && (
            <div className="mb-4">
              <p className="text-slate-400 text-sm mb-3">Or, select a common symptom:</p>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom.text}
                    onClick={() => handleSymptomClick(symptom.text)}
                    className="flex items-center space-x-2 bg-slate-800 border border-slate-700 px-3 py-2 rounded-full text-left transition-colors hover:bg-slate-700"
                  >
                    <span>{symptom.emoji}</span>
                    <span className="text-slate-200 text-sm font-medium">{symptom.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Describe your symptoms..."
              className="flex-1 bg-slate-800 border-slate-700 rounded-full h-12 px-5 text-slate-200 placeholder:text-slate-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} size="icon" className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 flex-shrink-0">
              <Send className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-slate-900 border-slate-700 hover:bg-slate-800 flex-shrink-0">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SymptomChecker;