type TruncatedTextProps = {
    text: string;
    width: number;
};

export function TruncatedText({ text, width }: TruncatedTextProps) {
    return (
        <p
            className="truncate"
            style={{ "--text-width": `${width}px` } as React.CSSProperties}
        >
            {text}
        </p>
    );
}