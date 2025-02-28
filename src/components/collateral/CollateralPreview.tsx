import React, { useCallback, useState, useRef, useEffect } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { ResizableBox } from "react-resizable";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";

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
  rectanglePositions: {
    tableNumberPosition: { x: number; y: number };
    actionTextPosition: { x: number; y: number };
    qrCodePosition: { x: number; y: number };
    venueNamePosition: { x: number; y: number };
    logoPosition: { x: number; y: number };
  };
  squarePositions: {
    tableNumberPosition: { x: number; y: number };
    actionTextPosition: { x: number; y: number };
    qrCodePosition: { x: number; y: number };
    venueNamePosition: { x: number; y: number };
    logoPosition: { x: number; y: number };
  };
  circlePositions: {
    tableNumberPosition: { x: number; y: number };
    actionTextPosition: { x: number; y: number };
    qrCodePosition: { x: number; y: number };
    venueNamePosition: { x: number; y: number };
    logoPosition: { x: number; y: number };
  };
  tableNumberSize: number;
  actionTextSize: number;
  qrCodeSize: number;
  venueNameSize: number;
  logoSize: { width: number; height: number };
  tableNumberWidth: number;
  actionTextWidth: number;
  qrCodeWidth: number;
  venueNameWidth: number;
  logoWidth: number;
  tableNumberAlignment: "left" | "center" | "right";
  actionTextAlignment: "left" | "center" | "right";
  venueNameAlignment: "left" | "center" | "right";
}

interface CollateralPreviewProps {
  settings: CollateralSettings;
  updateSettings: (updates: Partial<CollateralSettings>) => void;
}

interface AlignmentGuide {
  type: "horizontal" | "vertical";
  position: number;
  start: number;
  end: number;
}

