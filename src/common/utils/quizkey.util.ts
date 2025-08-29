export function generateRoomKey(minLength = 4, maxLength = 6): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    let key = "";
    for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}
