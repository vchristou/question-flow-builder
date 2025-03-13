
import React from "react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  retry?: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ 
  isOpen, 
  onClose, 
  message, 
  retry 
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Σφάλμα
          </AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {retry && (
            <AlertDialogAction onClick={retry} className="bg-primary hover:bg-primary/90">
              Προσπαθήστε ξανά
            </AlertDialogAction>
          )}
          <AlertDialogAction onClick={onClose}>
            Κλείσιμο
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ErrorDialog;
