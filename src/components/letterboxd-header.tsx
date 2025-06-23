import { Film } from 'lucide-react';

export default function LetterboxdHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    <Film className="w-10 h-10 text-primary" />
                    Recent Watches
                </h1>
                <p className="text-muted-foreground">My latest film activity from Letterboxd</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0"></div>
        </div>
    );
}
