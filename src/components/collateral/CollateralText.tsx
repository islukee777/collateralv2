
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Bold, Underline, HighlighterIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { HexColorPicker } from "react-colorful";

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

interface CollateralTextProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

const CollateralText = ({ settings, updateSettings }: CollateralTextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState(settings.fontFamily);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  useEffect(() => {
    // Update the selected font when settings change
    setSelectedFont(settings.fontFamily);
  }, [settings.fontFamily]);

  const handleActionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ actionText: e.target.value });
  };

  const handleFontChange = (fontValue: string) => {
    console.log("Setting font to:", fontValue);
    updateSettings({ fontFamily: fontValue });
    setSelectedFont(fontValue);
    setIsOpen(false);
  };

  const updateFontSize = (key: keyof typeof settings.fontSize, value: number) => {
    // Ensure action text is at least 30px
    const finalValue = key === 'actionText' ? Math.max(value, 30) : value;
    
    updateSettings({
      fontSize: {
        ...settings.fontSize,
        [key]: finalValue
      }
    });
  };

  // Text style handlers
  const toggleBold = () => {
    updateSettings({
      textStyle: {
        ...settings.textStyle,
        bold: !settings.textStyle.bold
      }
    });
  };

  const toggleUnderline = () => {
    updateSettings({
      textStyle: {
        ...settings.textStyle,
        underline: !settings.textStyle.underline
      }
    });
  };

  const toggleHighlight = () => {
    updateSettings({
      textStyle: {
        ...settings.textStyle,
        highlight: !settings.textStyle.highlight
      }
    });
  };

  const updateHighlightColor = (color: string) => {
    updateSettings({
      textStyle: {
        ...settings.textStyle,
        highlightColor: color
      }
    });
  };

  // Extended font list (50+ fonts)
  const fonts = [
    { name: "Poppins", value: "'Poppins', sans-serif" },
    { name: "Inter", value: "'Inter', sans-serif" },
    { name: "Playfair Display", value: "'Playfair Display', serif" },
    { name: "Montserrat", value: "'Montserrat', sans-serif" },
    { name: "Roboto", value: "'Roboto', sans-serif" },
    { name: "Lora", value: "'Lora', serif" },
    { name: "Merriweather", value: "'Merriweather', serif" },
    { name: "Oswald", value: "'Oswald', sans-serif" },
    { name: "Raleway", value: "'Raleway', sans-serif" },
    { name: "Source Sans Pro", value: "'Source Sans Pro', sans-serif" },
    { name: "Arial", value: "Arial, sans-serif" },
    { name: "Times New Roman", value: "'Times New Roman', serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Verdana", value: "Verdana, sans-serif" },
    { name: "Courier New", value: "'Courier New', monospace" },
    { name: "Tahoma", value: "Tahoma, sans-serif" },
    { name: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
    { name: "Comic Sans MS", value: "'Comic Sans MS', cursive" },
    { name: "Impact", value: "Impact, sans-serif" },
    { name: "Garamond", value: "Garamond, serif" },
    { name: "Palatino", value: "'Palatino Linotype', serif" },
    { name: "Lucida Sans", value: "'Lucida Sans Unicode', sans-serif" },
    { name: "Helvetica", value: "Helvetica, Arial, sans-serif" },
    { name: "Century Gothic", value: "'Century Gothic', sans-serif" },
    { name: "Bookman", value: "'Bookman Old Style', serif" },
    { name: "Avant Garde", value: "'Avant Garde', sans-serif" },
    { name: "Calibri", value: "Calibri, sans-serif" },
    { name: "Cambria", value: "Cambria, serif" },
    { name: "Franklin Gothic", value: "'Franklin Gothic Medium', sans-serif" },
    { name: "Futura", value: "Futura, sans-serif" },
    { name: "Geneva", value: "Geneva, sans-serif" },
    { name: "Gill Sans", value: "'Gill Sans', sans-serif" },
    { name: "Optima", value: "Optima, sans-serif" },
    { name: "Segoe UI", value: "'Segoe UI', sans-serif" },
    { name: "Brush Script MT", value: "'Brush Script MT', cursive" },
    { name: "Rockwell", value: "Rockwell, serif" },
    { name: "Copperplate", value: "Copperplate, serif" },
    { name: "Baskerville", value: "Baskerville, serif" },
    { name: "Didot", value: "Didot, serif" },
    { name: "American Typewriter", value: "'American Typewriter', serif" },
    { name: "Garet", value: "'Montserrat', sans-serif" }, // Approximation
    { name: "Alice", value: "'Playfair Display', serif" }, // Approximation
    { name: "Open Sauce", value: "'Poppins', sans-serif" }, // Approximation
    { name: "Brittany", value: "'Playfair Display', serif" }, // Approximation (script font)
    { name: "GAGALIN", value: "'Impact', sans-serif" }, // Approximation (display font)
    { name: "The Seasons", value: "'Garamond', serif" }, // Approximation
    { name: "Shrikhand", value: "'Impact', cursive" }, // Approximation
    { name: "Agrandir", value: "'Century Gothic', sans-serif" }, // Approximation
    { name: "BEBAS NEUE", value: "'Oswald', sans-serif" }, // Approximation
    { name: "HORIZON", value: "'Impact', sans-serif" }, // Approximation
    { name: "Etna Sans Serif", value: "'Helvetica', sans-serif" }, // Approximation
    { name: "Fredoka", value: "'Comic Sans MS', sans-serif" }, // Approximation
    { name: "CINZEL DECORATIVE", value: "'Times New Roman', serif" }, // Approximation
    { name: "Cinzel", value: "'Times New Roman', serif" }, // Approximation
    { name: "Noto Serif Ethiopic", value: "'Times New Roman', serif" }, // Approximation
  ];

  return (
    <div className="space-y-6 text-white">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Text Content</h3>
        
        <div className="space-y-2">
          <Label htmlFor="action-text">Action Text</Label>
          <Input 
            id="action-text"
            value={settings.actionText}
            onChange={handleActionTextChange}
            placeholder="e.g. scan, order, pay"
            className="bg-white/10 text-white"
          />
          <p className="text-xs text-gray-400 mt-1">
            This is the text that instructs customers what to do with the QR code.
          </p>
        </div>

        <div className="space-y-2 pt-3">
          <Label htmlFor="font-family">Font Style</Label>
          <div className="relative">
            <button
              type="button"
              className="flex w-full justify-between items-center rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center">
                <span className="mr-2">Font:</span>
                <span style={{ fontFamily: selectedFont }}>
                  {fonts.find(f => f.value === selectedFont)?.name || "Poppins"}
                </span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
              <div className="absolute z-10 mt-1 w-full max-h-80 overflow-auto rounded-md border border-white/20 bg-darkgreen/90 text-white shadow-md">
                <ScrollArea className="max-h-80">
                  <div className="p-1">
                    {fonts.map((font) => (
                      <button
                        key={font.value}
                        className={`flex w-full items-center rounded-sm px-3 py-2 text-sm hover:bg-white/10 ${
                          selectedFont === font.value ? 'bg-white/20' : ''
                        }`}
                        onClick={() => handleFontChange(font.value)}
                      >
                        <div 
                          className="w-full flex items-center justify-between"
                          style={{ fontFamily: font.value }}
                        >
                          <span>{font.name}</span>
                          <span className="text-base">Scan, Order & Pay</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>

        {/* Text Style Options */}
        <div className="space-y-4 pt-4">
          <Label>Text Styling</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 rounded-md border border-white/20 bg-white/10 p-3">
              <div className="flex items-center space-x-2">
                <Bold className="h-5 w-5" />
                <span>Bold</span>
              </div>
              <Switch 
                checked={settings.textStyle.bold} 
                onCheckedChange={toggleBold}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2 rounded-md border border-white/20 bg-white/10 p-3">
              <div className="flex items-center space-x-2">
                <Underline className="h-5 w-5" />
                <span>Underline</span>
              </div>
              <Switch 
                checked={settings.textStyle.underline} 
                onCheckedChange={toggleUnderline}
              />
            </div>
            
            <div className="col-span-2 flex items-center justify-between space-x-2 rounded-md border border-white/20 bg-white/10 p-3">
              <div className="flex items-center space-x-2">
                <HighlighterIcon className="h-5 w-5" />
                <span>Highlight</span>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded-full cursor-pointer border border-white/20"
                  style={{ backgroundColor: settings.textStyle.highlightColor }}
                  onClick={() => setShowHighlightPicker(!showHighlightPicker)}
                ></div>
                <Switch 
                  checked={settings.textStyle.highlight} 
                  onCheckedChange={toggleHighlight}
                />
              </div>
            </div>

            {showHighlightPicker && (
              <div className="col-span-2 p-3 border border-white/20 rounded-md bg-white/10">
                <Label className="mb-2 block">Highlight Color</Label>
                <div className="my-2">
                  <HexColorPicker 
                    color={settings.textStyle.highlightColor} 
                    onChange={updateHighlightColor} 
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowHighlightPicker(false)}
                    className="bg-darkgreen text-white border-white/20 hover:bg-white/10"
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center">
              <div className="mr-4 bg-white/10 rounded-md p-2 text-2xl"
                  style={{ fontFamily: selectedFont }}>
                23
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Fixed Table Number</h4>
                <p className="text-xs text-gray-400">Table numbers will be automatically generated during the order process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-lg font-medium">Font Sizes</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="table-number-size">Table Number</Label>
            <span className="text-sm text-gray-400">{settings.fontSize.tableNumber}px</span>
          </div>
          <Slider
            id="table-number-size"
            min={24}
            max={72}
            step={1}
            value={[settings.fontSize.tableNumber]}
            onValueChange={(value) => updateFontSize('tableNumber', value[0])}
            className="py-2"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="action-text-size">Action Text</Label>
            <span className="text-sm text-gray-400">{settings.fontSize.actionText}px</span>
          </div>
          <Slider
            id="action-text-size"
            min={30}
            max={48}
            step={1}
            value={[settings.fontSize.actionText]}
            onValueChange={(value) => updateFontSize('actionText', value[0])}
            className="py-2"
          />
          <p className="text-xs text-gray-400">Minimum size: 30px for better readability</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-md font-medium mb-2">Text & Font Tips</h4>
        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
          <li>Choose fonts that match your brand personality</li>
          <li>Sans-serif fonts are generally more modern and clean</li>
          <li>Serif fonts add a classic, sophisticated touch</li>
          <li>Keep action text clear and concise</li>
          <li>Make sure text is large enough to read from a distance</li>
          <li>Bold text can help with visibility in bright environments</li>
          <li>Highlighting can add visual emphasis to important information</li>
        </ul>
      </div>
    </div>
  );
};

export default CollateralText;
