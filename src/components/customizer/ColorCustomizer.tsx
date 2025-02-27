
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ColorScheme {
  id: string;
  primary: string;
  secondary: string;
  accent: string;
}

interface ColorCustomizerProps {
  colorSchemes: ColorScheme[];
  selectedScheme: ColorScheme;
  onSelect: (scheme: ColorScheme) => void;
}

const ColorCustomizer = ({
  colorSchemes,
  selectedScheme,
  onSelect,
}: ColorCustomizerProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium mb-4">Choose Colors</h3>
        <p className="text-muted-foreground mb-6">
          Select a color scheme that matches your brand identity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colorSchemes.map((scheme, index) => (
          <Card
            key={scheme.id}
            className={cn(
              "cursor-pointer hover-scale overflow-hidden transition-all",
              selectedScheme.id === scheme.id ? "ring-2 ring-primary" : "",
              `stagger-${index % 3 + 1} animate-scale-in`
            )}
            onClick={() => onSelect(scheme)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center",
                      selectedScheme.id === scheme.id
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300"
                    )}
                  >
                    {selectedScheme.id === scheme.id && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span
                    className={
                      selectedScheme.id === scheme.id
                        ? "font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    Color Scheme {index + 1}
                  </span>
                </div>
              </div>

              <div
                className="h-24 rounded-md mb-3 transition-all duration-300"
                style={{ backgroundColor: scheme.accent }}
              >
                <div className="h-full flex items-center justify-center p-3">
                  <div
                    className="flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: scheme.primary,
                      color: "#fff",
                    }}
                  >
                    Primary
                  </div>
                  <div
                    className="ml-2 flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: scheme.secondary,
                      color: "#fff",
                    }}
                  >
                    Secondary
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <div
                  className="color-swatch"
                  style={{ backgroundColor: scheme.primary }}
                  title="Primary Color"
                ></div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: scheme.secondary }}
                  title="Secondary Color"
                ></div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: scheme.accent }}
                  title="Background Color"
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ColorCustomizer;
