
import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRPreviewProps {
  template: {
    id: string;
    name: string;
    imageSrc: string;
  };
  colorScheme: {
    id: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  logoUrl: string | null;
  venueName: string;
  qrCodeUrl: string;
}

const QRPreview = ({
  template,
  colorScheme,
  logoUrl,
  venueName,
  qrCodeUrl,
}: QRPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of template and resources
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [template, colorScheme, logoUrl]);

  // Different layout styles based on template
  const getTemplateStyles = () => {
    switch (template.id) {
      case "template1": // Classic
        return {
          container: "flex flex-col items-center justify-center text-center p-4",
          titleClass: "text-xl font-semibold mt-4 mb-1",
          subtitleClass: "text-sm mb-4",
          qrSize: 150,
          logoPosition: "flex flex-col gap-4",
        };
      case "template2": // Modern
        return {
          container: "flex flex-col items-center justify-center text-center bg-gradient-to-br p-6 rounded-xl",
          titleClass: "text-2xl font-bold mt-4 mb-1",
          subtitleClass: "text-sm font-medium mb-4",
          qrSize: 160,
          logoPosition: "flex flex-col gap-4",
        };
      case "template3": // Minimal
        return {
          container: "flex flex-row items-center justify-between p-4 gap-4",
          titleClass: "text-lg font-medium",
          subtitleClass: "text-xs opacity-80",
          qrSize: 130,
          logoPosition: "flex flex-col items-start justify-center",
        };
      case "template4": // Bold
        return {
          container: "flex flex-col items-center justify-center text-center border-4 p-4 rounded-lg",
          titleClass: "text-2xl font-black uppercase mt-4 mb-1",
          subtitleClass: "text-sm tracking-wide mb-4",
          qrSize: 160,
          logoPosition: "flex flex-col gap-3",
        };
      default:
        return {
          container: "flex flex-col items-center justify-center text-center p-4",
          titleClass: "text-xl font-semibold mt-4 mb-1",
          subtitleClass: "text-sm mb-4",
          qrSize: 150,
          logoPosition: "flex flex-col gap-4",
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div 
      className="relative transition-all duration-300 rounded-lg overflow-hidden"
      style={{ 
        backgroundColor: colorScheme.accent,
        color: colorScheme.secondary,
      }}
    >
      {isLoading ? (
        <div className="animate-pulse flex flex-col items-center justify-center p-10 space-y-4">
          <div className="h-32 w-32 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className={styles.container}>
          {template.id === "template3" ? (
            <>
              {/* Horizontal layout for Minimal template */}
              <div className={styles.logoPosition}>
                {logoUrl && (
                  <div className="mb-2">
                    <img 
                      src={logoUrl} 
                      alt="Venue Logo" 
                      className="h-10 w-auto object-contain" 
                    />
                  </div>
                )}
                <div>
                  <h2 className={styles.titleClass}>{venueName}</h2>
                  <p className={styles.subtitleClass}>Scan for menu</p>
                </div>
              </div>
              <div>
                <QRCodeSVG 
                  value={qrCodeUrl}
                  size={styles.qrSize}
                  fgColor={colorScheme.secondary}
                  bgColor="transparent"
                  level="H"
                  includeMargin={true}
                />
              </div>
            </>
          ) : (
            <>
              {/* Standard vertical layout for other templates */}
              {logoUrl && (
                <div className="mb-2">
                  <img 
                    src={logoUrl} 
                    alt="Venue Logo" 
                    className="h-16 w-auto object-contain" 
                  />
                </div>
              )}
              <QRCodeSVG 
                value={qrCodeUrl}
                size={styles.qrSize}
                fgColor={colorScheme.secondary}
                bgColor="transparent"
                level="H"
                includeMargin={true}
              />
              <h2 className={styles.titleClass}>{venueName}</h2>
              <p className={styles.subtitleClass}>Scan for menu</p>
              
              {/* Show branded tag for specific templates */}
              {(template.id === "template2" || template.id === "template4") && (
                <div 
                  className="text-xs py-1 px-3 rounded-full mt-2 font-medium"
                  style={{ backgroundColor: colorScheme.primary, color: '#fff' }}
                >
                  Powered by me&u
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QRPreview;
