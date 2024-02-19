"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapText = exports.capitalizeFirstLetter = exports.getRandomElement = void 0;
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.getRandomElement = getRandomElement;
function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function wrapText(text, maxLineWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";
    words.forEach((word) => {
        if ((currentLine + word).length > maxLineWidth) {
            lines.push(currentLine.trim());
            currentLine = word + " ";
        }
        else {
            currentLine += word + " ";
        }
    });
    if (currentLine) {
        lines.push(currentLine.trim());
    }
    return lines;
}
exports.wrapText = wrapText;
//# sourceMappingURL=utils.js.map