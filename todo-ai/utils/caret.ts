export function getCaretCoordinates() {
    let x, y;
    const isSupported: boolean = typeof window.getSelection !== "undefined";

    if (isSupported) {
        const selection = window.getSelection() as Selection;
        if (selection.rangeCount !== 0) {
            const range: Range = selection.getRangeAt(0).cloneRange();
            range.collapse(true);
            const rect = range.getClientRects()[0];
            if (rect) {
                x = rect.left;
                y = rect.top;
            }
        }
    }

    return { x, y };
}

export function setCaretToEnd(e: any) {
    const range: Range = document.createRange();
    const selection: Selection = window.getSelection() as Selection;
    range.selectNodeContents(e);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    e.focus();
}