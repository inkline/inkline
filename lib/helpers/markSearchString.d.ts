export interface MarkSearchStringPart {
    text: string;
    marked?: boolean;
}
export declare function markSearchString(text: string, query: string): MarkSearchStringPart[];
