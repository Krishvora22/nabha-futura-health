import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pill, Search, Upload, ShoppingCart, History, Info, Bell } from "lucide-react";

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
  ];

  const categories = ["all", "Tablet", "Capsule", "Syrup", "Injection"];

  // Updated badge function for the new theme
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
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button onClick={() => navigate('/home')} variant="outline" size="icon" className="bg-slate-900 border-slate-700 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-slate-50">Pharmacy</h1>
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
              <Pill className="h-5 w-5 text-green-500"/>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by medicine or generic name..."
              className="w-full bg-slate-800 border-slate-700 rounded-full h-12 pl-12 pr-4 text-slate-200 placeholder:text-slate-500"
            />
          </div>
        </header>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Prescription Notice */}
        <Card className="bg-slate-900 border-slate-800 p-4 mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-100">Have a Prescription?</p>
            <p className="text-sm text-slate-400">Upload it here for a quick order.</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold h-10 px-4 rounded-lg">
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </Card>

        {/* Medicines List */}
        <div className="space-y-4">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-50">{medicine.name}</h3>
                    {medicine.prescription && <Badge variant="outline" className="border-amber-500 text-amber-500 bg-amber-950">Rx</Badge>}
                  </div>
                  <p className="text-sm text-slate-400">{medicine.manufacturer}</p>
                </div>
                {getStockBadge(medicine.stock)}
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold text-green-400">₹{medicine.price}</p>
                <p className="text-sm text-slate-500">{medicine.type}</p>
              </div>

              <div className="flex space-x-3">
                {medicine.stock > 0 ? (
                  <>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-lg bg-slate-800 border-slate-700 hover:bg-slate-700">
                      <Info className="h-5 w-5 text-slate-400" />
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="flex-1 bg-slate-800 border-slate-700 hover:bg-slate-700 rounded-lg">
                    <Bell className="mr-2 h-4 w-4"/> Notify Me
                  </Button>
                )}
              </div>
              
              {medicine.alternatives && medicine.stock === 0 && (
                <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-slate-400 mb-2">Available Alternatives:</p>
                  <div className="flex flex-wrap gap-2">
                    {medicine.alternatives.map((alt) => (
                      <button key={alt} className="text-xs bg-slate-700 text-slate-200 px-3 py-1 rounded-full hover:bg-slate-600">
                        {alt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-900 border-slate-800 p-3 mt-6">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700 h-12">
              <ShoppingCart className="mr-2 h-4 w-4"/> View Cart
            </Button>
            <Button variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700 h-12">
              <History className="mr-2 h-4 w-4"/> Order History
            </Button>
          </div>
        </Card>

        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default Pharmacy;