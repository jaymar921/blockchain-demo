export async function sha256HashObject(obj) {
    const jsonString = JSON.stringify(obj);
    const buffer = new TextEncoder().encode(jsonString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export async function GenerateKey(){
    // Generate RSA key pair
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 4096,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // Equivalent to 65537
            hash: { name: "SHA-256" }, // Use SHA-256 hash algorithm
        },
        true, // Can export private key
        ["sign", "verify"] // Key usages
    );

    // Export public key
    const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);

    // Export private key
    const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
    return {publicKey, privateKey}
}

export async function Sign(privateKey, data){
    const signature = await window.crypto.subtle.sign(
        {
            name: "RSASSA-PKCS1-v1_5",
        },
        privateKey,
        new TextEncoder().encode(data)
    );

    return signature;
}

export async function VerifySignature(publicKey, data, signature){
    const isValid = await window.crypto.subtle.verify(
        {
            name: "RSASSA-PKCS1-v1_5",
        },
        publicKey,
        signature,
        new TextEncoder().encode(data)
    );

    return isValid;
}