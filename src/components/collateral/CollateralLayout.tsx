
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface CollateralLayoutProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

const CollateralLayout = ({ settings, updateSettings }: CollateralLayoutProps) => {
  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          updateSettings({ 
            backgroundImageUrl: event.target.result as string,
            backgroundOpacity: 1.0 
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ backgroundOpacity: parseFloat(e.target.value) });
  };

  const removeBackgroundImage = () => {
    updateSettings({ backgroundImageUrl: null });
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h3 className="text-lg font-medium mb-4">Layout Style</h3>
        <RadioGroup 
          value={settings.layout}
          onValueChange={(value) => updateSettings({ layout: value })}
          className="grid grid-cols-3 gap-4"
        >
          <Label 
            htmlFor="layout-standard" 
            className="cursor-pointer"
          >
            <Card className={`border-2 transition-all ${settings.layout === 'standard' ? 'border-meandubrand' : 'border-transparent'} hover:border-meandubrand/70 bg-white/10`}>
              <CardContent className="p-4 flex flex-col items-center">
                <div className="w-full aspect-[3/4] bg-white/20 rounded-lg mb-3 flex flex-col justify-between p-2">
                  <div className="w-full flex justify-between">
                    <div className="h-2 w-8 bg-white/30 rounded-full"></div>
                    <div className="h-4 w-4 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="w-full h-16 bg-white/30 rounded-lg mx-auto my-1"></div>
                  <div className="w-full h-2 bg-white/30 rounded-full"></div>
                </div>
                <RadioGroupItem value="standard" id="layout-standard" className="sr-only" />
                <span className="text-sm text-white">Standard</span>
              </CardContent>
            </Card>
          </Label>
          
          <Label 
            htmlFor="layout-compact" 
            className="cursor-pointer"
          >
            <Card className={`border-2 transition-all ${settings.layout === 'compact' ? 'border-meandubrand' : 'border-transparent'} hover:border-meandubrand/70 bg-white/10`}>
              <CardContent className="p-4 flex flex-col items-center">
                <div className="w-full aspect-[3/4] bg-white/20 rounded-lg mb-3 flex flex-col p-2">
                  <div className="w-full flex justify-end">
                    <div className="h-3 w-3 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="w-full h-4 bg-white/30 rounded-full mt-1"></div>
                  <div className="w-full h-12 bg-white/30 rounded-lg mx-auto my-1"></div>
                  <div className="w-full h-2 bg-white/30 rounded-full mt-auto"></div>
                </div>
                <RadioGroupItem value="compact" id="layout-compact" className="sr-only" />
                <span className="text-sm text-white">Compact</span>
              </CardContent>
            </Card>
          </Label>
          
          <Label 
            htmlFor="layout-centered" 
            className="cursor-pointer"
          >
            <Card className={`border-2 transition-all ${settings.layout === 'centered' ? 'border-meandubrand' : 'border-transparent'} hover:border-meandubrand/70 bg-white/10`}>
              <CardContent className="p-4 flex flex-col items-center">
                <div className="w-full aspect-[3/4] bg-white/20 rounded-lg mb-3 flex flex-col items-center justify-between p-2">
                  <div className="h-3 w-6 bg-white/30 rounded-full"></div>
                  <div className="h-4 w-12 bg-white/30 rounded-full"></div>
                  <div className="w-12 h-12 bg-white/30 rounded-lg"></div>
                  <div className="h-2 w-12 bg-white/30 rounded-full"></div>
                </div>
                <RadioGroupItem value="centered" id="layout-centered" className="sr-only" />
                <span className="text-sm text-white">Centered</span>
              </CardContent>
            </Card>
          </Label>
        </RadioGroup>
      </div>
      
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-lg font-medium">Background Image</h3>
        <p className="text-sm text-gray-400 mb-4">Add a custom background image to your collateral</p>
        
        <div className="space-y-4">
          <Label htmlFor="background-upload">Upload Background Image</Label>
          <div className="flex items-center space-x-4">
            <input
              id="background-upload"
              type="file"
              accept="image/*"
              onChange={handleBackgroundImageUpload}
              className="hidden"
            />
            <label 
              htmlFor="background-upload" 
              className="px-4 py-2 bg-white/10 rounded-md border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
            >
              Choose Image
            </label>
            
            {settings.backgroundImageUrl && (
              <button
                onClick={removeBackgroundImage}
                className="px-4 py-2 bg-red-500/20 text-red-300 rounded-md border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                Remove Image
              </button>
            )}
          </div>
          
          {settings.backgroundImageUrl && (
            <div className="space-y-2">
              <Label htmlFor="background-opacity">Background Opacity</Label>
              <div className="flex items-center space-x-2">
                <input
                  id="background-opacity"
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={settings.backgroundOpacity}
                  onChange={handleOpacityChange}
                  className="w-full"
                />
                <span className="w-12 text-right">{Math.round(settings.backgroundOpacity * 100)}%</span>
              </div>
              
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-sm font-medium mb-2">Background Preview</h4>
                <div className="aspect-video w-full max-w-[200px] rounded-md overflow-hidden">
                  <img 
                    src={settings.backgroundImageUrl} 
                    alt="Background Preview" 
                    className="w-full h-full object-cover"
                    style={{ opacity: settings.backgroundOpacity }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-md font-medium mb-2">Layout Tips</h4>
        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
          <li>Standard layout works well for most venues</li>
          <li>Compact layout is ideal for smaller tables</li>
          <li>Centered layout provides a more symmetrical design</li>
          <li>Background images work best with reduced opacity to ensure text remains readable</li>
        </ul>
      </div>
    </div>
  );
};

export default CollateralLayout;
