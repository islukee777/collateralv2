import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

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
  tableNumberFont: string;
  actionTextFont: string;
  venueNameFont: string;
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
  tableNumberAlignment: "left" | "center" | "right";
  actionTextAlignment: "left" | "center" | "right";
  venueNameAlignment: "left" | "center" | "right";
}

interface CollateralLayoutProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

const CollateralLayout = ({ settings, updateSettings }: CollateralLayoutProps) => {
  const [isFontOpen, setIsFontOpen] = useState<{ [key: string]: boolean }>({
    tableNumber: false,
    actionText: false,
    venueName: false,
  });

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

  const handleShapeChange = (shape: "rectangle" | "square" | "circle") => {
    updateSettings({ shape });
  };

  const handleFontChange = (component: "tableNumber" | "actionText" | "venueName", fontValue: string) => {
    const fontKey = `${component}Font` as keyof CollateralSettings;
    updateSettings({ [fontKey]: fontValue });
    setIsFontOpen((prev) => ({ ...prev, [component]: false }));
  };

  const updateFontSize = (key: keyof typeof settings.fontSize, value: number) => {
    updateSettings({
      fontSize: {
        ...settings.fontSize,
        [key]: value
      }
    });
  };

  const handleFontSizeInputChange = (key: keyof typeof settings.fontSize, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      updateFontSize(key, numValue);
    }
  };

  const handleFontSizeIncrement = (key: keyof typeof settings.fontSize) => {
    const currentSize = settings.fontSize[key];
    updateFontSize(key, currentSize + 1);
  };

  const handleFontSizeDecrement = (key: keyof typeof settings.fontSize) => {
    const currentSize = settings.fontSize[key];
    updateFontSize(key, currentSize - 1);
  };

  const handleAlignmentChange = (component: "tableNumber" | "actionText" | "venueName", alignment: "left" | "center" | "right") => {
    const alignmentKey = `${component}Alignment` as keyof CollateralSettings;
    updateSettings({ [alignmentKey]: alignment });
  };

  // Updated font list with 111 fonts (94 previous + 17 new)
  const fonts = [
    { name: "Poppins", value: "Poppins" },
    { name: "Inter", value: "Inter" },
    { name: "Playfair Display", value: "Playfair Display" },
    { name: "Montserrat", value: "Montserrat" },
    { name: "Roboto", value: "Roboto" },
    { name: "Lora", value: "Lora" },
    { name: "Merriweather", value: "Merriweather" },
    { name: "Oswald", value: "Oswald" },
    { name: "Raleway", value: "Raleway" },
    { name: "Source Sans Pro", value: "Source Sans Pro" },
    { name: "Arial", value: "Arial" },
    { name: "Times New Roman", value: "Times New Roman" },
    { name: "Georgia", value: "Georgia" },
    { name: "Verdana", value: "Verdana" },
    { name: "Courier New", value: "Courier New" },
    { name: "Tahoma", value: "Tahoma" },
    { name: "Trebuchet MS", value: "Trebuchet MS" },
    { name: "Comic Sans MS", value: "Comic Sans MS" },
    { name: "Impact", value: "Impact" },
    { name: "Garamond", value: "Garamond" },
    { name: "Palatino Linotype", value: "Palatino Linotype" },
    { name: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
    { name: "Helvetica", value: "Helvetica" },
    { name: "Century Gothic", value: "Century Gothic" },
    { name: "Bookman Old Style", value: "Bookman Old Style" },
    { name: "Avant Garde", value: "Avant Garde" },
    { name: "Calibri", value: "Calibri" },
    { name: "Cambria", value: "Cambria" },
    { name: "Franklin Gothic Medium", value: "Franklin Gothic Medium" },
    { name: "Futura", value: "Futura" },
    { name: "Geneva", value: "Geneva" },
    { name: "Gill Sans", value: "Gill Sans" },
    { name: "Optima", value: "Optima" },
    { name: "Segoe UI", value: "Segoe UI" },
    { name: "Brush Script MT", value: "Brush Script MT" },
    { name: "Rockwell", value: "Rockwell" },
    { name: "Copperplate", value: "Copperplate" },
    { name: "Baskerville", value: "Baskerville" },
    { name: "Didot", value: "Didot" },
    { name: "American Typewriter", value: "American Typewriter" },
    { name: "Open Sans", value: "Open Sans" },
    { name: "Lato", value: "Lato" },
    { name: "Nunito", value: "Nunito" },
    { name: "Roboto Slab", value: "Roboto Slab" },
    { name: "Source Serif Pro", value: "Source Serif Pro" },
    { name: "Fira Sans", value: "Fira Sans" },
    { name: "Work Sans", value: "Work Sans" },
    { name: "Quicksand", value: "Quicksand" },
    { name: "Overpass", value: "Overpass" },
    { name: "Manrope", value: "Manrope" },
    { name: "Rubik", value: "Rubik" },
    { name: "Kumbh Sans", value: "Kumbh Sans" },
    { name: "Jost", value: "Jost" },
    { name: "Sora", value: "Sora" },
    { name: "Red Hat Display", value: "Red Hat Display" },
    { name: "Inter Tight", value: "Inter Tight" },
    { name: "DM Sans", value: "DM Sans" },
    { name: "Space Grotesk", value: "Space Grotesk" },
    { name: "Plus Jakarta Sans", value: "Plus Jakarta Sans" },
    { name: "Exo 2", value: "Exo 2" },
    { name: "Libre Baskerville", value: "Libre Baskerville" },
    { name: "Cormorant", value: "Cormorant" },
    { name: "EB Garamond", value: "EB Garamond" },
    { name: "Crimson Text", value: "Crimson Text" },
    { name: "Arvo", value: "Arvo" },
    { name: "Playfair Display SC", value: "Playfair Display SC" },
    { name: "Josefin Slab", value: "Josefin Slab" },
    { name: "Zilla Slab", value: "Zilla Slab" },
    { name: "Pridi", value: "Pridi" },
    { name: "Noto Serif", value: "Noto Serif" },
    { name: "Spectral", value: "Spectral" },
    { name: "Aleo", value: "Aleo" },
    { name: "Vollkorn", value: "Vollkorn" },
    { name: "Cardo", value: "Cardo" },
    { name: "Trirong", value: "Trirong" },
    { name: "Old Standard TT", value: "Old Standard TT" },
    { name: "Faustina", value: "Faustina" },
    { name: "Amethysta", value: "Amethysta" },
    { name: "Sorts Mill Goudy", value: "Sorts Mill Goudy" },
    { name: "Bebas Neue", value: "Bebas Neue" },
    { name: "Bangers", value: "Bangers" }, // Already in list, keeping for consistency
    { name: "Anton", value: "Anton" },
    { name: "Righteous", value: "Righteous" },
    { name: "Fredoka One", value: "Fredoka One" },
    { name: "Pacifico", value: "Pacifico" },
    { name: "Lobster", value: "Lobster" },
    { name: "Dancing Script", value: "Dancing Script" },
    { name: "Caveat", value: "Caveat" },
    { name: "Special Elite", value: "Special Elite" },
    { name: "Press Start 2P", value: "Press Start 2P" },
    { name: "Monoton", value: "Monoton" },
    { name: "Black Ops One", value: "Black Ops One" },
    { name: "Creepster", value: "Creepster" },
    { name: "Nosifer", value: "Nosifer" },
    { name: "Faster One", value: "Faster One" },
    { name: "Pirata One", value: "Pirata One" },
    { name: "Ultra", value: "Ultra" },
    { name: "Orbitron", value: "Orbitron" },
    { name: "Bungee", value: "Bungee" },
    // New fonts added
    { name: "Afacad Flux Bold", value: "Afacad Flux Bold" },
    { name: "Afacad Flux", value: "Afacad Flux" },
    { name: "Atkinson Hyperlegible Mono Bold", value: "Atkinson Hyperlegible Mono Bold" },
    { name: "Atkinson Hyperlegible Mono", value: "Atkinson Hyperlegible Mono" },
    { name: "Borel", value: "Borel" },
    { name: "Cherry Cream Soda", value: "Cherry Cream Soda" },
    { name: "Chewy", value: "Chewy" },
    { name: "Edu AU VIC WANT Hand Bold", value: "Edu AU VIC WANT Hand Bold" },
    { name: "Edu AU VIC WANT Hand", value: "Edu AU VIC WANT Hand" },
    { name: "Fugaz One", value: "Fugaz One" },
    { name: "Indie Flower", value: "Indie Flower" },
    { name: "Noto Sans Warang Citi", value: "Noto Sans Warang Citi" },
    { name: "Poiret One", value: "Poiret One" },
    { name: "Short Stack", value: "Short Stack" },
    { name: "Sour Gummy Italic", value: "Sour Gummy Italic" },
    { name: "Sour Gummy", value: "Sour Gummy" },
  ];

  return (
    <div className="space-y-6 text-white">
      {/* Shape Selection Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Shape</h3>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant={settings.shape === "rectangle" ? "default" : "outline"}
            className={`w-full rounded-xl ${
              settings.shape === "rectangle"
                ? "bg-meandubrand text-darkgreen"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
            onClick={() => handleShapeChange("rectangle")}
          >
            Rectangle
          </Button>
          <Button
            variant={settings.shape === "square" ? "default" : "outline"}
            className={`w-full rounded-xl ${
              settings.shape === "square"
                ? "bg-meandubrand text-darkgreen"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
            onClick={() => handleShapeChange("square")}
          >
            Square
          </Button>
          <Button
            variant={settings.shape === "circle" ? "default" : "outline"}
            className={`w-full rounded-xl ${
              settings.shape === "circle"
                ? "bg-meandubrand text-darkgreen"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
            onClick={() => handleShapeChange("circle")}
          >
            Circle
          </Button>
        </div>
      </div>

      {/* Font Styles and Sizes Section */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-lg font-medium">Font Styles and Sizes</h3>
        
        {/* Table Number Row */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 gap-2">
          <Label className="w-1/4">Table Number</Label>
          <div className="flex items-center space-x-2 w-1/4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFontSizeDecrement("tableNumber")}
              className="w-8 h-8 p-0 bg-gray-700 text-white border-white/20 hover:bg-gray-600"
            >
              -
            </Button>
            <Input
              id="table-number-size"
              type="number"
              value={settings.fontSize.tableNumber}
              onChange={(e) => handleFontSizeInputChange("tableNumber", e.target.value)}
              className="w-16 h-8 text-center bg-transparent border-white/20 text-white"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFontSizeIncrement("tableNumber")}
              className="w-8 h-8 p-0 bg-gray-700 text-white border-white/20 hover:bg-gray-600"
            >
              +
            </Button>
            <span className="text-sm text-gray-400">px</span>
          </div>
          <div className="relative w-1/4">
            <button
              type="button"
              className="flex w-full justify-between items-center rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white"
              onClick={() => setIsFontOpen((prev) => ({ ...prev, tableNumber: !prev.tableNumber }))}
            >
              <span style={{ fontFamily: settings.tableNumberFont }}>
                {fonts.find(f => f.value === settings.tableNumberFont)?.name || "Poppins"}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isFontOpen.tableNumber ? 'rotate-180' : ''}`} />
            </button>
            {isFontOpen.tableNumber && (
              <div className="absolute z-10 mt-1 w-full max-h-40 overflow-auto rounded-md border border-white/20 bg-darkgreen/90 text-white shadow-md">
                <ScrollArea className="max-h-40">
                  <div className="p-1">
                    {fonts.map((font) => (
                      <button
                        key={font.value}
                        className={`flex w-full items-center rounded-sm px-3 py-2 text-sm hover:bg-white/10 ${
                          settings.tableNumberFont === font.value ? 'bg-white/20' : ''
                        }`}
                        onClick={() => handleFontChange("tableNumber", font.value)}
                      >
                        <div 
                          className="w-full flex items-center justify-between"
                          style={{ fontFamily: font.value }}
                        >
                          <span>{font.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          <div className="flex space-x-1 w-1/4">
            <Button
              onClick={() => handleAlignmentChange("tableNumber", "left")}
              className={`w-1/3 rounded-md text-white ${settings.tableNumberAlignment === "left" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-600`}
            >
              L
            </Button>
            <Button
              onClick={() => handleAlignmentChange("tableNumber", "center")}
              className={`w-1/3 rounded-md text-white ${settings.tableNumberAlignment === "center" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-600`}
            >
              C
            </Button>
            <Button
              onClick={() => handleAlignmentChange("tableNumber", "right")}
              className={`w-1/3 rounded-md text-white ${settings.tableNumberAlignment === "right" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-600`}
            >
              R
            </Button>
          </div>
        </div>

        {/* Action Text Row */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 gap-2">
          <Label className="w-1/4">Action Text</Label>
          <div className="flex items-center space-x-2 w-1/4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFontSizeDecrement("actionText")}
              className="w-8 h-8 p-0 bg-gray-700 text-white border-white/20 hover:bg-gray-600"
            >
              -
            </Button>
            <Input
              id="action-text-size"
              type="number"
              value={settings.fontSize.actionText}
              onChange={(e) => handleFontSizeInputChange("actionText", e.target.value)}
              className="w-16 h-8 text-center bg-transparent border-white/20 text-white"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFontSizeIncrement("actionText")}
              className="w-8 h-8 p-0 bg-gray-700 text-white border-white/20 hover:bg-gray-600"
            >
              +
            </Button>
            <span className="text-sm text-gray-400">px</span>
          </div>
          <div className="relative w-1/4">
            <button
              type="button"
              className="flex w-full justify-between items-center rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white"
              onClick={() => setIsFontOpen((prev) => ({ ...prev, actionText: !prev.actionText }))}
            >
              <span style={{ fontFamily: settings.actionTextFont }}>
                {fonts.find(f => f.value === settings.actionTextFont)?.name || "Poppins"}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isFontOpen.actionText ? 'rotate-180' : ''}`} />
            </button>
            {isFontOpen.actionText && (
              <div className="absolute z-10 mt-1 w-full max-h-40 overflow-auto rounded-md border border-white/20 bg-darkgreen/90 text-white shadow-md">
                <ScrollArea className="max-h-40">
                  <div className="p-1">
                    {fonts.map((font) => (
                      <button
                        key={font.value}
                        className={`flex w-full items-center rounded-sm px-3 py-2 text-sm hover:bg-white/10 ${
                          settings.actionTextFont === font.value ? 'bg-white/20' : ''
                        }`}
                        onClick={() => handleFontChange("actionText", font.value)}
                      >
                        <div 
                          className="w-full flex items-center justify-between"
                          style={{ fontFamily: font.value }}
                        >
                          <span>{font.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          <div className="flex space-x-1 w-1/4">
            <Button
              onClick={() => handleAlignmentChange("actionText", "left")}
              className={`w-1/3 rounded-md text-white ${settings.actionTextAlignment === "left" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-600`}
            >
              L
            </Button>
            <Button
              onClick={() => handleAlignmentChange("actionText", "center")}
              className={`w-1/3 rounded-md text-white ${settings.actionTextAlignment === "center" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-600`}
            >
              C
            </Button>
            <Button
              onClick={() => handleAlignmentChange("actionText", "right")}
              className={`w-1/3 rounded-md text-white ${settings.actionTextAlignment === "right" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-600`}
            >
              R
            </Button>
          </div>
        </div>

        {/* Venue Name Row */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 gap-2">
          <Label className="w-1/4">Venue Name</Label>
          <div className="flex items-center space-x-2 w-1/4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFontSizeDecrement("venueName")}
              className="w-8 h-8 p-0 bg-gray-700 text-white border-white/20 hover:bg-gray-600"
            >
              -
            </Button>
            <Input
              id="venue-name-size"
              type="number"
              value={settings.fontSize.venueName}
              onChange={(e) => handleFontSizeInputChange("venueName", e.target.value)}
              className="w-16 h-8 text-center bg-transparent border-white/20 text-white"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFontSizeIncrement("venueName")}
              className="w-8 h-8 p-0 bg-gray-700 text-white border-white/20 hover:bg-gray-600"
            >
              +
            </Button>
            <span className="text-sm text-gray-400">px</span>
          </div>
          <div className="relative w-1/4">
            <button
              type="button"
              className="flex w-full justify-between items-center rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white"
              onClick={() => setIsFontOpen((prev) => ({ ...prev, venueName: !prev.venueName }))}
            >
              <span style={{ fontFamily: settings.venueNameFont }}>
                {fonts.find(f => f.value === settings.venueNameFont)?.name || "Poppins"}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isFontOpen.venueName ? 'rotate-180' : ''}`} />
            </button>
            {isFontOpen.venueName && (
              <div className="absolute z-10 mt-1 w-full max-h-40 overflow-auto rounded-md border border-white/20 bg-darkgreen/90 text-white shadow-md">
                <ScrollArea className="max-h-40">
                  <div className="p-1">
                    {fonts.map((font) => (
                      <button
                        key={font.value}
                        className={`flex w-full items-center rounded-sm px-3 py-2 text-sm hover:bg-white/10 ${
                          settings.venueNameFont === font.value ? 'bg-white/20' : ''
                        }`}
                        onClick={() => handleFontChange("venueName", font.value)}
                      >
                        <div 
                          className="w-full flex items-center justify-between"
                          style={{ fontFamily: font.value }}
                        >
                          <span>{font.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          <div className="flex space-x-1 w-1/4">
            <Button
              onClick={() => handleAlignmentChange("venueName", "left")}
              className={`w-1/3 rounded-md text-white ${settings.venueNameAlignment === "left" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-600`}
            >
              L
            </Button>
            <Button
              onClick={() => handleAlignmentChange("venueName", "center")}
              className={`w-1/3 rounded-md text-white ${settings.venueNameAlignment === "center" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-600`}
            >
              C
            </Button>
            <Button
              onClick={() => handleAlignmentChange("venueName", "right")}
              className={`w-1/3 rounded-md text-white ${settings.venueNameAlignment === "right" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-600`}
            >
              R
            </Button>
          </div>
        </div>
      </div>

      {/* Background Image Section */}
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
          <li>Use the drag-and-drop feature to position elements as needed</li>
          <li>Choose fonts that match your brand personality</li>
          <li>Ensure font sizes are appropriate for readability</li>
          <li>Background images work best with reduced opacity to ensure text remains readable</li>
        </ul>
      </div>
    </div>
  );
};

export default CollateralLayout;