import { useEffect, useRef, useState } from 'react';
import { useApi } from '@/ApiProvider';

export const useReadingTracker = (topicName: string | null, isEnabled: boolean = true) => {
    const _ = useApi();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [timeSpent, setTimeSpent] = useState(0); // Seconds
    const SYNC_INTERVAL = 30 * 1000;

    useEffect(() => {
        if (!topicName || !isEnabled) return;

        // Timer to update local UI every second
        const timer = setInterval(() => {
            if (document.visibilityState === 'visible') {
                setTimeSpent(prev => prev + 1);
            }
        }, 1000);

        const syncProgress = async () => {
            if (document.visibilityState === 'visible') {
                try {
                    await _.api.progress.trackTime(topicName, 30);
                    // console.log('Progress synced');
                } catch (error) {
                    console.error('Failed to sync progress', error);
                }
            }
        };

        intervalRef.current = setInterval(syncProgress, SYNC_INTERVAL);

        return () => {
            clearInterval(timer);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [topicName, isEnabled, _.api.progress]);

    // Format time helper
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return { timeSpent, formatTime };
};
