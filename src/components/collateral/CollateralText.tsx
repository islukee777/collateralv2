import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Bold, Underline, HighlighterIcon } from "lucide-react";

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

interface CollateralTextProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

const CollateralText = ({ settings, updateSettings }: CollateralTextProps) => {
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const handleActionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ actionText: e.target.value });
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
                  style={{ fontFamily: settings.fontFamily }}>
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

      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-md font-medium mb-2">Text & Font Tips</h4>
        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
          <li>Keep action text clear and concise</li>
          <li>Bold text can help with visibility in bright environments</li>
          <li>Highlighting can add visual emphasis to important information</li>
        </ul>
      </div>
    </div>
  );
};

export default CollateralText;