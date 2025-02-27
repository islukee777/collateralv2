
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

interface CollateralSettings {
  backgroundColor: string;
  textColor: string;
  tableNumber: string;
  actionText: string;
  venueName: string;
  qrValue: string;
  logoUrl: string | null;
  layout: string;
  pattern: string;
  fontFamily: string;
  showHandIcon: boolean;
  cornerRadius: number;
  fontSize: {
    tableNumber: number;
    actionText: number;
    venueName: number;
  };
}

interface CollateralFontsProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

const CollateralFonts = ({ settings, updateSettings }: CollateralFontsProps) => {
  // Font options
  const fonts = [
    { name: "Inter", value: "'Inter', sans-serif", type: "Sans-serif" },
    { name: "Playfair Display", value: "'Playfair Display', serif", type: "Serif" },
    { name: "Montserrat", value: "'Montserrat', sans-serif", type: "Sans-serif" },
    { name: "Roboto", value: "'Roboto', sans-serif", type: "Sans-serif" },
    { name: "Lora", value: "'Lora', serif", type: "Serif" },
    { name: "Poppins", value: "'Poppins', sans-serif", type: "Sans-serif" },
    { name: "Merriweather", value: "'Merriweather', serif", type: "Serif" },
    { name: "Oswald", value: "'Oswald', sans-serif", type: "Display" },
    { name: "Raleway", value: "'Raleway', sans-serif", type: "Sans-serif" },
    { name: "Source Sans Pro", value: "'Source Sans Pro', sans-serif", type: "Sans-serif" }
  ];

  // Group fonts by type
  const fontsByType = fonts.reduce((acc, font) => {
    if (!acc[font.type]) {
      acc[font.type] = [];
    }
    acc[font.type].push(font);
    return acc;
  }, {} as Record<string, typeof fonts>);

  return (
    <div className="space-y-6 text-white">
      <div>
        <h3 className="text-lg font-medium mb-4">Font Selection</h3>
        <div className="space-y-6">
          {Object.entries(fontsByType).map(([type, fontsList]) => (
            <div key={type} className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400">{type} Fonts</h4>
              <RadioGroup 
                value={settings.fontFamily}
                onValueChange={(value) => updateSettings({ fontFamily: value })}
                className="grid grid-cols-1 gap-2"
              >
                {fontsList.map((font) => (
                  <div key={font.name} className="flex items-center space-x-2">
                    <RadioGroupItem value={font.value} id={`font-${font.name}`} />
                    <Label 
                      htmlFor={`font-${font.name}`}
                      className="flex-1 cursor-pointer"
                    >
                      <Card className={`border border-white/10 transition-all hover:bg-white/5 ${settings.fontFamily === font.value ? 'border-meandubrand bg-white/5' : ''}`}>
                        <CardContent className="p-4">
                          <div 
                            className="flex justify-between items-center"
                            style={{ fontFamily: font.value }}
                          >
                            <span className="text-lg">{font.name}</span>
                            <span className="text-3xl">23</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-md font-medium mb-2">Font Tips</h4>
        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
          <li>Sans-serif fonts are generally more modern and clean</li>
          <li>Serif fonts add a classic, sophisticated touch</li>
          <li>Choose fonts that match your brand personality</li>
          <li>Ensure your font is easily readable from a distance</li>
        </ul>
      </div>
    </div>
  );
};

export default CollateralFonts;
