
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LogoUploaderProps {
  onUpload: (imageUrl: string) => void;
  currentLogo: string | null;
}

const LogoUploader = ({ onUpload, currentLogo }: LogoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (jpg, png, svg, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          onUpload(e.target.result);
        }
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const handleRemoveLogo = () => {
    onUpload("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium mb-4">Upload Your Logo</h3>
        <p className="text-muted-foreground mb-6">
          Add your venue's logo to personalize your QR code collaterals.
        </p>
      </div>

      {currentLogo ? (
        <div className="flex flex-col items-center space-y-4 border border-dashed rounded-lg p-6 animate-fade-in">
          <img 
            src={currentLogo} 
            alt="Uploaded Logo" 
            className="max-h-48 max-w-full object-contain" 
          />
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Change Logo
            </Button>
            <Button variant="destructive" onClick={handleRemoveLogo}>
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Your Logo</h3>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Drag and drop your logo here, or click to select a file
            </p>
            <Label
              htmlFor="logo-upload"
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Select File
            </Label>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
            <p className="text-xs text-muted-foreground mt-4">
              Supports: JPG, PNG, SVG (max 5MB)
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">
            Processing...
          </span>
        </div>
      )}

      <div className="mt-6">
        <h4 className="text-md font-medium mb-2">Logo Requirements</h4>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>High resolution for best print quality</li>
          <li>Transparent background (PNG or SVG) recommended</li>
          <li>Keep it simple and recognizable at smaller sizes</li>
          <li>Your logo will be resized to fit the collateral design</li>
        </ul>
      </div>
    </div>
  );
};

export default LogoUploader;
