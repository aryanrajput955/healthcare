// Simple obfuscation to prevent casual URL tampering
// Not suitable for highly sensitive data, but enough for role invite links

export const encodeInvite = (email, role) => {
    try {
        const payload = JSON.stringify({ e: email, r: role });
        // Convert to base64
        const b64 = btoa(payload);
        // Reverse the base64 string and add some padding to make it look hashed
        const reversed = b64.split("").reverse().join("");
        // Add a random 4-character prefix and suffix
        const prefix = Math.random().toString(36).substring(2, 6);
        const suffix = Math.random().toString(36).substring(2, 6);
        return `${prefix}${reversed}${suffix}`;
    } catch (error) {
        return "";
    }
};

export const decodeInvite = (token) => {
    try {
        if (!token || token.length < 8) return null;
        // Remove the 4-char prefix and suffix
        const stripped = token.slice(4, -4);
        // Reverse back to normal base64
        const b64 = stripped.split("").reverse().join("");
        // Decode base64
        const payload = atob(b64);
        const data = JSON.parse(payload);
        if (data.e && data.r) {
            return { email: data.e, role: data.r };
        }
        return null;
    } catch (error) {
        return null;
    }
};
