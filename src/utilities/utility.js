export const formatNumberToCurrency = (value) => {
    return parseFloat(value).toFixed(2).toString();
}

export function hexStringToArrayBuffer(hexString) {
    const bytes = new Uint8Array(Math.ceil(hexString.length / 2));
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
    }
    return bytes.buffer;
}

export async function hexToSignatureArrayBuffer(signatureHex) {
    const signatureArray = new Uint8Array(hexStringToArrayBuffer(signatureHex));
    return signatureArray.buffer;
}

export function arrayBufferToHexString(arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);
    const hexChars = [];
    for (let i = 0; i < uint8Array.length; i++) {
        const hex = uint8Array[i].toString(16).padStart(2, '0');
        hexChars.push(hex);
    }
    return hexChars.join('');
}

export function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    // The maximum is inclusive and the minimum is inclusive
}

export function IsMobile(){
    return window.innerWidth <= 550;
}