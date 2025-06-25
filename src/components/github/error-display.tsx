import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
    error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-destructive">Error Loading GitHub Data</h1>
                <p className="text-muted-foreground">{error}</p>
                <Button asChild>
                    <a href="/github">Try Again</a>
                </Button>
            </div>
        </div>
    );
}
