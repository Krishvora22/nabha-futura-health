import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope, FileSearch, Pill, ClipboardList, HeartHandshake, Siren, UserCircle2, Mic, MapPin,
  ChevronRight, Bell, FileText, CreditCard, Phone, Lightbulb, History, Package, Video,
  Users, ArrowRight
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { title: "Consult Doctor", subtitle: "Video call with specialists", Icon: Stethoscope, route: "/doctor-consult", color: "green", available: true },
    { title: "Symptom Checker", subtitle: "AI-powered assessment", Icon: FileSearch, route: "/symptom-checker", color: "green", available: true },
    { title: "Pharmacy", subtitle: "Medicine & orders", Icon: Pill, route: "/pharmacy", color: "green", available: true },
    { title: "Health Records", subtitle: "Your medical history", Icon: ClipboardList, route: "/records", color: "gray", available: false },
    { title: "Health Worker", subtitle: "Connect with local ASHA", Icon: HeartHandshake, route: "/health-worker", color: "green", available: true },
    { title: "Emergency", subtitle: "Urgent medical assistance", Icon: Siren, route: "/emergency", color: "red", available: true },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-950 text-slate-200 font-sans">
      <div className="flex-grow">
        {/* --- CHANGE: Widened max-width for better use of large screens --- */}
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6">
          
          <aside className="hidden lg:block space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center space-x-4"><UserCircle2 className="h-14 w-14 text-slate-400" /><div><h2 className="text-xl font-bold text-slate-50">Welcome Back!</h2><p className="text-sm text-slate-400">Priya Sharma</p></div></div>
            </Card>
            
            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
              <h3 className="font-semibold text-slate-200 mb-3">Upcoming Appointments</h3>
              <div className="space-y-4"><div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"><div><p className="font-bold text-sm">Dr. Rajesh Kumar</p><p className="text-xs text-slate-400">General Checkup - 1:30 PM</p></div><ChevronRight className="h-5 w-5 text-slate-500" /></div></div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
              <h3 className="font-semibold text-slate-200 mb-4">Recent Activity</h3>
              <ul className="space-y-4 text-sm"><li className="flex items-start space-x-3"><Video className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" /><div><p className="text-slate-300">Video consult with Dr. Sharma</p><p className="text-xs text-slate-400">1 day ago</p></div></li><li className="flex items-start space-x-3"><Pill className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" /><div><p className="text-slate-300">Prescription filled for Paracetamol</p><p className="text-xs text-slate-400">3 days ago</p></div></li></ul>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-semibold text-slate-200">Our Specialists</h3>
                 <Users className="h-5 w-5 text-slate-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-lg">👩‍⚕️</div><div><p className="font-bold text-sm text-slate-200">Dr. Priya Sharma</p><p className="text-xs text-slate-400">General Medicine</p></div></div>
                <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-lg">👨‍⚕️</div><div><p className="font-bold text-sm text-slate-200">Dr. Amit Singh</p><p className="text-xs text-slate-400">Cardiology</p></div></div>
                <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-lg">👩‍⚕️</div><div><p className="font-bold text-sm text-slate-200">Dr. Sunita Patel</p><p className="text-xs text-slate-400">Gynecology</p></div></div>
              </div>
            </Card>
          </aside>

          <main>
             <div className="lg:hidden mb-6"><Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl"><div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-slate-50">Welcome Back! 👋</h1><p className="text-slate-400">How can we help you today?</p></div><UserCircle2 className="h-10 w-10 text-slate-400" /></div></Card></div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"><Button variant="outline" className="h-16 bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-base"><Mic className="mr-3 h-5 w-5 text-green-400" /> Voice Search</Button><Button variant="outline" className="h-16 bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-base"><MapPin className="mr-3 h-5 w-5 text-green-400" /> Nearby Centers</Button></div>
            <h2 className="text-xl font-bold text-slate-200 mb-8">Healthcare Services</h2>
            {/* --- CHANGE: Made service grid responsive to fill space on wider screens --- */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {services.map((service) => {
                const isEmergency = service.color === "red";
                const iconColor = isEmergency ? "text-red-500" : "text-green-500";
                const hoverBorder = isEmergency ? "hover:border-red-500/50" : "hover:border-green-500/50";
                return (<Card key={service.title} className={`p-5 text-center bg-slate-900 border border-slate-800 rounded-xl transition-all duration-300 flex flex-col items-center justify-center aspect-square ${service.available ? `cursor-pointer hover:-translate-y-1 ${hoverBorder}` : "opacity-60 cursor-not-allowed"}`} onClick={() => service.available && navigate(service.route)}><service.Icon className={`h-8 sm:h-10 w-8 sm:w-10 mb-3 ${iconColor}`} strokeWidth={1.5} /><h3 className="font-bold text-sm sm:text-base text-slate-50 mb-1">{service.title}</h3><p className="text-xs text-slate-400 leading-tight hidden sm:block">{service.subtitle}</p>{!service.available && <Badge variant="outline" className="mt-2 bg-slate-800 border-slate-700 text-slate-400 text-xs">Coming Soon</Badge>}</Card>);
              })}
            </div>
          </main>

          <aside className="hidden lg:block space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl"><h3 className="font-semibold text-slate-200 mb-3">Quick Links</h3><div className="space-y-2"><Button variant="ghost" className="w-full justify-start text-slate-300"><FileText className="mr-3 h-5 w-5" /> My Prescriptions</Button><Button variant="ghost" className="w-full justify-start text-slate-300"><CreditCard className="mr-3 h-5 w-5" /> Payment History</Button><Button variant="ghost" className="w-full justify-start text-slate-300"><Phone className="mr-3 h-5 w-5" /> Contact Support</Button></div></Card>
            {/* <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl"><h3 className="font-semibold text-slate-200 mb-4">My Orders</h3><div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg"><Package className="h-6 w-6 text-slate-500 flex-shrink-0"/><div><p className="font-bold text-sm text-slate-300">Order #AB1234</p><Badge variant="outline" className="border-yellow-500 text-yellow-500 bg-yellow-950 text-xs mt-1">Out for Delivery</Badge></div></div></Card> */}
            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl"><div className="flex items-center space-x-3 mb-3"><Lightbulb className="h-6 w-6 text-yellow-400" /><h3 className="font-semibold text-slate-200">Health Tip of the Day</h3></div><p className="text-sm text-slate-400">Staying hydrated is key! Drinking enough water daily can improve energy levels and brain function.</p></Card>
            <Card className="bg-slate-900 border-slate-800 rounded-2xl overflow-hidden"><div className="h-32 bg-slate-800 flex items-center justify-center"><Stethoscope className="h-12 w-12 text-green-500/30" /></div><div className="p-5"><h3 className="font-semibold text-slate-200 mb-2">5 Tips for a Healthier Heart</h3><p className="text-sm text-slate-400 mb-4">Learn simple lifestyle changes that can make a big impact on your cardiovascular health.</p><Button variant="outline" className="w-full bg-slate-800 border-slate-700 hover:bg-slate-700">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button></div></Card>
          </aside>
        </div>
      </div>
      <footer className="w-full border-t border-slate-800 mt-10">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between p-6 text-sm text-slate-500">
            <p>&copy; 2025 HealthApp. All Rights Reserved.</p>
            <div className="flex space-x-4"><a href="#" className="hover:text-slate-300">Privacy Policy</a><a href="#" className="hover:text-slate-300">Terms of Service</a></div>
        </div>
      </footer>
    </div>
  );
};

export default Home;