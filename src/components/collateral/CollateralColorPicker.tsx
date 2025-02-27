
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wand2 } from "lucide-react";

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

interface CollateralColorPickerProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

const CollateralColorPicker = ({ settings, updateSettings }: CollateralColorPickerProps) => {
  // Predefined color schemes
  const colorSchemes = [
    { name: "Green", background: "#008751", text: "#FFFFFF" },
    { name: "Pink", background: "#FF90B3", text: "#5A2E38" },
    { name: "Orange", background: "#FF9346", text: "#3D2200" },
    { name: "Blue", background: "#00A3D7", text: "#FFFFFF" },
    { name: "Purple", background: "#B01779", text: "#FFFFFF" },
    { name: "Yellow", background: "#F9DF4A", text: "#3C3104" },
    { name: "Navy", background: "#003366", text: "#FFFFFF" },
    { name: "Teal", background: "#008080", text: "#FFFFFF" },
    { name: "Maroon", background: "#800000", text: "#FFFFFF" },
    { name: "Olive", background: "#808000", text: "#FFFFFF" },
    { name: "Cyan", background: "#00FFFF", text: "#003333" },
    { name: "Magenta", background: "#FF00FF", text: "#330033" },
    { name: "Lime", background: "#00FF00", text: "#003300" },
    { name: "Brown", background: "#996633", text: "#FFFFFF" },
    { name: "Slate", background: "#708090", text: "#FFFFFF" },
    { name: "Red", background: "#FF0000", text: "#FFFFFF" },
    { name: "Lavender", background: "#E6E6FA", text: "#333333" },
    { name: "Mint", background: "#98FF98", text: "#006600" },
    { name: "Coral", background: "#FF7F50", text: "#4C2617" },
    { name: "Sky", background: "#87CEEB", text: "#004466" },
  ];

  // Colors for the random generator
  const colorPalettes = [
    { background: "#008751", text: "#FFFFFF", highlight: "#c8ff00" }, // Green with me&u green highlight
    { background: "#FF90B3", text: "#5A2E38", highlight: "#FF64A3" }, // Pink with lighter pink
    { background: "#FF9346", text: "#3D2200", highlight: "#FFC846" }, // Orange with yellow
    { background: "#00A3D7", text: "#FFFFFF", highlight: "#90E0F0" }, // Blue with light blue
    { background: "#B01779", text: "#FFFFFF", highlight: "#FF90FF" }, // Purple with pink
    { background: "#F9DF4A", text: "#3C3104", highlight: "#FFB000" }, // Yellow with orange
    { background: "#4B0082", text: "#FFFFFF", highlight: "#9370DB" }, // Indigo with medium purple
    { background: "#006400", text: "#FFFFFF", highlight: "#32CD32" }, // Dark Green with lime green
    { background: "#8B0000", text: "#FFFFFF", highlight: "#FF6347" }, // Dark Red with tomato
    { background: "#1A1F2C", text: "#FFFFFF", highlight: "#4682B4" }, // Dark Blue with steel blue
    { background: "#228B22", text: "#FFFFFF", highlight: "#7CFC00" }, // Forest Green with lawn green
    { background: "#708090", text: "#FFFFFF", highlight: "#B0C4DE" }, // Slate Gray with light steel blue
    { background: "#000080", text: "#FFFFFF", highlight: "#ADD8E6" }, // Navy with light blue
    { background: "#4682B4", text: "#FFFFFF", highlight: "#87CEEB" }, // Steel Blue with sky blue
    { background: "#D2691E", text: "#FFFFFF", highlight: "#FFD700" }, // Chocolate with gold
    { background: "#C71585", text: "#FFFFFF", highlight: "#FF69B4" }, // Medium Violet Red with hot pink
    { background: "#66CDAA", text: "#333333", highlight: "#20B2AA" }, // Medium Aquamarine with light sea green
    { background: "#7B68EE", text: "#FFFFFF", highlight: "#E6E6FA" }, // Medium Slate Blue with lavender
    { background: "#3CB371", text: "#FFFFFF", highlight: "#98FB98" }, // Medium Sea Green with pale green
    { background: "#BC8F8F", text: "#333333", highlight: "#F4A460" }, // Rosy Brown with sandy brown
    { background: "#F0E68C", text: "#333333", highlight: "#FFDEAD" }, // Khaki with navajo white
    { background: "#E6E6FA", text: "#333333", highlight: "#D8BFD8" }, // Lavender with thistle
    { background: "#FFDAB9", text: "#333333", highlight: "#FFDEAD" }, // Peach Puff with navajo white
    { background: "#B0E0E6", text: "#333333", highlight: "#87CEEB" }, // Powder Blue with sky blue
    { background: "#D8465E", text: "#FFFFFF", highlight: "#c8ff00" }, // Me&u red with me&u green
  ];

  // Custom color picker
  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ backgroundColor: e.target.value });
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ textColor: e.target.value });
  };

  // Random color generator
  const generateRandomColors = () => {
    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    updateSettings({
      backgroundColor: randomPalette.background,
      textColor: randomPalette.text,
      textStyle: {
        ...settings.textStyle,
        highlightColor: randomPalette.highlight
      }
    });
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Color Schemes</h3>
          <Button 
            variant="outline" 
            className="border-meandubrand bg-darkgreen text-meandubrand hover:bg-darkgreen/80"
            onClick={generateRandomColors}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Random Colors
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {colorSchemes.map((scheme, index) => (
            <div 
              key={index}
              className={`rounded-xl transition-all cursor-pointer ${
                settings.backgroundColor === scheme.background ? "ring-2 ring-meandubrand" : ""
              }`}
              onClick={() => updateSettings({
                backgroundColor: scheme.background,
                textColor: scheme.text
              })}
            >
              <div className="text-center space-y-1">
                <div 
                  className="h-12 rounded-xl mb-1"
                  style={{ backgroundColor: scheme.background }}
                >
                </div>
                <span className="text-xs text-white">{scheme.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-lg font-medium mb-4">Custom Colors</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="background-color">Background Color</Label>
              <div className="flex space-x-2">
                <div 
                  className="w-10 h-10 rounded-md border border-white/20"
                  style={{ backgroundColor: settings.backgroundColor }}
                ></div>
                <Input 
                  id="background-color"
                  type="text"
                  value={settings.backgroundColor}
                  onChange={handleBackgroundColorChange}
                  className="flex-1 bg-white/10 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex space-x-2">
                <div 
                  className="w-10 h-10 rounded-md border border-white/20"
                  style={{ backgroundColor: settings.textColor }}
                ></div>
                <Input 
                  id="text-color"
                  type="text"
                  value={settings.textColor}
                  onChange={handleTextColorChange}
                  className="flex-1 bg-white/10 text-white"
                />
              </div>
            </div>

            {settings.textStyle.highlight && (
              <div className="space-y-2">
                <Label htmlFor="highlight-color">Highlight Color</Label>
                <div className="flex space-x-2">
                  <div 
                    className="w-10 h-10 rounded-md border border-white/20"
                    style={{ backgroundColor: settings.textStyle.highlightColor }}
                  ></div>
                  <Input 
                    id="highlight-color"
                    type="text"
                    value={settings.textStyle.highlightColor}
                    onChange={(e) => updateSettings({
                      textStyle: {
                        ...settings.textStyle,
                        highlightColor: e.target.value
                      }
                    })}
                    className="flex-1 bg-white/10 text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-md font-medium mb-2">Color Tips</h4>
        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
          <li>Ensure strong contrast between background and text for readability</li>
          <li>Consider using your brand colors for consistency</li>
          <li>Dark backgrounds with light text are often easier to read</li>
          <li>The Random Colors button generates harmonious color combinations</li>
          <li>Highlight colors should complement your background color</li>
        </ul>
      </div>
    </div>
  );
};

export default CollateralColorPicker;
