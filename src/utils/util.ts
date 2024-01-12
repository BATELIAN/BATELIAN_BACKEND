export function generateRandom4DigitString() {
    const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
    return String(random4DigitNumber);
}
