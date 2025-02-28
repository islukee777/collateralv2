import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { ResizableBox } from "react-resizable";
import { QRCodeSVG } from "qrcode.react";

// Include react-resizable styles
import "react-resizable/css/styles.css";

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
  tableNumberPosition: { x: number; y: number };
  actionTextPosition: { x: number; y: number };
  qrCodePosition: { x: number; y: number };
  venueNamePosition: { x: number; y: number };
  logoPosition: { x: number; y: number };
  tableNumberSize: number;
  actionTextSize: number;
  qrCodeSize: number;
  venueNameSize: number;
  logoSize: { width: number; height: number };
  tableNumberDragged: boolean;
  actionTextDragged: boolean;
  qrCodeDragged: boolean;
  venueNameDragged: boolean;
  logoDragged: boolean;
}

interface CollateralPreviewProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

const CollateralPreview = ({ settings, updateSettings }: CollateralPreviewProps) => {
  console.log("Current font in preview:", settings.fontFamily);

  // Add the text styling to the existing styles
  const getTextStyles = () => {
    return {
      fontWeight: settings.textStyle.bold ? "bold" : "normal",
      textDecoration: settings.textStyle.underline ? "underline" : "none",
      backgroundColor: settings.textStyle.highlight
        ? settings.textStyle.highlightColor
        : "transparent",
      padding: settings.textStyle.highlight ? "0 4px" : "0",
      display: "inline-block",
    };
  };

  // Patterns (unchanged)
  const getPatternStyle = () => {
    switch (settings.pattern) {
      case "dots":
        return {
          backgroundImage: `radial-gradient(${settings.textColor}20 2px, transparent 2px)`,
          backgroundSize: "15px 15px",
        };
      case "stripes":
        return {
          backgroundImage: `linear-gradient(45deg, ${settings.textColor}10 25%, transparent 25%, transparent 50%, ${settings.textColor}10 50%, ${settings.textColor}10 75%, transparent 75%, transparent)`,
          backgroundSize: "20px 20px",
        };
      case "waves":
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='${encodeURIComponent(settings.textColor)}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        };
      case "zigzag":
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.172L6.172 0h5.656L0 11.828V6.172zm40 5.656L28.172 0h5.656L40 6.172v5.656zM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172zm12 0L20 10.172 21.828 12h-3.656z' fill='${encodeURIComponent(settings.textColor)}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        };
      case "bubbles":
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${encodeURIComponent(settings.textColor)}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        };
      case "grid":
        return {
          backgroundImage: `linear-gradient(${settings.textColor}10 1px, transparent 1px), linear-gradient(90deg, ${settings.textColor}10 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        };
      case "squares":
        return {
          backgroundImage: `linear-gradient(to right, ${settings.textColor}10 1px, transparent 1px), linear-gradient(to bottom, ${settings.textColor}10 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        };
      case "triangles":
        return {
          backgroundImage: `linear-gradient(45deg, ${settings.textColor}10 25%, transparent 25%), linear-gradient(135deg, ${settings.textColor}10 25%, transparent 25%)`,
          backgroundSize: "40px 40px",
        };
      case "hexagons":
        return {
          backgroundImage: `radial-gradient(${settings.textColor}10 15%, transparent 15%)`,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        };
      case "diamonds":
        return {
          backgroundImage: `linear-gradient(45deg, ${settings.textColor}10 25%, transparent 25%, transparent 75%, ${settings.textColor}10 75%)`,
          backgroundSize: "30px 30px",
        };
      case "circles":
        return {
          backgroundImage: `radial-gradient(${settings.textColor}15 5%, transparent 5%), radial-gradient(${settings.textColor}15 5%, transparent 5%)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0, 15px 15px",
        };
      case "leaves":
        return {
          backgroundImage: `radial-gradient(${settings.textColor}15 8%, transparent 8%) 0 0, radial-gradient(${settings.textColor}10 8%, transparent 8%) 8px 8px`,
          backgroundSize: "16px 16px",
        };
      case "stars":
        return {
          backgroundImage: `radial-gradient(${settings.textColor}15 2px, transparent 2px), radial-gradient(${settings.textColor}15 2px, transparent 2px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0, 15px 15px",
        };
      case "crosshatch":
        return {
          backgroundImage: `linear-gradient(45deg, ${settings.textColor}10 25%, transparent 25%), linear-gradient(135deg, ${settings.textColor}10 25%, transparent 25%)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        };
      case "plaid":
        return {
          backgroundImage: `linear-gradient(${settings.textColor}10 2px, transparent 2px), linear-gradient(90deg, ${settings.textColor}10 2px, transparent 2px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        };
      case "confetti":
        return {
          backgroundImage: `radial-gradient(${settings.textColor}10 3px, transparent 3px), radial-gradient(${settings.textColor}15 3px, transparent 3px)`,
          backgroundSize: "25px 25px",
          backgroundPosition: "0 0, 10px 10px",
        };
      case "polka":
        return {
          backgroundImage: `radial-gradient(${settings.textColor}15 6px, transparent 6px)`,
          backgroundSize: "30px 30px",
        };
      case "moroccan":
        return {
          backgroundImage: `radial-gradient(${settings.textColor}15 4px, transparent 4px), radial-gradient(${settings.textColor}10 4px, transparent 4px)`,
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        };
      case "herringbone":
        return {
          backgroundImage: `linear-gradient(45deg, ${settings.textColor}10 25%, transparent 25%), linear-gradient(135deg, ${settings.textColor}10 25%, transparent 25%)`,
          backgroundSize: "15px 15px",
        };
      default:
        return {};
    }
  };

  // Define the container dimensions based on shape
  const containerWidth = settings.shape === "rectangle" ? 300 : 400; // 300px for Rectangle, 400px for Square/Circle
  const containerHeight = settings.shape === "rectangle" ? 400 : 400; // 400px height for all shapes

  const containerStyle: React.CSSProperties = {
    backgroundColor: settings.backgroundColor,
    color: settings.textColor,
    borderRadius: settings.shape === "circle" ? "50%" : "20px",
    position: "relative",
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    margin: "0 auto",
    boxShadow: "0 10px 20px rgba(100, 100, 100, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.3)",
    ...getPatternStyle(),
  };

  // Adjust initial positions based on shape (only if not dragged)
  const adjustPositionForShape = (originalPosition: { x: number; y: number }, element: string) => {
    const hasBeenDragged = {
      tableNumber: settings.tableNumberDragged,
      actionText: settings.actionTextDragged,
      qrCode: settings.qrCodeDragged,
      venueName: settings.venueNameDragged,
      logo: settings.logoDragged
    }[element];

    if (hasBeenDragged) {
      return originalPosition;
    }

    if (settings.shape === "rectangle") {
      return originalPosition;
    }

    const containerSize = settings.shape === "square" ? 400 : 400;
    const centerX = containerSize / 2;
    const adjustedPosition = { ...originalPosition };

    if (settings.shape === "square") {
      switch (element) {
        case "tableNumber":
          adjustedPosition.x = 40;
          adjustedPosition.y = 20;
          break;
        case "actionText":
          adjustedPosition.x = 40;
          adjustedPosition.y = 100;
          break;
        case "qrCode":
          adjustedPosition.x = 40;
          adjustedPosition.y = 170;
          break;
        case "venueName":
          adjustedPosition.x = centerX;
          adjustedPosition.y = containerSize - 15;
          break;
        case "logo":
          adjustedPosition.x = containerSize - 35;
          adjustedPosition.y = 35;
          break;
      }
    } else if (settings.shape === "circle") {
      switch (element) {
        case "tableNumber":
          adjustedPosition.x = centerX;
          adjustedPosition.y = containerSize * 0.1;
          break;
        case "actionText":
          adjustedPosition.x = centerX;
          adjustedPosition.y = containerSize * 0.25;
          break;
        case "qrCode":
          adjustedPosition.x = centerX;
          adjustedPosition.y = containerSize * 0.5;
          break;
        case "venueName":
          adjustedPosition.x = centerX;
          adjustedPosition.y = containerSize * 0.95;
          break;
        case "logo":
          adjustedPosition.x = containerSize * 0.95;
          adjustedPosition.y = containerSize * 0.05;
          break;
      }
    }
    return adjustedPosition;
  };

  // Handle drag stop for updating position
  const handleDragStop = (element: string, e: DraggableEvent, data: DraggableData) => {
    const updates: Partial<CollateralSettings> = {};
    switch (element) {
      case "tableNumber":
        updates.tableNumberPosition = { x: data.x, y: data.y };
        updates.tableNumberDragged = true;
        break;
      case "actionText":
        updates.actionTextPosition = { x: data.x, y: data.y };
        updates.actionTextDragged = true;
        break;
      case "qrCode":
        updates.qrCodePosition = { x: data.x, y: data.y };
        updates.qrCodeDragged = true;
        break;
      case "venueName":
        updates.venueNamePosition = { x: data.x, y: data.y };
        updates.venueNameDragged = true;
        break;
      case "logo":
        updates.logoPosition = { x: data.x, y: data.y };
        updates.logoDragged = true;
        break;
    }
    updateSettings(updates);
  };

  // Handle resize stop for updating size
  const handleResizeStop = (
    element: string,
    _event: React.MouseEvent | React.TouchEvent,
    size: { width: number; height: number }
  ) => {
    const updates: Partial<CollateralSettings> = {};
    switch (element) {
      case "tableNumber":
        updates.tableNumberSize = size.width / 2;
        break;
      case "actionText":
        updates.actionTextSize = size.width / 4;
        break;
      case "qrCode":
        updates.qrCodeSize = size.width;
        break;
      case "venueName":
        updates.venueNameSize = size.width / 3;
        break;
      case "logo":
        updates.logoSize = { width: size.width, height: size.height };
        break;
    }
    updateSettings(updates);
  };

  // Stop drag event propagation when resizing
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const backgroundContainerStyle: React.CSSProperties = {};
  
  if (settings.backgroundImageUrl) {
    backgroundContainerStyle.backgroundImage = `url(${settings.backgroundImageUrl})`;
    backgroundContainerStyle.backgroundSize = "cover";
    backgroundContainerStyle.backgroundPosition = "center";
    backgroundContainerStyle.backgroundRepeat = "no-repeat";
    backgroundContainerStyle.opacity = settings.backgroundOpacity;
    backgroundContainerStyle.position = "absolute";
    backgroundContainerStyle.top = 0;
    backgroundContainerStyle.left = 0;
    backgroundContainerStyle.right = 0;
    backgroundContainerStyle.bottom = 0;
    backgroundContainerStyle.borderRadius = settings.shape === "circle" ? "50%" : "20px";
    backgroundContainerStyle.zIndex = 0;
  }

  // Calculate bounds for each element to prevent dragging outside the container
  const getElementBounds = (elementWidth: number, elementHeight: number) => {
    return {
      left: 0,
      top: 0,
      right: containerWidth - elementWidth,
      bottom: containerHeight - elementHeight,
    };
  };

  return (
    <div
      className="rounded-3xl w-full max-w-md mx-auto relative acrylic-thickness overflow-visible"
      style={containerStyle}
    >
      {/* Background image with opacity */}
      {settings.backgroundImageUrl && <div style={backgroundContainerStyle}></div>}

      {/* Content with exact positioning */}
      <div
        className={`p-4 overflow-visible`}
        style={{ fontFamily: settings.fontFamily, position: "relative", zIndex: 1, width: `${containerWidth}px`, height: `${containerHeight}px` }}
      >
        {/* Table Number */}
        <Draggable
          position={adjustPositionForShape(settings.tableNumberPosition, "tableNumber")}
          onStop={(e, data) => handleDragStop("tableNumber", e, data)}
          bounds={getElementBounds(settings.tableNumberSize * 2, settings.tableNumberSize)}
        >
          <div className="absolute cursor-move hover:outline hover:outline-2 hover:outline-blue-500 resizable-container">
            <ResizableBox
              width={settings.tableNumberSize * 2}
              height={settings.tableNumberSize}
              minConstraints={[50, 20]}
              maxConstraints={[200, 80]}
              onResizeStop={(e, data) => handleResizeStop("tableNumber", e, data)}
              resizeHandles={["se"]}
              onMouseDown={stopPropagation}
            >
              <div style={{ ...getTextStyles(), fontSize: `${settings.tableNumberSize}px` }}>
                {settings.tableNumber}
              </div>
            </ResizableBox>
          </div>
        </Draggable>

        {/* Action Text */}
        <Draggable
          position={adjustPositionForShape(settings.actionTextPosition, "actionText")}
          onStop={(e, data) => handleDragStop("actionText", e, data)}
          bounds={getElementBounds(settings.actionTextSize * 4, settings.actionTextSize)}
        >
          <div className="absolute cursor-move hover:outline hover:outline-2 hover:outline-blue-500 resizable-container">
            <ResizableBox
              width={settings.actionTextSize * 4}
              height={settings.actionTextSize}
              minConstraints={[100, 20]}
              maxConstraints={[300, 60]}
              onResizeStop={(e, data) => handleResizeStop("actionText", e, data)}
              resizeHandles={["se"]}
              onMouseDown={stopPropagation}
            >
              <div
                style={{
                  ...getTextStyles(),
                  fontSize: `${settings.actionTextSize}px`,
                  maxWidth: settings.shape === "rectangle" ? "300px" : settings.shape === "square" ? "300px" : "3000px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {settings.actionText}
              </div>
            </ResizableBox>
          </div>
        </Draggable>

        {/* QR Code */}
        <Draggable
          position={adjustPositionForShape(settings.qrCodePosition, "qrCode")}
          onStop={(e, data) => handleDragStop("qrCode", e, data)}
          bounds={getElementBounds(settings.qrCodeSize, settings.qrCodeSize)}
        >
          <div className="absolute cursor-move hover:outline hover:outline-2 hover:outline-blue-500 resizable-container">
            <ResizableBox
              width={settings.qrCodeSize}
              height={settings.qrCodeSize}
              minConstraints={[80, 80]}
              maxConstraints={[200, 200]}
              onResizeStop={(e, data) => handleResizeStop("qrCode", e, data)}
              resizeHandles={["se"]}
              onMouseDown={stopPropagation}
            >
              <div className="bg-white p-[10px] inline-block rounded-sm">
                <QRCodeSVG
                  value={settings.qrValue}
                  size={settings.qrCodeSize - 20}
                  fgColor="black"
                  bgColor="white"
                  level="H"
                  includeMargin={false}
                />
              </div>
            </ResizableBox>
          </div>
        </Draggable>

        {/* Venue Name */}
        {settings.venueName && (
          <Draggable
            position={adjustPositionForShape(settings.venueNamePosition, "venueName")}
            onStop={(e, data) => handleDragStop("venueName", e, data)}
            bounds={getElementBounds(settings.venueNameSize * 3, settings.venueNameSize)}
          >
            <div className="absolute cursor-move hover:outline hover:outline-2 hover:outline-blue-500 resizable-container">
              <ResizableBox
                width={settings.venueNameSize * 3}
                height={settings.venueNameSize}
                minConstraints={[60, 20]}
                maxConstraints={[200, 40]}
                onResizeStop={(e, data) => handleResizeStop("venueName", e, data)}
                resizeHandles={["se"]}
                onMouseDown={stopPropagation}
              >
                <div style={{ ...getTextStyles(), fontSize: `${settings.venueNameSize}px`, textAlign: "center" }}>
                  {settings.venueName}
                </div>
              </ResizableBox>
            </div>
          </Draggable>
        )}

        {/* Logo */}
        {settings.logoUrl && (
          <Draggable
            position={adjustPositionForShape(settings.logoPosition, "logo")}
            onStop={(e, data) => handleDragStop("logo", e, data)}
            bounds={getElementBounds(settings.logoSize.width, settings.logoSize.height)}
          >
            <div className="absolute cursor-move hover:outline hover:outline-2 hover:outline-blue-500 resizable-container">
              <ResizableBox
                width={settings.logoSize.width}
                height={settings.logoSize.height}
                minConstraints={[20, 20]}
                maxConstraints={[100, 100]}
                onResizeStop={(e, data) => handleResizeStop("logo", e, data)}
                resizeHandles={["se"]}
                onMouseDown={stopPropagation}
              >
                <img
                  src={settings.logoUrl}
                  alt="Venue Logo"
                  style={{ width: "100%", height: "100%" }}
                />
              </ResizableBox>
            </div>
          </Draggable>
        )}
      </div>
    </div>
  );
};

export default CollateralPreview;