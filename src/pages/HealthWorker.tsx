import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, HeartHandshake, User, BarChart2, BookOpen, Clock, Loader, CheckCircle, Siren } from "lucide-react";

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
    { id: 3, name: "Amit Singh", age: 28, gender: "Male", urgency: 'low', symptoms: "Routine checkup", waitTime: "25 min", village: "Green Valley", status: 'waiting' },
    { id: 4, name: "Priya Patel", age: 67, gender: "Female", urgency: 'high', symptoms: "High blood pressure, dizziness", waitTime: "2 min", village: "Khalsa Nagar", status: 'waiting' },
    { id: 5, name: "Anjali Sharma", age: 5, gender: "Female", urgency: 'medium', symptoms: "Persistent cough and cold", waitTime: "20 min", village: "Ram Nagar", status: 'completed' },
  ];
  
  const getUrgencyBadge = (urgency: 'high' | 'medium' | 'low') => {
    switch (urgency) {
      case 'high': return <Badge variant="destructive" className="bg-red-800 text-red-200 border-red-600">High</Badge>;
      case 'medium': return <Badge variant="outline" className="border-yellow-500 text-yellow-500 bg-yellow-950">Medium</Badge>;
      case 'low': return <Badge variant="outline" className="border-green-500 text-green-500 bg-green-950">Low</Badge>;
    }
  };
  
  const getStatusIcon = (status: 'waiting' | 'in-progress' | 'completed') => {
    switch (status) {
      case 'waiting': return <Clock className="h-4 w-4 text-slate-400" />;
      case 'in-progress': return <Loader className="h-4 w-4 text-blue-400 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };
  
  const handleTriageAction = (patientId: number, action: string) => {
    console.log(`${action} for patient ${patientId}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'queue':
        return (
          <div className="space-y-4">
            {patients.map((p) => (
              <Card key={p.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-3"><h3 className="font-bold text-lg text-slate-50">{p.name}</h3>{getStatusIcon(p.status)}</div>
                    <p className="text-sm text-slate-400">{p.age} years, {p.gender} • {p.village}</p>
                  </div>
                  <div className="text-right space-y-1">{getUrgencyBadge(p.urgency)}<p className="text-xs text-slate-500">Wait: {p.waitTime}</p></div>
                </div>
                <div className="bg-slate-800/70 p-3 rounded-lg"><p className="text-sm text-slate-300">{p.symptoms}</p></div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg" onClick={() => handleTriageAction(p.id, 'escalate')}><Siren className="mr-2 h-4 w-4"/>Escalate</Button>
                  <Button size="sm" className="bg-slate-50 hover:bg-slate-200 text-slate-900 font-bold rounded-lg" onClick={() => handleTriageAction(p.id, 'treat')}>Treat</Button>
                  <Button size="sm" variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700 rounded-lg" onClick={() => handleTriageAction(p.id, 'refer')}>Refer</Button>
                </div>
              </Card>
            ))}
          </div>
        );
      case 'analytics':
        return (
          <Card className="bg-slate-900 border border-slate-800 p-5 rounded-xl"><h3 className="font-semibold text-slate-200 text-lg mb-4">Today's Performance</h3><div className="space-y-3 text-sm"><div className="flex justify-between"><span>Patients Seen</span><span className="font-bold text-slate-200">22</span></div><div className="flex justify-between"><span>High Urgency Cases</span><span className="font-bold text-red-500">4</span></div><div className="flex justify-between"><span>Referrals Made</span><span className="font-bold text-yellow-500">5</span></div><div className="flex justify-between"><span>Avg. Wait Time</span><span className="font-bold text-slate-200">12 min</span></div></div></Card>
        );
      case 'resources':
        return (
          <Card className="bg-slate-900 border border-slate-800 p-5 rounded-xl"><h3 className="font-semibold text-slate-200 text-lg mb-4">Quick Reference</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{["Emergency Protocols","Drug Dosages","Vital Signs","Common Treatments"].map((r,i)=>(<Button key={i} variant="outline" className="w-full h-14 text-left justify-start bg-slate-800 border-slate-700 hover:bg-slate-700 rounded-lg p-3">{r}</Button>))}</div></Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 font-sans">
      <div className="mx-auto max-w-screen-2xl p-4 sm:p-6">
        <header className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate('/home')} variant="outline" size="icon" className="bg-slate-900 border-slate-700 rounded-full"><ArrowLeft className="h-5 w-5" /></Button>
          <h1 className="text-xl font-bold text-slate-50">Health Worker Dashboard</h1>
          <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center"><HeartHandshake className="h-5 w-5 text-green-500"/></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          <main>
            <div className="flex flex-wrap gap-2 mb-6">
              <Button onClick={() => setActiveTab('queue')} variant={activeTab === 'queue' ? 'default' : 'outline'} className={`rounded-full ${activeTab === 'queue' ? 'bg-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700'}`}><User className="mr-2 h-4 w-4" /> Patient Queue</Button>
              <Button onClick={() => setActiveTab('analytics')} variant={activeTab === 'analytics' ? 'default' : 'outline'} className={`rounded-full ${activeTab === 'analytics' ? 'bg-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700'}`}><BarChart2 className="mr-2 h-4 w-4" /> Analytics</Button>
              <Button onClick={() => setActiveTab('resources')} variant={activeTab === 'resources' ? 'default' : 'outline'} className={`rounded-full ${activeTab === 'resources' ? 'bg-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700'}`}><BookOpen className="mr-2 h-4 w-4" /> Resources</Button>
            </div>
            {renderContent()}
          </main>

          <aside className="space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
              <h3 className="font-semibold text-slate-200 mb-4">Queue Summary</h3>
              <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center"><span className="text-slate-400">Total Patients Waiting</span><span className="font-bold text-lg text-slate-50">{patients.filter(p => p.status === 'waiting').length}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">High Urgency Cases</span><span className="font-bold text-lg text-red-500">{patients.filter(p => p.urgency === 'high' && p.status !== 'completed').length}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Currently Treating</span><span className="font-bold text-lg text-blue-400">{patients.filter(p => p.status === 'in-progress').length}</span></div>
              </div>
            </Card>
            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
              <h3 className="font-semibold text-slate-200 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-slate-800 border-slate-700">Add New Patient</Button>
                <Button variant="outline" className="w-full justify-start bg-slate-800 border-slate-700">Request Supplies</Button>
                <Button variant="outline" className="w-full justify-start bg-slate-800 border-slate-700">Contact Supervisor</Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HealthWorker;