const CollateralPreview = React.memo(({ settings, updateSettings }: CollateralPreviewProps) => {
  console.log("Current fonts in preview:", {
    tableNumberFont: settings.tableNumberFont,
    actionTextFont: settings.actionTextFont,
    venueNameFont: settings.venueNameFont,
  });
  console.log("Current alignments in preview:", {
    tableNumberAlignment: settings.tableNumberAlignment,
    actionTextAlignment: settings.actionTextAlignment,
    venueNameAlignment: settings.venueNameAlignment,
  });

  // State to track the active component
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  // State to track which component is being edited
  const [editingComponent, setEditingComponent] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  // State to track component sizes for drag bounds
  const [componentSizes, setComponentSizes] = useState({
    tableNumber: { width: settings.tableNumberWidth, height: settings.tableNumberSize },
    actionText: { width: settings.actionTextWidth, height: settings.actionTextSize },
    qrCode: { width: settings.qrCodeWidth, height: settings.qrCodeSize },
    venueName: { width: settings.venueNameWidth, height: settings.venueNameSize },
    logo: { width: settings.logoWidth, height: settings.logoWidth },
  });
  // State to track alignment guides
  const [alignmentGuides, setAlignmentGuides] = useState<AlignmentGuide[]>([]);

  // Handle click on a component to toggle its selection
  const handleComponentClick = (component: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the container
    setActiveComponent((prev) => (prev === component ? null : component));
  };

  // Handle double-click to start editing
  const handleDoubleClick = (component: string, currentText: string) => {
    try {
      setEditingComponent(component);
      setEditText(currentText);
    } catch (error) {
      console.error("Error in handleDoubleClick:", error);
    }
  };

  // Handle text editing change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  // Handle saving the edited text
  const handleTextSave = (component: string) => {
    if (component === "tableNumber") {
      updateSettings({ tableNumber: editText });
    } else if (component === "actionText") {
      updateSettings({ actionText: editText });
    } else if (component === "venueName") {
      updateSettings({ venueName: editText });
    }
    setEditingComponent(null);
  };

  // Handle click outside to deselect the active component
  const handleOutsideClick = () => {
    setActiveComponent(null);
    setEditingComponent(null);
    setAlignmentGuides([]);
  };

  // Add the text styling to the existing styles
  const getTextStyles = useCallback(() => {
    return {
      fontWeight: settings.textStyle.bold ? "bold" : "normal",
      textDecoration: settings.textStyle.underline ? "underline" : "none",
      backgroundColor: settings.textStyle.highlight
        ? settings.textStyle.highlightColor
        : "transparent",
      padding: settings.textStyle.highlight ? "0 4px" : "0",
      display: "inline-block",
    };
  }, [settings.textStyle]);

  // Memoized drag stop handler
  const handleDragStop = useCallback(
    (element: string, e: DraggableEvent, data: DraggableData) => {
      const updates: Partial<CollateralSettings> = {};
      const shapeKey = settings.shape === "rectangle" ? "rectanglePositions" : settings.shape === "square" ? "squarePositions" : "circlePositions";
      updates[shapeKey] = { ...settings[shapeKey] };

      switch (element) {
        case "tableNumber":
          updates[shapeKey]!.tableNumberPosition = { x: data.x, y: data.y };
          break;
        case "actionText":
          updates[shapeKey]!.actionTextPosition = { x: data.x, y: data.y };
          break;
        case "qrCode":
          updates[shapeKey]!.qrCodePosition = { x: data.x, y: data.y };
          break;
        case "venueName":
          updates[shapeKey]!.venueNamePosition = { x: data.x, y: data.y };
          break;
        case "logo":
          updates[shapeKey]!.logoPosition = { x: data.x, y: data.y };
          break;
      }
      updateSettings(updates);
      setAlignmentGuides([]); // Clear guides after drag ends
    },
    [settings, updateSettings]
  );

  // Memoized resize stop handler
  const handleResizeStop = useCallback(
    (element: string, e: React.MouseEvent | React.TouchEvent, data: { size: { width: number; height: number } }) => {
      console.log(`${element} Resize:`, data.size); // Debug log
      const updates: Partial<CollateralSettings> = {};
      switch (element) {
        case "tableNumber":
          updates.tableNumberWidth = data.size.width;
          setComponentSizes((prev) => ({
            ...prev,
            tableNumber: { ...prev.tableNumber, width: data.size.width },
          }));
          break;
        case "actionText":
          updates.actionTextWidth = data.size.width;
          setComponentSizes((prev) => ({
            ...prev,
            actionText: { ...prev.actionText, width: data.size.width },
          }));
          break;
        case "qrCode":
          updates.qrCodeWidth = data.size.width;
          updates.qrCodeSize = data.size.width; // Keep QR code square
          setComponentSizes((prev) => ({
            ...prev,
            qrCode: { width: data.size.width, height: data.size.width },
          }));
          break;
        case "venueName":
          updates.venueNameWidth = data.size.width;
          setComponentSizes((prev) => ({
            ...prev,
            venueName: { ...prev.venueName, width: data.size.width },
          }));
          break;
        case "logo":
          updates.logoWidth = data.size.width;
          updates.logoSize = { width: data.size.width, height: data.size.width }; // Keep logo square
          setComponentSizes((prev) => ({
            ...prev,
            logo: { width: data.size.width, height: data.size.width },
          }));
          break;
      }
      updateSettings(updates);
    },
    [updateSettings]
  );

  // Calculate max constraints for ResizableBox
  const getMaxConstraints = (position: { x: number; y: number }, minWidth: number, minHeight: number) => {
    const maxWidth = containerWidth - position.x; // Cannot expand beyond right edge
    const maxHeight = containerHeight - position.y; // Cannot expand beyond bottom edge
    return [Math.max(minWidth, maxWidth), Math.max(minHeight, maxHeight)];
  };

  // Calculate bounds for each element to prevent dragging outside the container
  const getElementBounds = (element: string) => {
    const { width, height } = componentSizes[element as keyof typeof componentSizes];
    return {
      left: 0, // Cannot drag beyond left edge
      top: 0,  // Cannot drag beyond top edge
      right: containerWidth - width, // Cannot drag beyond right edge
      bottom: containerHeight - height, // Cannot drag beyond bottom edge
    };
  };

  // Calculate alignment guides during drag
  const handleDrag = (draggingElement: string, e: DraggableEvent, data: DraggableData) => {
    const guides: AlignmentGuide[] = [];
    const draggingBounds = {
      left: data.x,
      right: data.x + componentSizes[draggingElement as keyof typeof componentSizes].width,
      top: data.y,
      bottom: data.y + componentSizes[draggingElement as keyof typeof componentSizes].height,
      centerX: data.x + componentSizes[draggingElement as keyof typeof componentSizes].width / 2,
      centerY: data.y + componentSizes[draggingElement as keyof typeof componentSizes].height / 2,
    };

    const elements = ["tableNumber", "actionText", "qrCode", "venueName", "logo"].filter(el => el !== draggingElement);

    elements.forEach((element) => {
      const pos = currentPositions[element + "Position" as keyof typeof currentPositions];
      const size = componentSizes[element as keyof typeof componentSizes];
      if (!pos || !size) return;

      const bounds = {
        left: pos.x,
        right: pos.x + size.width,
        top: pos.y,
        bottom: pos.y + size.height,
        centerX: pos.x + size.width / 2,
        centerY: pos.y + size.height / 2,
      };

      // Horizontal alignment (top, center, bottom)
      const threshold = 5; // Pixels within which to snap
      if (Math.abs(draggingBounds.top - bounds.top) < threshold) {
        guides.push({
          type: "horizontal",
          position: bounds.top,
          start: Math.min(draggingBounds.left, bounds.left),
          end: Math.max(draggingBounds.right, bounds.right),
        });
        data.y = bounds.top; // Snap to alignment
      }
      if (Math.abs(draggingBounds.bottom - bounds.bottom) < threshold) {
        guides.push({
          type: "horizontal",
          position: bounds.bottom,
          start: Math.min(draggingBounds.left, bounds.left),
          end: Math.max(draggingBounds.right, bounds.right),
        });
        data.y = bounds.bottom - componentSizes[draggingElement as keyof typeof componentSizes].height;
      }
      if (Math.abs(draggingBounds.centerY - bounds.centerY) < threshold) {
        guides.push({
          type: "horizontal",
          position: bounds.centerY,
          start: Math.min(draggingBounds.left, bounds.left),
          end: Math.max(draggingBounds.right, bounds.right),
        });
        data.y = bounds.centerY - componentSizes[draggingElement as keyof typeof componentSizes].height / 2;
      }

      // Vertical alignment (left, center, right)
      if (Math.abs(draggingBounds.left - bounds.left) < threshold) {
        guides.push({
          type: "vertical",
          position: bounds.left,
          start: Math.min(draggingBounds.top, bounds.top),
          end: Math.max(draggingBounds.bottom, bounds.bottom),
        });
        data.x = bounds.left;
      }
      if (Math.abs(draggingBounds.right - bounds.right) < threshold) {
        guides.push({
          type: "vertical",
          position: bounds.right,
          start: Math.min(draggingBounds.top, bounds.top),
          end: Math.max(draggingBounds.bottom, bounds.bottom),
        });
        data.x = bounds.right - componentSizes[draggingElement as keyof typeof componentSizes].width;
      }
      if (Math.abs(draggingBounds.centerX - bounds.centerX) < threshold) {
        guides.push({
          type: "vertical",
          position: bounds.centerX,
          start: Math.min(draggingBounds.top, bounds.top),
          end: Math.max(draggingBounds.bottom, bounds.bottom),
        });
        data.x = bounds.centerX - componentSizes[draggingElement as keyof typeof componentSizes].width / 2;
      }
    });

    setAlignmentGuides(guides);
  };

  // Patterns (unchanged)
  const getPatternStyle = useCallback(() => {
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
  }, [settings.pattern, settings.textColor]);

  // Define the container dimensions based on shape
  const containerWidth = settings.shape === "rectangle" ? 300 : 400; // 300px for Rectangle, 400px for Square/Circle
  const containerHeight = settings.shape === "rectangle" ? 400 : 400; // 400px height for all shapes

  const containerStyle: React.CSSProperties = {
    backgroundColor: settings.backgroundColor,
    color: settings.textColor,
    borderRadius: settings.shape === "circle" ? "50%" : `${settings.cornerRadius}px`,
    position: "relative",
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    margin: "0 auto",
    boxShadow: "0 10px 20px rgba(100, 100, 100, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.3)",
    ...getPatternStyle(),
  };

  // Select the positions based on the current shape
  const currentPositions = settings.shape === "rectangle"
    ? settings.rectanglePositions
    : settings.shape === "square"
    ? settings.squarePositions
    : settings.circlePositions;

  const backgroundContainerStyle: React.CSSProperties = {
    ...(settings.backgroundImageUrl && {
      backgroundImage: `url(${settings.backgroundImageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: settings.backgroundOpacity,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: settings.shape === "circle" ? "50%" : `${settings.cornerRadius}px`,
      zIndex: 0,
    }),
  };

  return (
    <div
      className="rounded-3xl w-full max-w-md mx-auto relative acrylic-thickness overflow-visible"
      style={containerStyle}
      onClick={handleOutsideClick} // Deselect when clicking outside components
    >
      {/* Background image with opacity */}
      {settings.backgroundImageUrl && <div style={backgroundContainerStyle}></div>}

      {/* Alignment Guides */}
      {alignmentGuides.map((guide, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            zIndex: 10,
            backgroundColor: "black",
            ...(guide.type === "horizontal"
              ? {
                  top: guide.position,
                  left: guide.start,
                  width: guide.end - guide.start,
                  height: "2px",
                }
              : {
                  top: guide.start,
                  left: guide.position,
                  width: "2px",
                  height: guide.end - guide.start,
                }),
          }}
        />
      ))}

      {/* Content with exact positioning */}
      <div
        className="p-4 overflow-visible"
        style={{ position: "relative", zIndex: 1, width: `${containerWidth}px`, height: `${containerHeight}px` }}
      >
        {/* Table Number */}
        <Draggable
          position={currentPositions.tableNumberPosition}
          onDrag={handleDrag.bind(null, "tableNumber")}
          onStop={handleDragStop.bind(null, "tableNumber")}
          bounds={getElementBounds("tableNumber")}
          handle=".drag-handle"
        >
          <div className="absolute" onClick={(e) => handleComponentClick("tableNumber", e)}>
            <ResizableBox
              className={activeComponent === "tableNumber" ? "resizable-active" : ""}
              width={settings.tableNumberWidth}
              height={settings.tableNumberSize}
              minConstraints={[50, 20]}
              maxConstraints={getMaxConstraints(currentPositions.tableNumberPosition, 50, 20)}
              onResizeStop={handleResizeStop.bind(null, "tableNumber")}
              resizeHandles={["ne", "se", "sw", "nw"]}
            >
              <div className="relative">
                <div
                  className={`drag-handle cursor-move p-1 ${activeComponent === "tableNumber" ? "active" : ""}`}
                  style={{ willChange: "transform", textAlign: settings.tableNumberAlignment }}
                >
                  {editingComponent === "tableNumber" ? (
                    <Input
                      value={editText}
                      onChange={handleTextChange}
                      onBlur={() => handleTextSave("tableNumber")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleTextSave("tableNumber");
                        }
                      }}
                      autoFocus
                      onFocus={(e) => e.target.select()}
                      className="bg-transparent border-none p-0 m-0 w-full"
                      style={{ fontSize: `${settings.fontSize.tableNumber}px`, textAlign: settings.tableNumberAlignment, fontFamily: settings.tableNumberFont }}
                    />
                  ) : (
                    <div
                      style={{ ...getTextStyles(), fontSize: `${settings.fontSize.tableNumber}px`, textAlign: settings.tableNumberAlignment, fontFamily: settings.tableNumberFont }}
                      onDoubleClick={() => handleDoubleClick("tableNumber", settings.tableNumber)}
                    >
                      {settings.tableNumber}
                    </div>
                  )}
                </div>
              </div>
            </ResizableBox>
          </div>
        </Draggable>

        {/* Action Text */}
        <Draggable
          position={currentPositions.actionTextPosition}
          onDrag={handleDrag.bind(null, "actionText")}
          onStop={handleDragStop.bind(null, "actionText")}
          bounds={getElementBounds("actionText")}
          handle=".drag-handle"
        >
          <div className="absolute" onClick={(e) => handleComponentClick("actionText", e)}>
            <ResizableBox
              className={activeComponent === "actionText" ? "resizable-active" : ""}
              width={settings.actionTextWidth}
              height={settings.actionTextSize}
              minConstraints={[100, 20]}
              maxConstraints={getMaxConstraints(currentPositions.actionTextPosition, 100, 20)}
              onResizeStop={handleResizeStop.bind(null, "actionText")}
              resizeHandles={["ne", "se", "sw", "nw"]}
            >
              <div className="relative">
                <div
                  className={`drag-handle cursor-move p-1 ${activeComponent === "actionText" ? "active" : ""}`}
                  style={{ willChange: "transform", textAlign: settings.actionTextAlignment }}
                >
                  {editingComponent === "actionText" ? (
                    <Input
                      value={editText}
                      onChange={handleTextChange}
                      onBlur={() => handleTextSave("actionText")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleTextSave("actionText");
                        }
                      }}
                      autoFocus
                      onFocus={(e) => e.target.select()}
                      className="bg-transparent border-none p-0 m-0 w-full"
                      style={{ fontSize: `${settings.fontSize.actionText}px`, textAlign: settings.actionTextAlignment, fontFamily: settings.actionTextFont }}
                    />
                  ) : (
                    <div
                      style={{
                        ...getTextStyles(),
                        fontSize: `${settings.fontSize.actionText}px`,
                        maxWidth: "100%",
                        whiteSpace: "normal",
                        width: "100%",
                        textAlign: settings.actionTextAlignment,
                        fontFamily: settings.actionTextFont,
                      }}
                      onDoubleClick={() => handleDoubleClick("actionText", settings.actionText)}
                    >
                      {settings.actionText}
                    </div>
                  )}
                </div>
              </div>
            </ResizableBox>
          </div>
        </Draggable>

        {/* QR Code */}
        <Draggable
          position={currentPositions.qrCodePosition}
          onDrag={handleDrag.bind(null, "qrCode")}
          onStop={handleDragStop.bind(null, "qrCode")}
          bounds={getElementBounds("qrCode")}
          handle=".drag-handle"
        >
          <div className="absolute" onClick={(e) => handleComponentClick("qrCode", e)}>
            <ResizableBox
              className={activeComponent === "qrCode" ? "resizable-active" : ""}
              width={settings.qrCodeWidth}
              height={settings.qrCodeSize}
              minConstraints={[80, 80]}
              maxConstraints={getMaxConstraints(currentPositions.qrCodePosition, 80, 80)}
              onResizeStop={handleResizeStop.bind(null, "qrCode")}
              resizeHandles={["ne", "se", "sw", "nw"]}
            >
              <div className="relative">
                <div className={`drag-handle cursor-move p-1 ${activeComponent === "qrCode" ? "active" : ""}`} style={{ willChange: "transform" }}>
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
                </div>
              </div>
            </ResizableBox>
          </div>
        </Draggable>

        {/* Venue Name */}
        {settings.venueName && (
          <Draggable
            position={currentPositions.venueNamePosition}
            onDrag={handleDrag.bind(null, "venueName")}
            onStop={handleDragStop.bind(null, "venueName")}
            bounds={getElementBounds("venueName")}
            handle=".drag-handle"
          >
            <div className="absolute" onClick={(e) => handleComponentClick("venueName", e)}>
              <ResizableBox
                className={activeComponent === "venueName" ? "resizable-active" : ""}
                width={settings.venueNameWidth}
                height={settings.venueNameSize}
                minConstraints={[60, 20]}
                maxConstraints={getMaxConstraints(currentPositions.venueNamePosition, 60, 20)}
                onResizeStop={handleResizeStop.bind(null, "venueName")}
                resizeHandles={["ne", "se", "sw", "nw"]}
              >
                <div className="relative">
                  <div
                    className={`drag-handle cursor-move p-1 ${activeComponent === "venueName" ? "active" : ""}`}
                    style={{ willChange: "transform", textAlign: settings.venueNameAlignment }}
                  >
                    {editingComponent === "venueName" ? (
                      <Input
                        value={editText}
                        onChange={handleTextChange}
                        onBlur={() => handleTextSave("venueName")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleTextSave("venueName");
                          }
                        }}
                        autoFocus
                        onFocus={(e) => e.target.select()}
                        className="bg-transparent border-none p-0 m-0 w-full"
                        style={{ fontSize: `${settings.fontSize.venueName}px`, textAlign: settings.venueNameAlignment, fontFamily: settings.venueNameFont }}
                      />
                    ) : (
                      <div
                        style={{ ...getTextStyles(), fontSize: `${settings.fontSize.venueName}px`, textAlign: settings.venueNameAlignment, maxWidth: "100%", whiteSpace: "normal", width: "100%", fontFamily: settings.venueNameFont }}
                        onDoubleClick={() => handleDoubleClick("venueName", settings.venueName)}
                      >
                        {settings.venueName}
                      </div>
                    )}
                  </div>
                </div>
              </ResizableBox>
            </div>
          </Draggable>
        )}

        {/* Logo */}
        {settings.logoUrl && (
          <Draggable
            position={currentPositions.logoPosition}
            onDrag={handleDrag.bind(null, "logo")}
            onStop={handleDragStop.bind(null, "logo")}
            onStart={() => console.log("Logo Drag Start")} // Debug log
            bounds={getElementBounds("logo")}
            handle=".drag-handle"
          >
            <div className="absolute" onClick={(e) => handleComponentClick("logo", e)}>
              <ResizableBox
                className={activeComponent === "logo" ? "resizable-active" : ""}
                width={settings.logoWidth}
                height={settings.logoWidth}
                minConstraints={[20, 20]}
                maxConstraints={getMaxConstraints(currentPositions.logoPosition, 20, 20)}
                onResizeStop={handleResizeStop.bind(null, "logo")}
                resizeHandles={["ne", "se", "sw", "nw"]}
              >
                <div className="relative">
                  <div className={`drag-handle cursor-move p-1 ${activeComponent === "logo" ? "active" : ""}`} style={{ willChange: "transform" }}>
                    <img
                      src={settings.logoUrl}
                      alt="Venue Logo"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onDragStart={(e) => e.preventDefault()} // Prevent browser's default drag behavior
                    />
                  </div>
                </div>
              </ResizableBox>
            </div>
          </Draggable>
        )}
      </div>
    </div>
  );
});

export default CollateralPreview;