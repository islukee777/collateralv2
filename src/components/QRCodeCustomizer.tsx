
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, Upload, Download, Check, ArrowRight } from "lucide-react";
import TemplateSelector from "./customizer/TemplateSelector";
import ColorCustomizer from "./customizer/ColorCustomizer";
import LogoUploader from "./customizer/LogoUploader";
import QRPreview from "./customizer/QRPreview";
import { useIsMobile } from "@/hooks/use-mobile";

// Define available templates
const TEMPLATES = [
  { id: "template1", name: "Classic", imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXIlMjBwZXJzb258ZW58MHx8MHx8fDA%3D" },
  { id: "template2", name: "Modern", imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcHV0ZXIlMjBjb2RlfGVufDB8fDB8fHww" },
  { id: "template3", name: "Minimal", imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBwZXJzb258ZW58MHx8MHx8fDA%3D" },
  { id: "template4", name: "Bold", imageSrc: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29tcHV0ZXIlMjBjb2RlfGVufDB8fDB8fHww" },
];

// Define available color schemes
const COLOR_SCHEMES = [
  { id: "scheme1", primary: "#c8ff00", secondary: "#101820", accent: "#ffffff" },
  { id: "scheme2", primary: "#ff5a5f", secondary: "#484848", accent: "#ffffff" },
  { id: "scheme3", primary: "#00a699", secondary: "#2d3e4e", accent: "#f5f5f5" },
  { id: "scheme4", primary: "#7848f4", secondary: "#2b2a35", accent: "#f7f7f7" },
  { id: "scheme5", primary: "#ff9900", secondary: "#232f3e", accent: "#ffffff" },
  { id: "scheme6", primary: "#1db954", secondary: "#191414", accent: "#ffffff" },
];

interface VenueDetails {
  venueName: string;
  tableCount: number;
  duplicates: boolean;
}

interface QRCodeCustomizerProps {
  venueDetails: VenueDetails;
  onBack: () => void;
}

const QRCodeCustomizer = ({ venueDetails, onBack }: QRCodeCustomizerProps) => {
  const [activeTab, setActiveTab] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [selectedColorScheme, setSelectedColorScheme] = useState(COLOR_SCHEMES[0]);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("https://meand.u/demo");
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Generate a dummy QR code URL based on venue name
  useEffect(() => {
    const sanitizedName = venueDetails.venueName.toLowerCase().replace(/\s+/g, '-');
    setQrCodeUrl(`https://meand.u/${sanitizedName}`);
  }, [venueDetails.venueName]);

  const handleTemplateSelect = (template: typeof TEMPLATES[0]) => {
    setSelectedTemplate(template);
    toast({
      title: "Template Updated",
      description: `You've selected the ${template.name} template.`,
      duration: 2000,
    });
  };

  const handleColorSchemeSelect = (scheme: typeof COLOR_SCHEMES[0]) => {
    setSelectedColorScheme(scheme);
    toast({
      title: "Colors Updated",
      description: "Your color scheme has been updated.",
      duration: 2000,
    });
  };

  const handleLogoUpload = (imageUrl: string) => {
    setLogoImage(imageUrl);
    toast({
      title: "Logo Uploaded",
      description: "Your logo has been added to the design.",
      duration: 2000,
    });
  };

  const handleNextStep = () => {
    if (activeTab === "template") {
      setActiveTab("colors");
    } else if (activeTab === "colors") {
      setActiveTab("logo");
    } else if (activeTab === "logo") {
      // Handle order process
      toast({
        title: "Order Placed!",
        description: `Your order for ${venueDetails.tableCount} QR code collaterals has been placed.`,
        variant: "default",
      });
    }
  };

  const handlePreviousStep = () => {
    if (activeTab === "colors") {
      setActiveTab("template");
    } else if (activeTab === "logo") {
      setActiveTab("colors");
    }
  };

  const isLastStep = activeTab === "logo";
  const isFirstStep = activeTab === "template";

  const renderMobileLayout = () => (
    <div className="flex flex-col w-full space-y-6">
      <div className="bg-white rounded-3xl p-6 premium-shadow animate-fade-in">
        <QRPreview 
          template={selectedTemplate}
          colorScheme={selectedColorScheme}
          logoUrl={logoImage}
          venueName={venueDetails.venueName}
          qrCodeUrl={qrCodeUrl}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in">
        <TabsList className="grid grid-cols-3 mb-6 bg-white/10 p-1 rounded-full">
          <TabsTrigger value="template" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">Template</TabsTrigger>
          <TabsTrigger value="colors" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">Colors</TabsTrigger>
          <TabsTrigger value="logo" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">Logo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="template">
          <TemplateSelector 
            templates={TEMPLATES} 
            selectedTemplate={selectedTemplate} 
            onSelect={handleTemplateSelect}
          />
        </TabsContent>
        
        <TabsContent value="colors">
          <ColorCustomizer 
            colorSchemes={COLOR_SCHEMES} 
            selectedScheme={selectedColorScheme}
            onSelect={handleColorSchemeSelect}
          />
        </TabsContent>
        
        <TabsContent value="logo">
          <LogoUploader onUpload={handleLogoUpload} currentLogo={logoImage} />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between pt-4">
        {!isFirstStep ? (
          <Button 
            variant="outline" 
            onClick={handlePreviousStep} 
            size="lg"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Back
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={onBack} 
            size="lg"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Start Over
          </Button>
        )}
        
        <button onClick={handleNextStep} className="meandu-button">
          {isLastStep ? (
            <>
              Place Order
              <Check className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderDesktopLayout = () => (
    <div className="grid grid-cols-2 gap-10 w-full">
      {/* Preview Pane - Left Side */}
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl p-8 premium-shadow qr-preview-shadow w-full max-w-md mx-auto animate-fade-in">
          <QRPreview 
            template={selectedTemplate}
            colorScheme={selectedColorScheme}
            logoUrl={logoImage}
            venueName={venueDetails.venueName}
            qrCodeUrl={qrCodeUrl}
          />
        </div>
      </div>
      
      {/* Customization Tools - Right Side */}
      <div className="animate-slide-in">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-white/10 p-1 rounded-full">
            <TabsTrigger value="template" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">Template</TabsTrigger>
            <TabsTrigger value="colors" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">Colors</TabsTrigger>
            <TabsTrigger value="logo" className="rounded-full data-[state=active]:bg-meandubrand data-[state=active]:text-darkgreen">Logo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="template">
            <TemplateSelector 
              templates={TEMPLATES} 
              selectedTemplate={selectedTemplate} 
              onSelect={handleTemplateSelect}
            />
          </TabsContent>
          
          <TabsContent value="colors">
            <ColorCustomizer 
              colorSchemes={COLOR_SCHEMES} 
              selectedScheme={selectedColorScheme}
              onSelect={handleColorSchemeSelect}
            />
          </TabsContent>
          
          <TabsContent value="logo">
            <LogoUploader onUpload={handleLogoUpload} currentLogo={logoImage} />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-8">
          {!isFirstStep ? (
            <Button 
              variant="outline" 
              onClick={handlePreviousStep} 
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Back
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={onBack} 
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Start Over
            </Button>
          )}
          
          <button onClick={handleNextStep} className="meandu-button">
            {isLastStep ? (
              <>
                Place Order
                <Check className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl animate-fade-in">
      <Card className="glass-panel premium-shadow overflow-hidden border-white/10 rounded-3xl">
        <CardContent className="p-6 md:p-8">
          {isMobile ? renderMobileLayout() : renderDesktopLayout()}
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeCustomizer;
