export function cutText(text: string, characterLimit: number): string {
    if (text.length <= characterLimit) {
        return text;
    }

    return text.slice(0, characterLimit).trimEnd() + "...";
}