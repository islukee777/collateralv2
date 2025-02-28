import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  ChevronLeft, 
  Check, 
  Save, 
  Layers, 
  Image as ImageIcon, 
  Type, 
  Palette,
  Sparkles
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import CollateralPreview from "@/components/collateral/CollateralPreview";
import CollateralColorPicker from "@/components/collateral/CollateralColorPicker";
import CollateralLogo from "@/components/collateral/CollateralLogo";
import CollateralText from "@/components/collateral/CollateralText";
import CollateralLayout from "@/components/collateral/CollateralLayout";
import CollateralPatterns from "@/components/collateral/CollateralPatterns";
import OrderForm from "@/components/order/OrderForm";

// Define the CollateralSettings interface
interface CollateralSettings {
  backgroundColor: string;
  textColor: string;
  tableNumber: string;
  actionText: string;
  venueName: string;
  qrValue: string;
  logoUrl: string | null;
  backgroundImageUrl: string | null;
  backgroundOpacity: number;
  layout: string;
  shape: "rectangle" | "square" | "circle";
  pattern: string;
  fontFamily: string;
  textStyle: {
    bold: boolean;
    underline: boolean;
    highlight: boolean;
    highlightColor: string;
  };
  icons: {
    coffee: boolean;
    face: boolean;
    flower: boolean;
    wineglass: boolean;
    plate: boolean;
    cocktail: boolean;
  };
  cornerRadius: number;
  fontSize: {
    tableNumber: number;
    actionText: number;
    venueName: number;
  };
}

// Default collateral settings
const defaultSettings: CollateralSettings = {
  backgroundColor: "#D8465E",
  textColor: "#FFFFFF",
  tableNumber: "100",
  actionText: "Scan, Order & Pay",
  venueName: "",
  qrValue: "https://meand.u/demo",
  logoUrl: null,
  backgroundImageUrl: null,
  backgroundOpacity: 1.0,
  layout: "standard",
  shape: "rectangle",
  pattern: "waves",
  fontFamily: "'Poppins', sans-serif",
  textStyle: {
    bold: false,
    underline: false,
    highlight: false,
    highlightColor: "#c8ff00"
  },
  icons: {
    coffee: false,
    face: false,
    flower: false,
    wineglass: false,
    plate: false,
    cocktail: false
  },
  cornerRadius: 20,
  fontSize: {
    tableNumber: 48,
    actionText: 30,
    venueName: 20
  }
};

const Design = () => {
  const [settings, setSettings] = useState<CollateralSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState("layout");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Update settings handler
  const updateSettings = (updates: Partial<CollateralSettings>) => {
    console.log("Updating settings:", updates);
    setSettings(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Handle next steps
  const handleNextSteps = () => {
    setShowOrderForm(true);
  };

  // Handle going back to design
  const handleBackToDesign = () => {
    setShowOrderForm(false);
  };

  // Handle order completion
  const handleOrderComplete = () => {
    toast({
      title: "Order Successful",
      description: "Your collaterals have been ordered! You will receive a confirmation email shortly.",
      variant: "default",
    });
    
    // Navigate back to home or to a confirmation page
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Add Poppins font to the document
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

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
            <span className="text-xl font-semibold tracking-tight text-white">Collaterals Designer</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Side - Collateral Preview */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto bg-white/50 rounded-3xl p-8 premium-shadow overflow-visible">
              <CollateralPreview settings={settings} />
            </div>
          </div>
          
          {/* Right Side - Customization Tools or Order Form */}
          {showOrderForm ? (
            <OrderForm onBack={handleBackToDesign} onComplete={handleOrderComplete} />
          ) : (
            <div className="bg-white/5 rounded-3xl p-6 premium-shadow">
              <h2 className="text-2xl font-bold text-white mb-6">Customize Your Collateral</h2>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 mb-6 bg-white/10 p-1 rounded-full">
                  <TabsTrigger value="layout" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">
                    <Layers className="mr-2 h-4 w-4" />
                    Layout
                  </TabsTrigger>
                  <TabsTrigger value="colors" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">
                    <Palette className="mr-2 h-4 w-4" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="text" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">
                    <Type className="mr-2 h-4 w-4" />
                    Text & Font
                  </TabsTrigger>
                  <TabsTrigger value="patterns" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Patterns
                  </TabsTrigger>
                  <TabsTrigger value="logo" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Logo
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="layout">
                  <CollateralLayout settings={settings} updateSettings={updateSettings} />
                </TabsContent>
                
                <TabsContent value="colors">
                  <CollateralColorPicker settings={settings} updateSettings={updateSettings} />
                </TabsContent>
                
                <TabsContent value="text">
                  <CollateralText settings={settings} updateSettings={updateSettings} />
                </TabsContent>
                
                <TabsContent value="patterns">
                  <CollateralPatterns settings={settings} updateSettings={updateSettings} />
                </TabsContent>
                
                <TabsContent value="logo">
                  <CollateralLogo settings={settings} updateSettings={updateSettings} />
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end mt-8 pt-4 border-t border-white/10">              
                <button onClick={handleNextSteps} className="meandu-button">
                  Next Steps
                  <Check className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} me&u. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Design;