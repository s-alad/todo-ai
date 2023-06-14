export default function uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function iuid() {
    return Math.random() * 10000000;
}