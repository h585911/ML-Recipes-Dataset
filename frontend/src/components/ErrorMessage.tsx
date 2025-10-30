import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
      <p className="text-sm text-destructive">{message}</p>
    </div>
  );
}
