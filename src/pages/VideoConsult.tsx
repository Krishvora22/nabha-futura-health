import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const VideoConsult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor;
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-float"></div>

      {/* Header */}
      <div className="glass border-0 p-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center glow-primary text-sm">
              {doctor?.image || "👨‍⚕️"}
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                {doctor?.name || "Dr. Priya Sharma"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {doctor?.specialty || "General Medicine"}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
              <span className="text-sm text-foreground">
                {isConnected ? formatDuration(callDuration) : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 p-4 relative">
        {/* Doctor Video */}
        <Card className="glass border-0 w-full h-full rounded-3xl overflow-hidden relative animate-scale-in">
          {!isConnected ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-3xl glow-primary animate-glow-pulse">
                  {doctor?.image || "👨‍⚕️"}
                </div>
                <p className="text-foreground font-medium">Connecting to doctor...</p>
                <div className="flex justify-center space-x-1 mt-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-glow flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-6xl glow-primary">
                  {doctor?.image || "👨‍⚕️"}
                </div>
                <p className="text-foreground font-medium text-lg">
                  {doctor?.name || "Dr. Priya Sharma"}
                </p>
                <p className="text-muted-foreground text-sm">
                  How can I help you today?
                </p>
              </div>
            </div>
          )}

          {/* Patient Video (Picture-in-Picture) */}
          {isConnected && (
            <Card className="absolute top-4 right-4 w-24 h-32 glass border-primary/30 rounded-2xl overflow-hidden animate-slide-in-right">
              <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                {isVideoOn ? (
                  <span className="text-2xl">👤</span>
                ) : (
                  <div className="text-center">
                    <span className="text-lg">📷</span>
                    <p className="text-xs text-foreground mt-1">Video Off</p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </Card>
      </div>

      {/* Controls */}
      <div className="glass border-0 p-6 animate-slide-in-right">
        <div className="flex justify-center space-x-6">
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full border-2 transition-all duration-300 ${
              isMuted
                ? 'border-destructive bg-destructive/20 glow-danger'
                : 'border-primary bg-primary/20 glow-primary'
            }`}
          >
            <span className="text-xl">
              {isMuted ? '🔇' : '🎤'}
            </span>
          </button>

          {/* Video Toggle */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-14 h-14 rounded-full border-2 transition-all duration-300 ${
              !isVideoOn
                ? 'border-destructive bg-destructive/20 glow-danger'
                : 'border-primary bg-primary/20 glow-primary'
            }`}
          >
            <span className="text-xl">
              {isVideoOn ? '📹' : '📷'}
            </span>
          </button>

          {/* End Call */}
          <button
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full border-2 border-destructive bg-destructive glow-danger transition-all duration-300 hover:scale-110"
          >
            <span className="text-xl text-white">📞</span>
          </button>

          {/* Chat Button */}
          <button className="w-14 h-14 rounded-full border-2 border-accent bg-accent/20 glow-accent transition-all duration-300">
            <span className="text-xl">💬</span>
          </button>

          {/* More Options */}
          <button className="w-14 h-14 rounded-full border-2 border-muted bg-muted/20 transition-all duration-300">
            <span className="text-xl">⋯</span>
          </button>
        </div>

        {/* Quick Actions */}
        {isConnected && (
          <div className="flex justify-center space-x-3 mt-4">
            <Button
              variant="outline"
              className="glass border-primary/30 rounded-2xl px-4 py-2 text-sm"
            >
              📋 Symptoms
            </Button>
            <Button
              variant="outline"
              className="glass border-primary/30 rounded-2xl px-4 py-2 text-sm"
            >
              📁 Records
            </Button>
            <Button
              variant="outline"
              className="glass border-primary/30 rounded-2xl px-4 py-2 text-sm"
            >
              💊 Prescriptions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoConsult;