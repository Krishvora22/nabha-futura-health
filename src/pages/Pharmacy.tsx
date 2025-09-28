import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
    {
      id: 1,
      name: "Paracetamol 500mg",
      genericName: "Acetaminophen",
      type: "Tablet",
      price: 25,
      stock: 150,
      manufacturer: "Sun Pharma",
      alternatives: ["Crocin", "Dolo 650"],
      prescription: false
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      genericName: "Amoxicillin",
      type: "Capsule",
      price: 85,
      stock: 0,
      manufacturer: "Cipla",
      alternatives: ["Augmentin", "Clavam"],
      prescription: true
    },
    {
      id: 3,
      name: "Cetirizine 10mg",
      genericName: "Cetirizine",
      type: "Tablet",
      price: 45,
      stock: 75,
      manufacturer: "Dr. Reddy's",
      alternatives: ["Zyrtec", "Alerid"],
      prescription: false
    },
    {
      id: 4,
      name: "Metformin 500mg",
      genericName: "Metformin",
      type: "Tablet",
      price: 120,
      stock: 30,
      manufacturer: "Lupin",
      alternatives: ["Glucophage", "Diabex"],
      prescription: true
    }
  ];

  const categories = ["all", "Tablet", "Capsule", "Syrup", "Injection"];

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge className="bg-destructive glow-danger text-destructive-foreground">Out of Stock</Badge>;
    } else if (stock < 50) {
      return <Badge className="bg-yellow-600 glow-warning text-white">Low Stock</Badge>;
    } else {
      return <Badge className="bg-primary glow-success text-primary-foreground">In Stock</Badge>;
    }
  };

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || medicine.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-primary mobile-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-float"></div>
      <div className="absolute top-32 left-5 w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-glow-pulse"></div>

      {/* Header */}
      <div className="relative z-10 mb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-full glass border-primary/30 flex items-center justify-center"
          >
            ←
          </button>
          <h1 className="font-orbitron text-xl font-bold text-foreground">
            Pharmacy
          </h1>
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center glow-primary">
            💊
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicines..."
            className="glass border-primary/30 rounded-2xl pl-12 text-foreground placeholder:text-muted-foreground"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <span className="text-primary">🔍</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="relative z-10 mb-6">
        <div className="flex overflow-x-auto space-x-3 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-2xl border-2 whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category
                  ? 'border-primary glow-primary bg-primary/20 text-foreground'
                  : 'border-border bg-card/50 text-muted-foreground'
              }`}
            >
              {category === 'all' ? 'All Medicines' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Notice */}
      <Card className="glass border-0 p-4 mb-6 animate-scale-in">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🚨</span>
          <div>
            <p className="text-foreground font-medium text-sm">
              Need prescription medicines urgently?
            </p>
            <p className="text-muted-foreground text-xs">
              Upload prescription for quick verification
            </p>
          </div>
          <Button className="ml-auto bg-gradient-primary border-0 rounded-2xl glow-primary text-xs px-3 py-1">
            Upload
          </Button>
        </div>
      </Card>

      {/* Medicines List */}
      <div className="relative z-10 space-y-4">
        {filteredMedicines.map((medicine, index) => (
          <Card
            key={medicine.id}
            className="glass border-0 p-4 animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-foreground">{medicine.name}</h3>
                  {medicine.prescription && (
                    <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">
                      Rx
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
                <p className="text-xs text-muted-foreground">{medicine.manufacturer}</p>
              </div>
              {getStockBadge(medicine.stock)}
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-primary">₹{medicine.price}</div>
                <div className="text-sm text-muted-foreground">{medicine.type}</div>
              </div>
              {medicine.stock > 0 && (
                <div className="text-sm text-foreground">
                  Stock: {medicine.stock}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {medicine.stock > 0 ? (
                <>
                  <Button className="flex-1 bg-gradient-primary border-0 rounded-2xl glow-primary text-sm py-2">
                    🛒 Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 py-2 glass border-primary/30 rounded-2xl text-sm"
                  >
                    ℹ️
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="flex-1 glass border-primary/30 rounded-2xl text-sm py-2"
                >
                  🔔 Notify When Available
                </Button>
              )}
            </div>

            {/* Alternatives */}
            {medicine.alternatives && medicine.stock === 0 && (
              <div className="mt-3 p-3 glass-subtle rounded-2xl animate-slide-in-right">
                <p className="text-xs text-muted-foreground mb-2">Available Alternatives:</p>
                <div className="flex flex-wrap gap-2">
                  {medicine.alternatives.map((alt, idx) => (
                    <button
                      key={idx}
                      className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/30"
                    >
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
      <Card className="glass border-0 p-4 mt-6 animate-slide-in-right">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="glass border-primary/30 rounded-2xl py-3 text-sm">
            🛒 View Cart
          </Button>
          <Button variant="outline" className="glass border-primary/30 rounded-2xl py-3 text-sm">
            📋 Order History
          </Button>
        </div>
      </Card>

      {/* Bottom Space */}
      <div className="h-6"></div>
    </div>
  );
};

export default Pharmacy;