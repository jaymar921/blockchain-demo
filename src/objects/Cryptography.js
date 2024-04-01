export async function sha256HashObject(obj) {
    const jsonString = JSON.stringify(obj);
    const buffer = new TextEncoder().encode(jsonString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function exportKeyAsHex(key, type) {
    const exportedKey = await window.crypto.subtle.exportKey(type, key);
    const exportedKeyArray = new Uint8Array(exportedKey);
    const exportedKeyHex = Array.from(exportedKeyArray)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    return exportedKeyHex;
}

export async function GenerateKey(){
    // Generate RSA key pair
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // Equivalent to 65537
            hash: { name: "SHA-256" }, // Use SHA-256 hash algorithm
        },
        true, // Can export private key
        ["sign", "verify"] // Key usages
    );

    // Export public key
    const publicKey = await exportKeyAsHex(keyPair.publicKey, 'spki');

    // Export private key
    const privateKey = await exportKeyAsHex(keyPair.privateKey, 'pkcs8');

    return {publicKey, privateKey}
}

async function importPrivateKey(privateKeyHex) {
    const privateKeyArray = Uint8Array.from(new TextEncoder().encode(privateKeyHex));
    const importedPrivateKey = await window.crypto.subtle.importKey(
        'pkcs8',
        privateKeyArray,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: { name: "SHA-256" },
        },
        true,
        ['sign']
    );
    return importedPrivateKey;
}

async function importPublicKey(publicKeyHex) {
    const publicKeyArray = Uint8Array.from(new TextEncoder().encode(publicKeyHex));
    const importedPublicKey = await window.crypto.subtle.importKey(
        'spki',
        publicKeyArray,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: { name: "SHA-256" },
        },
        true,
        ['verify']
    );
    return importedPublicKey;
}

export async function Sign(privateKeyHex, data){
    const signature = await window.crypto.subtle.sign(
        {
            name: "RSASSA-PKCS1-v1_5",
        },
        await importPrivateKey(privateKeyHex),
        new TextEncoder().encode(data)
    );

    return signature;
}

export async function VerifySignature(publicKeyHex, data, signature){
    const isValid = await window.crypto.subtle.verify(
        {
            name: "RSASSA-PKCS1-v1_5",
        },
        await importPublicKey(publicKeyHex),
        signature,
        new TextEncoder().encode(data)
    );

    return isValid;
}