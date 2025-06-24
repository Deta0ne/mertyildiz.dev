import Image from 'next/image';
import { GitCommit, Calendar } from 'lucide-react';
import type { GitHubProfileData } from '@/lib/github-service';

interface ProfileHeaderProps {
    user: GitHubProfileData['user'];
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    const joinedDate = new Date(user.createdAt).getFullYear();

    return (
        <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-105 transition-transform"
                >
                    <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                        priority
                    />
                </a>

                <div className="text-center sm:text-left space-y-0">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground text-lg">{user.bio || 'Frontend Developer'}</p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <GitCommit className="w-4 h-4" />
                            <span>{user.contributionsCollection.totalCommitContributions} commits this year</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Joined {joinedDate}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
