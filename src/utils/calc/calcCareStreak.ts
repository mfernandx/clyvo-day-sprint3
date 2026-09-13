import { DailyPetLog } from '../../model/DailyPetLog';

export function calculateCareStreak(logs: DailyPetLog[]) {
    if (!logs.length) return 0;

    const uniqueDates = [...new Set(
        logs.map(log => new Date(log.registeredAt).toISOString().split('T')[0])
    )].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const mostRecentDate = new Date(`${uniqueDates[0]}T00:00:00`);
    mostRecentDate.setHours(0, 0, 0, 0);

    const isToday = mostRecentDate.getTime() === today.getTime();
    const isYesterday = mostRecentDate.getTime() === yesterday.getTime();

    if (!isToday && !isYesterday) return 0;

    let streak = 1;
    let previousDate = mostRecentDate;

    for (let i = 1; i < uniqueDates.length; i++) {
        const currentDate = new Date(`${uniqueDates[i]}T00:00:00`);
        const expectedDate = new Date(previousDate);
        expectedDate.setDate(expectedDate.getDate() - 1);

        if (currentDate.getTime() === expectedDate.getTime()) {
            streak++;
            previousDate = currentDate;
        } else {
            break;
        }
    }

    return streak;
}