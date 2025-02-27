
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartDesigning = () => {
    navigate("/design");
    
    toast({
      title: "Welcome to the Designer!",
      description: "Let's create your perfect QR code collaterals.",
      duration: 5000,
    });
  };

  const brands = [
    "Felons", "Hawkers Brewing Co", "Little Creatures", "The Rowing Pavilion",
    "Pubs & Bars", "Balter", "Boundary Island", "Brewdog", "The Breakfast Pavilion",
    "Restaurants", "Dainty Sichuan", "Fonda", "Hubert Estate", "Merivale"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-darkgreen">
      {/* Header */}
      <header className="w-full border-b border-white/10 bg-darkgreen/80 backdrop-blur-md sticky top-0 z-50 premium-shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/meandu-logo-white.svg" 
              alt="me&u Logo" 
              className="me-and-u-logo h-8"
            />
            <span className="text-xl font-semibold tracking-tight text-white">Collaterals Customizer</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl animate-fade-in">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                <span className="italic font-serif">Hospitality</span> QR code tools
              </h1>
              <p className="text-gray-200 max-w-2xl mx-auto text-lg">
                Create beautiful, branded QR codes for your venue in minutes. 
                Customize your design and place your order all in one place.
              </p>
              
              <div className="mt-12">
                <button 
                  onClick={handleStartDesigning}
                  className="meandu-button text-lg py-4 px-8"
                >
                  Let's Design <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="rounded-image-container mt-16 mb-24 aspect-[16/9] max-w-3xl mx-auto overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=2070&auto=format&fit=crop" 
                alt="Restaurant Experience" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Brands Section */}
          <div className="mt-24 mb-12">
            <h3 className="text-center text-lg text-gray-400 mb-8">Trusted by top hospitality venues</h3>
            <div className="brands-section overflow-hidden">
              <div className="brands-ticker">
                {brands.map((brand, index) => (
                  <div key={index} className="flex-shrink-0 px-6 py-2">
                    <span className={index % 2 === 0 ? "bg-meandubrand text-darkgreen px-4 py-1 rounded-full text-sm font-semibold" : "text-white text-sm font-medium"}>
                      {brand}
                    </span>
                  </div>
                ))}
                {brands.map((brand, index) => (
                  <div key={`repeat-${index}`} className="flex-shrink-0 px-6 py-2">
                    <span className={index % 2 === 0 ? "bg-meandubrand text-darkgreen px-4 py-1 rounded-full text-sm font-semibold" : "text-white text-sm font-medium"}>
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} me&u. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
