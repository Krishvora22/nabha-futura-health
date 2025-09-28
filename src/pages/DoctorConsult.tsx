import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Stethoscope, 
  Video, 
  CalendarClock, 
  Lock, 
  MessageSquare, 
  Star, 
  IndianRupee,
  Siren,
  History,
  PhoneCall
} from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  nextSlot: string;
  consultationFee: number;
  image: string; 
}

// Same data, no changes needed here
const DoctorConsult = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const doctors: Doctor[] = [
    { id: 1, name: "Dr. Priya Sharma", specialty: "General Medicine", status: 'available', rating: 4.8, nextSlot: "Available Now", consultationFee: 200, image: "👩‍⚕️" },
    { id: 2, name: "Dr. Rajesh Kumar", specialty: "Pediatrics", status: 'busy', rating: 4.9, nextSlot: "2:30 PM", consultationFee: 250, image: "👨‍⚕️" },
    { id: 3, name: "Dr. Sunita Patel", specialty: "Gynecology", status: 'available', rating: 4.7, nextSlot: "Available Now", consultationFee: 300, image: "👩‍⚕️" },
    { id: 4, name: "Dr. Amit Singh", specialty: "Cardiology", status: 'offline', rating: 4.6, nextSlot: "Tomorrow 10 AM", consultationFee: 400, image: "👨‍⚕️" },
    // Adding more doctors to demonstrate the grid layout effectively
    { id: 5, name: "Dr. Anita Desai", specialty: "Dermatology", status: 'available', rating: 4.9, nextSlot: "Available Now", consultationFee: 350, image: "👩‍⚕️" },
    { id: 6, name: "Dr. Vikram Rathod", specialty: "General Medicine", status: 'busy', rating: 4.5, nextSlot: "5:00 PM", consultationFee: 200, image: "👨‍⚕️" },
  ];

  const specialties = ['all', 'General Medicine', 'Pediatrics', 'Gynecology', 'Cardiology', 'Dermatology'];

  // Helper to get color-coded class for the status indicator dot
  const getStatusIndicatorClass = (status: 'available' | 'busy' | 'offline') => {
    switch (status) {
      case 'available': return "bg-green-500";
      case 'busy': return "bg-yellow-500";
      case 'offline': return "bg-slate-500";
    }
  };

  const filteredDoctors = selectedSpecialty === 'all' 
    ? doctors 
    : doctors.filter(doc => doc.specialty === selectedSpecialty);

  const handleBookConsultation = (doctor: Doctor) => {
    if (doctor.status === 'available') {
      navigate('/video-consult', { state: { doctor } });
    } else if (doctor.status === 'busy') {
      navigate('/book-slot', { state: { doctor } });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-6 font-sans">
      
      {/* Header and Filters remain the same, as they are already effective */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button onClick={() => navigate('/home')} variant="outline" size="icon" className="bg-slate-900 border-slate-700 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-slate-50">Consult a Doctor</h1>
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-green-500"/>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-slate-300 font-semibold mb-3 text-lg">Specialties</h2>
          <div className="flex overflow-x-auto space-x-2 pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                  selectedSpecialty === specialty
                    ? 'bg-green-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {specialty === 'all' ? 'All' : specialty}
              </button>
            ))}
          </div>
        </div>

        {/* --- UI IMPROVEMENT: RESPONSIVE GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-green-500/50"
            >
              <div className="p-6 flex flex-col items-center text-center">
                {/* Avatar with Status Indicator */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-5xl border-2 border-slate-700">
                    {doctor.image}
                  </div>
                  <span className={`absolute bottom-1 right-1 block h-4 w-4 rounded-full border-2 border-slate-900 ${getStatusIndicatorClass(doctor.status)}`} />
                </div>
                
                {/* Doctor Info */}
                <h3 className="font-bold text-lg text-slate-50">{doctor.name}</h3>
                <p className="text-sm text-green-400 mb-3">{doctor.specialty}</p>
                
                {/* Stats (Rating & Fee) */}
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-300">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{doctor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="h-4 w-4 text-slate-400" />
                    <span>{doctor.consultationFee}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-auto p-4 bg-slate-900/50 border-t border-slate-800 flex items-center space-x-2">
                <Button
                  onClick={() => handleBookConsultation(doctor)}
                  disabled={doctor.status === 'offline'}
                  className="w-full rounded-lg disabled:bg-slate-700 disabled:text-slate-500 disabled:opacity-70 bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  {doctor.status === 'available' && <Video className="mr-2 h-4 w-4"/>}
                  {doctor.status === 'busy' && <CalendarClock className="mr-2 h-4 w-4"/>}
                  {doctor.status === 'offline' && <Lock className="mr-2 h-4 w-4"/>}
                  
                  {doctor.status === 'available' ? 'Consult Now' : doctor.status === 'busy' ? 'Book Slot' : 'Offline'}
                </Button>
                <Button variant="outline" size="icon" className="rounded-lg bg-slate-800 border-slate-700 hover:bg-slate-700 flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-slate-400" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="h-6"></div>
    </div>
  );
};

export default DoctorConsult;