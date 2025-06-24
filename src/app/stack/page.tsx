import { Button } from '@/components/ui/button';
import { FloatingHeader } from '@/components/floating-header';

export default function StackPage() {
    return (
        <>
            <FloatingHeader scrollTitle="Stack & Tools" />
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Stack & Tools</h1>
                    <p className="text-muted-foreground mb-4">Technologies and tools I use</p>
                    <Button>Coming Soon</Button>
                </div>
            </div>
        </>
    );
}
