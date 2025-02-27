
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  imageSrc: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template;
  onSelect: (template: Template) => void;
}

const TemplateSelector = ({
  templates,
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
        <p className="text-muted-foreground mb-6">
          Select a design that best matches your venue's style.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template, index) => (
          <Card
            key={template.id}
            className={cn(
              "template-card cursor-pointer hover-scale overflow-hidden",
              selectedTemplate.id === template.id ? "selected" : "",
              `stagger-${index % 3 + 1} animate-scale-in`
            )}
            onClick={() => onSelect(template)}
          >
            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={template.imageSrc}
                  alt={template.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">{template.name}</span>
                </div>
              </div>
              <div className="p-3 flex items-center">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center",
                    selectedTemplate.id === template.id
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300"
                  )}
                >
                  {selectedTemplate.id === template.id && (
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
                  className={cn(
                    "text-sm",
                    selectedTemplate.id === template.id
                      ? "font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {template.name}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
