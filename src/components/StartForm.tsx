
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface StartFormProps {
  onSubmit: (details: {
    venueName: string;
    tableCount: number;
    duplicates: boolean;
  }) => void;
}

const StartForm = ({ onSubmit }: StartFormProps) => {
  const [venueName, setVenueName] = useState("");
  const [tableCount, setTableCount] = useState(1);
  const [duplicates, setDuplicates] = useState(false);
  const [errors, setErrors] = useState<{ venueName?: string; tableCount?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { venueName?: string; tableCount?: string } = {};
    
    if (!venueName.trim()) {
      newErrors.venueName = "Venue name is required";
    }
    
    if (tableCount < 1) {
      newErrors.tableCount = "You need at least 1 table";
    } else if (tableCount > 500) {
      newErrors.tableCount = "Maximum 500 tables allowed";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        venueName: venueName.trim(),
        tableCount,
        duplicates,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <Label htmlFor="venueName" className="text-base">
            Venue Name
          </Label>
          <Input
            id="venueName"
            placeholder="Enter your venue name"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            className="mt-1"
          />
          {errors.venueName && (
            <p className="text-sm text-destructive mt-1">{errors.venueName}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="tableCount" className="text-base">
            Number of Tables
          </Label>
          <Input
            id="tableCount"
            type="number"
            min={1}
            max={500}
            value={tableCount}
            onChange={(e) => setTableCount(parseInt(e.target.value) || 0)}
            className="mt-1"
          />
          {errors.tableCount && (
            <p className="text-sm text-destructive mt-1">{errors.tableCount}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            How many QR code collaterals do you need?
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="duplicates" 
            checked={duplicates}
            onCheckedChange={(checked) => setDuplicates(checked === true)}
          />
          <Label htmlFor="duplicates" className="text-base font-normal">
            I need duplicate collaterals for each table
          </Label>
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Start Customizing
      </Button>
    </form>
  );
};

export default StartForm;
