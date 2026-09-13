export const MAX_DURATION_SECONDS = 99 * 60 * 60 + 59 * 60 + 59;

export function formatTime(durationSeconds: number): string {
    const hours = Math.floor(durationSeconds / 60 / 60);
    const minutes = Math.floor(durationSeconds / 60 - hours * 60);
    const seconds = Math.floor(durationSeconds - hours * 60 * 60 - minutes * 60);

    const formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;

    return formattedTime;
}

function formatNumber(number: number): string {
    return number.toString().padStart(2, "0");
}

export function parseTime(input: string): number | null {
    const regex = /^\d{2}:\d{2}:\d{2}$/;

    const isValidInput = input.match(regex);
    if (!isValidInput) return null;

    const numbers = input.split(":");

    if (Number(numbers[1]) > 59 || Number(numbers[2]) > 59) return null;

    const durationSeconds =
        Number(numbers[0]) * 60 * 60 + Number(numbers[1]) * 60 + Number(numbers[2]);

    return durationSeconds <= MAX_DURATION_SECONDS ? durationSeconds : null;
}
