
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultPageProps {
  finalUrl: string;
  onReset: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ finalUrl, onReset }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(finalUrl)
      .then(() => {
        setCopied(true);
        toast({
          title: "Επιτυχία!",
          description: "Ο σύνδεσμος αντιγράφηκε στο πρόχειρο",
        });
        
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Σφάλμα",
          description: "Δεν ήταν δυνατή η αντιγραφή του συνδέσμου",
        });
      });
  };

  return (
    <div className="questionnaire-container">
      <Card className="border-2 border-primary/10">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">Τα αποτελέσματά σας είναι έτοιμα!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Έχουμε δημιουργήσει έναν προσαρμοσμένο σύνδεσμο με βάση τις απαντήσεις σας:
          </p>
          
          <div className="p-3 bg-secondary rounded-md relative overflow-hidden">
            <div className="overflow-x-auto whitespace-nowrap font-mono text-sm">
              {finalUrl}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={handleCopyUrl} variant="outline" className="flex gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Αντιγράφηκε!" : "Αντιγραφή συνδέσμου"}
            </Button>
            
            <Button asChild className="flex gap-2">
              <a href={finalUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Άνοιγμα συνδέσμου
              </a>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" onClick={onReset} className="flex gap-2">
            <ArrowLeft className="h-4 w-4" />
            Επιστροφή στην αρχή
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultPage;
