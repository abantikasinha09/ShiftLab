/**
 * ShiftLab — Caesar Cipher logic
 * Reads the form configuration, transforms the input text, and writes
 * the result to the read-only output textarea.
 */
(() => {
    "use strict";

    // ---------- Constants ----------
    const UPPER_BASE = 65;   // ASCII code for 'A'
    const LOWER_BASE = 97;   // ASCII code for 'a'
    const MAX_MODULO = 26;   // Letters available in the Latin alphabet
    const DEFAULT_MODULO = 26;

    // ---------- DOM references ----------
    const form = document.getElementById("cipher-form");
    const shiftInput = document.getElementById("shift-key");
    const moduloInput = document.getElementById("modulo");
    const caseSelect = document.getElementById("case-handling");
    const symbolSelect = document.getElementById("symbol-handling");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");
    const statusEl = document.getElementById("form-status");

    // ---------- Helpers ----------

    /** Parse a base-10 integer, falling back to a default when invalid. */
    const parseIntOr = (value, fallback) => {
        const parsed = parseInt(value, 10);
        return Number.isNaN(parsed) ? fallback : parsed;
    };

    /** Show a message in the status region (empty string clears it). */
    const setStatus = (message = "") => {
        statusEl.textContent = message;
    };

    /**
     * Shift a letter index (0-based) with correct modular wrap-around.
     * Handles negative shifts (decryption) and shifts larger than the modulo.
     */
    const shiftIndex = (index, shift, modulo) =>
        (index + (shift % modulo) + modulo) % modulo;

    /**
     * Transform text with a Caesar shift.
     * @param {string} text        Source text.
     * @param {number} shift       Signed shift (already inverted for decrypt).
     * @param {number} modulo      Alphabet length (1–26).
     * @param {string} caseMode    "maintain" | "lowercase" | "uppercase".
     * @param {string} symbolMode  "ignore" | "remove".
     * @returns {string}
     */
    const caesar = (text, shift, modulo, caseMode, symbolMode) => {
        const result = [];

        for (const char of text) {
            let code = char.charCodeAt(0);

            // Apply the letter-case rule before shifting so the base code matches.
            if (caseMode === "lowercase" && code >= UPPER_BASE && code < UPPER_BASE + 26) {
                code += 32;
            } else if (caseMode === "uppercase" && code >= LOWER_BASE && code < LOWER_BASE + 26) {
                code -= 32;
            }

            // Identify which alphabet (if any) the character belongs to.
            let base = null;
            if (code >= UPPER_BASE && code < UPPER_BASE + 26) base = UPPER_BASE;
            else if (code >= LOWER_BASE && code < LOWER_BASE + 26) base = LOWER_BASE;

            // Letters beyond the chosen alphabet length (when modulo < 26) are
            // treated like any other foreign character.
            const isShiftable = base !== null && code - base < modulo;

            if (isShiftable) {
                const shifted = shiftIndex(code - base, shift, modulo);
                result.push(String.fromCharCode(base + shifted));
            } else if (symbolMode !== "remove") {
                // Keep spaces, punctuation, digits, and non-ASCII characters as-is.
                result.push(char);
            }
            // symbolMode === "remove": the character is dropped.
        }

        return result.join("");
    };

    // ---------- Event handling ----------

    const handleProcess = (event) => {
        event.preventDefault(); // Stay on the page; works for click and Enter key.
        setStatus();

        // 1. Read configuration.
        const mode = form.elements["mode"].value; // "encrypt" | "decrypt"
        let shift = parseIntOr(shiftInput.value, 0);
        let modulo = parseIntOr(moduloInput.value, DEFAULT_MODULO);
        const caseMode = caseSelect.value;
        const symbolMode = symbolSelect.value;
        const text = inputText.value;

        // 2. Validate the modulo (must be a positive size within the Latin alphabet).
        if (modulo < 1) {
            modulo = DEFAULT_MODULO;
            moduloInput.value = modulo;
            setStatus("Alphabet length must be at least 1. Reset to 26.");
        } else if (modulo > MAX_MODULO) {
            modulo = MAX_MODULO;
            moduloInput.value = modulo;
            setStatus("Alphabet length can't exceed 26 letters. Adjusted to 26.");
        }

        // 3. Handle empty input gracefully.
        if (text.length === 0) {
            outputText.value = "";
            setStatus("Please enter some text to process.");
            inputText.focus();
            return;
        }

        // 4. Decryption is simply a shift in the opposite direction.
        if (mode === "decrypt") shift = -shift;

        // 5. Transform and display the result.
        outputText.value = caesar(text, shift, modulo, caseMode, symbolMode);
    };

    form.addEventListener("submit", handleProcess);
})();