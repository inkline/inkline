export interface MarkSearchStringPart {
    text: string;
    marked?: boolean
}

export function markSearchString (text: string, query: string): MarkSearchStringPart[] {
    if (!query) return [{ text }];

    const chunks = [];

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    let start = 0;
    let end = 0;

    while (end < text.length) {
        const foundIdx = lowerText.indexOf(lowerQuery, end);
        const found = foundIdx >= 0;

        end = found ? foundIdx : text.length;

        if (end) {
            chunks.push({ text: text.substring(start, end) });
            start = end;
        }

        if (found) {
            end += query.length;

            chunks.push({
                text: text.substring(start, end),
                marked: true
            });

            start = end;
        }
    }

    return chunks;
}
