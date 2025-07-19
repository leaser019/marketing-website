import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';

function FeaturedFilmsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-7 bg-muted rounded-md w-3/4 mb-2"></div>
            <div className="h-5 bg-muted rounded-md w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded-md"></div>
              <div className="h-4 bg-muted rounded-md"></div>
              <div className="h-4 bg-muted rounded-md w-4/5"></div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="h-9 bg-muted rounded-md w-full"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export { FeaturedFilmsSkeleton };

