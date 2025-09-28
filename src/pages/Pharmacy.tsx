import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pill, Search, Upload, ShoppingCart, History, Info, Bell, Tag, Truck } from "lucide-react";

interface Medicine {
  id: number;
  name: string;
  genericName: string;
  type: string;
  price: number;
  stock: number;
  manufacturer: string;
  alternatives?: string[];
  prescription: boolean;
}

const Pharmacy = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const medicines: Medicine[] = [
    { id: 1, name: "Paracetamol 500mg", genericName: "Acetaminophen", type: "Tablet", price: 25, stock: 150, manufacturer: "Sun Pharma", alternatives: ["Crocin", "Dolo 650"], prescription: false },
    { id: 2, name: "Amoxicillin 250mg", genericName: "Amoxicillin", type: "Capsule", price: 85, stock: 0, manufacturer: "Cipla", alternatives: ["Augmentin", "Clavam"], prescription: true },
    { id: 3, name: "Cetirizine 10mg", genericName: "Cetirizine", type: "Tablet", price: 45, stock: 35, manufacturer: "Dr. Reddy's", alternatives: ["Zyrtec", "Alerid"], prescription: false },
    { id: 4, name: "Metformin 500mg", genericName: "Metformin", type: "Tablet", price: 120, stock: 200, manufacturer: "Lupin", alternatives: ["Glucophage", "Diabex"], prescription: true },
    { id: 5, name: "Azithromycin 500mg", genericName: "Azithromycin", type: "Tablet", price: 110, stock: 80, manufacturer: "Pfizer", alternatives: ["Azee", "Zithrox"], prescription: true },
    { id: 6, name: "Benadryl Syrup", genericName: "Diphenhydramine", type: "Syrup", price: 95, stock: 60, manufacturer: "Johnson & Johnson", alternatives: [], prescription: false },
  ];

  const categories = ["all", "Tablet", "Capsule", "Syrup", "Injection"];

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="outline" className="border-red-500 text-red-500 bg-red-950">Out of Stock</Badge>;
    } else if (stock < 50) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500 bg-yellow-950">Low Stock</Badge>;
    } else {
      return <Badge variant="outline" className="border-green-500 text-green-500 bg-green-950">In Stock</Badge>;
    }
  };

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) || medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || medicine.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-950 text-slate-200 font-sans">
      <div className="flex-grow">
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6">
          
          <aside className="space-y-6">
            {/* <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-200">Order History</h3>
                    <History className="h-5 w-5 text-slate-500" />
                </div>
                <Button variant="outline" className="w-full bg-slate-800 border-slate-700 hover:bg-slate-700">View All Orders</Button>
            </Card> */}
          </aside>

          <main>
            <header className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <Button onClick={() => navigate('/home')} variant="outline" size="icon" className="bg-slate-900 border-slate-700 rounded-full"><ArrowLeft className="h-5 w-5" /></Button>
                    <h1 className="text-xl font-bold text-slate-50">Pharmacy</h1>
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center"><Pill className="h-5 w-5 text-green-500"/></div>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by medicine or generic name..." className="w-full bg-slate-800 border-slate-700 rounded-full h-12 pl-12 pr-4 text-slate-200 placeholder:text-slate-500"/>
                </div>
            </header>

            <div className="mb-6">
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-slate-200 text-slate-900'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col">
                  <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                          <div>
                              <div className="flex items-center gap-2 mb-1"><h3 className="font-bold text-slate-50">{medicine.name}</h3>{medicine.prescription && <Badge variant="outline" className="border-amber-500 text-amber-500 bg-amber-950">Rx</Badge>}</div>
                              <p className="text-sm text-slate-400">{medicine.manufacturer}</p>
                          </div>
                          {getStockBadge(medicine.stock)}
                      </div>
                      <div className="flex items-center justify-between mb-4">
                          <p className="text-lg font-bold text-slate-300">₹{medicine.price}</p>
                          <p className="text-sm text-slate-500">{medicine.type}</p>
                      </div>
                  </div>
                  <div className="flex space-x-3 mt-auto">
                      {medicine.stock > 0 ? (
                      <><Button className="flex-1 bg-slate-50 hover:bg-slate-200 text-slate-900 font-bold rounded-lg"><ShoppingCart className="mr-2 h-4 w-4" /> Add</Button><Button variant="outline" size="icon" className="rounded-lg bg-slate-800 border-slate-700 hover:bg-slate-700"><Info className="h-5 w-5 text-slate-400" /></Button></>
                      ) : (
                      <Button variant="outline" className="flex-1 bg-slate-800 border-slate-700 hover:bg-slate-700 rounded-lg"><Bell className="mr-2 h-4 w-4"/> Notify Me</Button>
                      )}
                  </div>
                </Card>
              ))}
            </div>
          </main>

          <aside className="space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3"><Upload className="h-6 w-6 text-slate-400" /><h3 className="font-semibold text-slate-200">Upload Prescription</h3></div>
                <p className="text-sm text-slate-400 mb-4">Have a prescription? Upload it here for a quick and easy order.</p>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-50 font-bold border border-slate-700">Upload Now</Button>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3"><Tag className="h-6 w-6 text-yellow-600" /><h3 className="font-semibold text-slate-200">Special Offers</h3></div>
                <p className="text-sm text-slate-400">Get up to 20% off on healthcare products. Use code: <span className="font-bold text-yellow-500">HEALTH20</span></p>
            </Card>
            
            <Card className="bg-slate-900 border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3"><Truck className="h-6 w-6 text-blue-500" /><h3 className="font-semibold text-slate-200">Delivery Information</h3></div>
                <p className="text-sm text-slate-400">Enjoy fast and reliable delivery to your doorstep. Standard delivery within 24-48 hours.</p>
            </Card>
          </aside>
        </div>
      </div>

      <footer className="w-full border-t border-slate-800 mt-10">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between p-6 text-sm text-slate-500">
            <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} HealthApp. All Rights Reserved.</p>
            <div className="flex space-x-4"><a href="#" className="hover:text-slate-300">Privacy Policy</a><a href="#" className="hover:text-slate-300">Terms of Service</a></div>
        </div>
      </footer>
    </div>
  );
};

export default Pharmacy;

