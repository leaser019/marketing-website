import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export function Error({ message, onRetry }: ErrorProps) {
  return (
    <Card className="w-full max-w-md mx-auto border-destructive/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-destructive">
          <ExclamationTriangleIcon className="size-5" />
          Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{message}</p>
        {onRetry && (
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="flex items-center"
          >
            <ArrowPathIcon className="mr-2 size-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}