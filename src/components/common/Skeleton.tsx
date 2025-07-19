import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';

function FilmDetailSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6 gap-4">
        <div className="h-9 w-9 bg-muted rounded-md"></div>
        <div className="h-8 bg-muted rounded-md w-64"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="flex gap-4 mb-4">
                <div className="h-5 bg-muted rounded-md w-24"></div>
                <div className="h-5 bg-muted rounded-md w-32"></div>
              </div>
              <div className="h-6 bg-muted rounded-md w-40"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="h-6 bg-muted rounded-md w-24 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded-md"></div>
                  <div className="h-4 bg-muted rounded-md"></div>
                  <div className="h-4 bg-muted rounded-md"></div>
                </div>
              </div>
              <div>
                <div className="h-6 bg-muted rounded-md w-32 mb-2"></div>
                <div className="h-4 bg-muted rounded-md w-40"></div>
              </div>
            </CardContent>
          </Card>
          
          <div className="h-8 bg-muted rounded-md w-40 mt-8 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-5 bg-muted rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded-md w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded-md"></div>
                    <div className="h-4 bg-muted rounded-md"></div>
                    <div className="h-4 bg-muted rounded-md"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded-md w-32"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="h-5 bg-muted rounded-md w-24 mb-2"></div>
                <div className="h-2 bg-muted rounded-full mb-2"></div>
                <div className="h-4 bg-muted rounded-md w-36"></div>
              </div>
              <div>
                <div className="h-5 bg-muted rounded-md w-24 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-9 bg-muted rounded-md"></div>
                  <div className="h-9 bg-muted rounded-md"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

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

function FilmsListSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="h-8 bg-muted rounded-md w-64"></div>
        <div className="flex items-center gap-2">
          <div className="h-9 bg-muted rounded-md w-32"></div>
          <div className="h-9 bg-muted rounded-md w-32"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-7 bg-muted rounded-md w-3/4 mb-2"></div>
              <div className="h-5 bg-muted rounded-md w-1/2 mb-1"></div>
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
    </div>
  );
}

function CharactersGridSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="h-8 bg-muted rounded-md w-64"></div>
        <div className="h-10 bg-muted rounded-md w-full md:w-64"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(8).fill(0).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded-md w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded-md"></div>
                <div className="h-4 bg-muted rounded-md"></div>
                <div className="h-4 bg-muted rounded-md"></div>
                <div className="h-4 bg-muted rounded-md"></div>
                <div className="h-4 bg-muted rounded-md"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export { CharactersGridSkeleton, FeaturedFilmsSkeleton, FilmDetailSkeleton, FilmsListSkeleton };

