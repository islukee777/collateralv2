
import React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

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

interface CollateralPatternsProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

const CollateralPatterns = ({ settings, updateSettings }: CollateralPatternsProps) => {
  // Pattern options (extended list)
  const patterns = [
    { name: "None", value: "none", description: "Clean, solid background" },
    { name: "Dots", value: "dots", description: "Subtle dot pattern" },
    { name: "Stripes", value: "stripes", description: "Diagonal stripe pattern" },
    { name: "Waves", value: "waves", description: "Gentle wave pattern" },
    { name: "ZigZag", value: "zigzag", description: "Geometric zigzag pattern" },
    { name: "Bubbles", value: "bubbles", description: "Scattered bubble pattern" },
    { name: "Grid", value: "grid", description: "Simple grid pattern" },
    { name: "Squares", value: "squares", description: "Repeating squares" },
    { name: "Triangles", value: "triangles", description: "Triangle tessellation" },
    { name: "Hexagons", value: "hexagons", description: "Honeycomb pattern" },
    { name: "Diamonds", value: "diamonds", description: "Diamond grid" },
    { name: "Circles", value: "circles", description: "Overlapping circles" },
    { name: "Leaves", value: "leaves", description: "Subtle leaf motif" },
    { name: "Stars", value: "stars", description: "Starry background" },
    { name: "Crosshatch", value: "crosshatch", description: "Crosshatched lines" },
    { name: "Plaid", value: "plaid", description: "Simple plaid pattern" },
    { name: "Confetti", value: "confetti", description: "Festive confetti dots" },
    { name: "Polka", value: "polka", description: "Large polka dots" },
    { name: "Moroccan", value: "moroccan", description: "Moroccan tile pattern" },
    { name: "Herringbone", value: "herringbone", description: "Classic herringbone" }
  ];

  // Pattern preview styles
  const getPatternStyle = (pattern: string, bgColor: string, textColor: string) => {
    switch(pattern) {
      case 'dots':
        return {
          backgroundImage: `radial-gradient(${textColor}20 2px, transparent 2px)`,
          backgroundSize: '15px 15px',
          backgroundColor: bgColor
        };
      case 'stripes':
        return {
          backgroundImage: `linear-gradient(45deg, ${textColor}10 25%, transparent 25%, transparent 50%, ${textColor}10 50%, ${textColor}10 75%, transparent 75%, transparent)`,
          backgroundSize: '20px 20px',
          backgroundColor: bgColor
        };
      case 'waves':
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='${encodeURIComponent(textColor)}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundColor: bgColor
        };
      case 'zigzag':
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.172L6.172 0h5.656L0 11.828V6.172zm40 5.656L28.172 0h5.656L40 6.172v5.656zM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172zm12 0L20 10.172 21.828 12h-3.656z' fill='${encodeURIComponent(textColor)}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundColor: bgColor
        };
      case 'bubbles':
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${encodeURIComponent(textColor)}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundColor: bgColor
        };
      case 'grid':
        return {
          backgroundImage: `linear-gradient(${textColor}10 1px, transparent 1px), linear-gradient(90deg, ${textColor}10 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundColor: bgColor
        };
      case 'squares':
        return {
          backgroundImage: `linear-gradient(to right, ${textColor}10 1px, transparent 1px), linear-gradient(to bottom, ${textColor}10 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundColor: bgColor
        };
      case 'triangles':
        return {
          backgroundImage: `linear-gradient(45deg, ${textColor}10 25%, transparent 25%), linear-gradient(135deg, ${textColor}10 25%, transparent 25%)`,
          backgroundSize: '40px 40px',
          backgroundColor: bgColor
        };
      case 'hexagons':
        return {
          backgroundImage: `radial-gradient(${textColor}10 15%, transparent 15%)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px',
          backgroundColor: bgColor
        };
      case 'diamonds':
        return {
          backgroundImage: `linear-gradient(45deg, ${textColor}10 25%, transparent 25%, transparent 75%, ${textColor}10 75%)`,
          backgroundSize: '30px 30px',
          backgroundColor: bgColor
        };
      case 'circles':
        return {
          backgroundImage: `radial-gradient(${textColor}15 5%, transparent 5%), radial-gradient(${textColor}15 5%, transparent 5%)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
          backgroundColor: bgColor
        };
      case 'leaves':
        return {
          backgroundImage: `radial-gradient(${textColor}15 8%, transparent 8%) 0 0, radial-gradient(${textColor}10 8%, transparent 8%) 8px 8px`,
          backgroundSize: '16px 16px',
          backgroundColor: bgColor
        };
      case 'stars':
        return {
          backgroundImage: `radial-gradient(${textColor}15 2px, transparent 2px), radial-gradient(${textColor}15 2px, transparent 2px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
          backgroundColor: bgColor
        };
      case 'crosshatch':
        return {
          backgroundImage: `linear-gradient(45deg, ${textColor}10 25%, transparent 25%), linear-gradient(135deg, ${textColor}10 25%, transparent 25%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          backgroundColor: bgColor
        };
      case 'plaid':
        return {
          backgroundImage: `linear-gradient(${textColor}10 2px, transparent 2px), linear-gradient(90deg, ${textColor}10 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
          backgroundColor: bgColor
        };
      case 'confetti':
        return {
          backgroundImage: `radial-gradient(${textColor}10 3px, transparent 3px), radial-gradient(${textColor}15 3px, transparent 3px)`,
          backgroundSize: '25px 25px',
          backgroundPosition: '0 0, 10px 10px',
          backgroundColor: bgColor
        };
      case 'polka':
        return {
          backgroundImage: `radial-gradient(${textColor}15 6px, transparent 6px)`,
          backgroundSize: '30px 30px',
          backgroundColor: bgColor
        };
      case 'moroccan':
        return {
          backgroundImage: `radial-gradient(${textColor}15 4px, transparent 4px), radial-gradient(${textColor}10 4px, transparent 4px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
          backgroundColor: bgColor
        };
      case 'herringbone':
        return {
          backgroundImage: `linear-gradient(45deg, ${textColor}10 25%, transparent 25%), linear-gradient(135deg, ${textColor}10 25%, transparent 25%)`,
          backgroundSize: '15px 15px',
          backgroundColor: bgColor
        };
      default:
        return {
          backgroundColor: bgColor
        };
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h3 className="text-lg font-medium mb-4">Background Patterns</h3>
        <div className="grid grid-cols-5 gap-2">
          {patterns.map((pattern) => (
            <div 
              key={pattern.value}
              className={`cursor-pointer`}
              onClick={() => updateSettings({ pattern: pattern.value })}
            >
              <div 
                className={`w-full h-16 rounded-lg transition-all ${
                  settings.pattern === pattern.value 
                    ? 'ring-2 ring-meandubrand' 
                    : 'ring-1 ring-white/10'
                }`}
                style={getPatternStyle(pattern.value, settings.backgroundColor, settings.textColor)}
              ></div>
              <div className="text-center mt-1">
                <span className="text-xs">{pattern.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-md font-medium mb-2">Pattern Tips</h4>
        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
          <li>Patterns can add visual interest but should be subtle</li>
          <li>Ensure that patterns don't interfere with QR code scanning</li>
          <li>Simple patterns work best for a clean, professional look</li>
          <li>Match patterns with your brand's visual style</li>
        </ul>
      </div>
    </div>
  );
};

export default CollateralPatterns;
