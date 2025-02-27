
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

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

interface CollateralLogoProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

const CollateralLogo = ({ settings, updateSettings }: CollateralLogoProps) => {
  const [venueName, setVenueName] = useState(settings.venueName);
  const [isUploading, setIsUploading] = useState(false);

  const handleVenueNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setVenueName(newName);
    updateSettings({ venueName: newName });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      setIsUploading(true);

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          updateSettings({ logoUrl: event.target.result as string });
          setIsUploading(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateSettings({ logoUrl: null });
  };

  return (
    <div className="space-y-6 text-white">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Venue Logo</h3>
        
        <div className="space-y-2">
          <Label htmlFor="logo-upload">Upload Logo (PNG or SVG recommended)</Label>
          <div className="mt-2 flex items-center gap-3">
            <Button 
              variant="outline" 
              className={`relative overflow-hidden border-dashed ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isUploading}
            >
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload Logo'}
            </Button>
            {settings.logoUrl && (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={removeLogo}
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            For best results, use a transparent PNG or SVG file.
          </p>
        </div>

        {settings.logoUrl && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-sm font-medium mb-2">Logo Preview</h4>
            <div className="mx-auto max-w-[150px] p-2">
              <img 
                src={settings.logoUrl} 
                alt="Venue Logo" 
                className="max-h-16 object-contain mx-auto"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2 mt-6 pt-6 border-t border-white/10">
          <Label htmlFor="venue-name">Venue Name (Optional)</Label>
          <Input 
            id="venue-name"
            value={venueName}
            onChange={handleVenueNameChange}
            placeholder="e.g. Cafe Milano"
          />
          <p className="text-xs text-gray-400 mt-1">
            Add your venue name to display below the QR code.
          </p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-md font-medium mb-2">Logo Tips</h4>
        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
          <li>Use a logo with transparent background for better results</li>
          <li>Ensure the logo is clearly visible against the background color</li>
          <li>Keep the logo simple and recognizable at a small size</li>
          <li>If you don't have a logo, the venue name can be used instead</li>
        </ul>
      </div>
    </div>
  );
};

export default CollateralLogo;
