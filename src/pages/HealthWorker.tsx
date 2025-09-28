import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  urgency: 'high' | 'medium' | 'low';
  symptoms: string;
  waitTime: string;
  village: string;
  status: 'waiting' | 'in-progress' | 'completed';
}

const HealthWorker = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'queue' | 'analytics' | 'resources'>('queue');

  const patients: Patient[] = [
    { id: 1, name: "Rajesh Kumar", age: 45, gender: "Male", urgency: 'high', symptoms: "Chest pain, difficulty breathing", waitTime: "5 min", village: "Khalsa Nagar", status: 'waiting' },
    { id: 2, name: "Sunita Devi", age: 32, gender: "Female", urgency: 'medium', symptoms: "Fever, headache for 3 days", waitTime: "15 min", village: "Ram Nagar", status: 'in-progress' },
    { id: 3, name: "Amit Singh", age: 28, gender: "Male", urgency: 'low', symptoms: "Routine checkup", waitTime: "25 min", village: "Green Valley", status: 'waiting' }
  ];

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Badge className="bg-red-600 text-white shadow-md">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 text-black shadow-md">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white shadow-md">Low</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting': return '⏳';
      case 'in-progress': return '🔄';
      case 'completed': return '✅';
      default: return '⏳';
    }
  };

  const handleTriageAction = (patientId: number, action: string) => {
    console.log(`${action} for patient ${patientId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-green-950 text-white p-6 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/home')} className="p-2 rounded-full border border-green-400 hover:bg-green-700 transition">
          ←
        </button>
        <h1 className="text-2xl font-bold tracking-wide">Health Worker Dashboard</h1>
        <div className="p-2 rounded-full bg-green-600 shadow-lg">👩‍⚕️</div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6">
        {['queue', 'analytics', 'resources'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeTab === tab ? "bg-green-600 text-black shadow-lg" : "border border-green-500 text-green-400 hover:bg-green-800"
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === 'queue' ? 'Patient Queue' : tab === 'analytics' ? 'Analytics' : 'Resources'}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          {patients.map((p) => (
            <Card key={p.id} className="bg-gray-800 border border-green-700 p-5 rounded-xl shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <span>{getStatusIcon(p.status)}</span>
                  </div>
                  <p className="text-sm text-green-300">{p.age}y, {p.gender} • {p.village}</p>
                </div>
                <div className="text-right space-y-1">
                  {getUrgencyBadge(p.urgency)}
                  <p className="text-xs text-green-400">Wait: {p.waitTime}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-green-300 font-medium">Symptoms</p>
              <p className="bg-gray-700 p-3 rounded-lg text-green-200">{p.symptoms}</p>

              <div className="mt-4 flex space-x-3">
                <Button className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg shadow-md" onClick={() => handleTriageAction(p.id, 'escalate')}>Escalate</Button>
                <Button className="bg-green-500 hover:bg-green-600 text-black py-1 px-4 rounded-lg shadow-md" onClick={() => handleTriageAction(p.id, 'treat')}>Treat</Button>
                <Button className="border border-green-400 text-green-300 hover:bg-green-700 py-1 px-4 rounded-lg shadow-md" onClick={() => handleTriageAction(p.id, 'refer')}>Refer</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <Card className="bg-gray-800 border border-green-700 p-5 rounded-xl shadow-lg">
          <h3 className="font-semibold text-green-400 text-lg mb-4">Today's Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span>Patients Seen</span><span className="font-bold text-green-400">22</span></div>
            <div className="flex justify-between"><span>Emergency Cases</span><span className="font-bold text-red-500">3</span></div>
            <div className="flex justify-between"><span>Referrals Made</span><span className="font-bold text-yellow-500">5</span></div>
            <div className="flex justify-between"><span>Avg. Wait Time</span><span className="font-bold text-green-400">12 min</span></div>
          </div>
        </Card>
      )}

      {activeTab === 'resources' && (
        <Card className="bg-gray-800 border border-green-700 p-5 rounded-xl shadow-lg">
          <h3 className="font-semibold text-green-400 text-lg mb-4">Quick Reference</h3>
          <div className="grid grid-cols-2 gap-3">
            {["Emergency Protocols","Drug Dosages","Vital Signs","Common Treatments"].map((r,i)=>(
              <Button key={i} className="w-full text-left bg-gray-700 text-green-300 border border-green-600 rounded-lg p-3 hover:bg-green-900 transition">{r}</Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default HealthWorker;
