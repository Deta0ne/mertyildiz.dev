import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Web Developer 2</h1>
                <Button>Click me</Button>
            </div>
        </div>
    );
}
