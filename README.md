# ShiftLab 🛡️

**A fast, accessible, zero-dependency Caesar Cipher workbench that runs entirely in your browser.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)
![Accessibility](https://img.shields.io/badge/a11y-semantic%20%26%20keyboard%20friendly-38bdf8)
![License](https://img.shields.io/badge/license-MIT-blue)

ShiftLab is a modern, dark-themed web tool for encrypting and decrypting text with the classic Caesar Cipher. It is built with vanilla HTML, CSS, and JavaScript, so there is no build step, no framework, and no data ever leaves your machine.

---

## Table of Contents

- [Key Features](#key-features)
- [Demo Example](#demo-example)
- [How It Works](#how-it-works)
- [Security Considerations & Limitations](#security-considerations--limitations)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Accessibility](#accessibility)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Key Features

- 🔐 **Encrypt & Decrypt modes**: switch with a single toggle. Decryption simply inverts the shift.
- 🔢 **Custom shift key**: any integer works, including negative values and values larger than the alphabet.
- ➗ **Modular arithmetic engine**: configurable alphabet length (modulo, 1–26) with correct wrap-around for negative and oversized shifts.
- 🔠 **Letter case controls**: *Maintain Case*, *Force Lowercase*, or *Force Uppercase*.
- 🧹 **Symbol & space filters**: keep punctuation, digits, and whitespace as-is, or strip them from the output.
- ⚡ **Instant, private processing**: everything runs client-side with no network requests.
- ♿ **Accessible by design**: semantic HTML, labelled controls, keyboard navigation, and live regions for results.
- 📱 **Responsive layout**: works from a phone screen to a widescreen monitor.

---

## Demo Example

| Setting         | Value            |
| --------------- | ---------------- |
| Mode            | Encrypt          |
| Shift Key       | 3                |
| Modulo          | 26               |
| Case Handling   | Maintain Case    |
| Symbols & Spaces | Ignore / Keep   |
| **Input**       | `Hello, World!`  |
| **Output**      | `Khoor, Zruog!`  |

Switch to **Decrypt** with the same shift and paste `Khoor, Zruog!` to recover the original message.

---

## How It Works

Each letter is mapped to a zero-based index, shifted, and wrapped back into the alphabet using modular arithmetic:

```text
newIndex = (index + (shift % modulo) + modulo) % modulo
```

- `shift % modulo` reduces large shifts to a single trip around the alphabet.
- Adding `modulo` before the final `%` guarantees a non-negative result, which makes negative shifts (and therefore decryption) work correctly.
- Uppercase letters are shifted relative to ASCII `65` (`A`), and lowercase letters relative to ASCII `97` (`a`), using `charCodeAt` and `String.fromCharCode`.
- If the modulo is smaller than 26, letters beyond that range are treated like any other foreign character (kept or removed according to your **Symbols & Spaces** setting).

---

## Security Considerations & Limitations

> ⚠️ **ShiftLab is an educational tool. Do not use the Caesar cipher to protect sensitive information.**

The Caesar cipher is one of the oldest known ciphers, and it has been cryptographically broken for centuries. It is a great way to learn the fundamentals, but it offers no real security:

1. **Tiny key space.** With a 26-letter alphabet there are only 25 meaningful shifts. An attacker can try every possible key (a *brute-force attack*) in microseconds, even by hand.
2. **Vulnerable to frequency analysis.** The cipher substitutes each letter with exactly one other letter, so the statistical fingerprint of the language survives. In English, `E`, `T`, and `A` are the most common letters. The most frequent letter in the ciphertext almost certainly maps to one of them, and that reveals the key immediately.
3. **Preserves structure.** Word lengths, spacing, punctuation, and capitalization patterns can leak information unless you strip them, and even then patterns such as common short words remain recognizable.
4. **Known-plaintext weakness.** If an attacker knows or guesses even a single letter pair, the shift is revealed.
5. **No integrity or authentication.** Ciphertext can be modified undetected, and there is no way to verify who created a message.
6. **Not a modern primitive.** The shift is a classical substitution, not a vetted algorithm. Nothing in this project should be reused in a security context.

**For real-world confidentiality**, use audited, modern cryptography such as AES-GCM or ChaCha20-Poly1305, built on a vetted library or the browser's [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).

---

## Local Development

ShiftLab is a static site, so there is nothing to install or compile.

### Prerequisites

- [Git](https://git-scm.com/)
- Any modern browser (Chrome, Firefox, Edge, or Safari)

### Setup

1. **Clone the repository**

```bash
   git clone https://github.com/<your-username>/shiftlab.git
   cd shiftlab
```

2. **Open the app in your browser**

   Double-click `index.html`, or open it from the terminal:

```bash
   # macOS
   open index.html

   # Linux
   xdg-open index.html

   # Windows (PowerShell)
   start index.html
```

3. **(Optional) Serve it locally**

   A local server is handy for testing on other devices on your network:

```bash
   # Python 3
   python -m http.server 8000
```

   Then visit [http://localhost:8000](http://localhost:8000).

### Quick Test Checklist

- [ ] Encrypt `Hello, World!` with shift `3` → `Khoor, Zruog!`
- [ ] Decrypt `Khoor, Zruog!` with shift `3` → `Hello, World!`
- [ ] Use a negative shift (e.g. `-3`) and confirm wrap-around (`a` → `x`)
- [ ] Use a large shift (e.g. `29`) and confirm it matches shift `3`
- [ ] Toggle each **Letter Case Handling** option
- [ ] Switch **Symbols & Spaces** to *Remove* and confirm punctuation is stripped
- [ ] Submit empty input and confirm a friendly message appears
- [ ] Navigate the entire form using only the keyboard

---

## Project Structure

```text
shiftlab/
├── index.html   # Semantic markup and form controls
├── style.css    # Dark-mode, responsive styling
├── script.js    # Cipher logic and DOM handling
└── README.md
```

---

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`) and a skip link
- Every control has a matching `<label>`, `id`, and `name`
- Mode selection is wrapped in a `<fieldset>` with a `<legend>`
- Visible focus rings on all interactive elements
- Status messages and output are exposed through `aria-live` regions
- Respects `prefers-reduced-motion` and forced-colors modes

---

## Roadmap

- [ ] Copy-to-clipboard button for the result
- [ ] Brute-force view that lists all 25 possible decryptions
- [ ] Letter-frequency chart to demonstrate frequency analysis
- [ ] Unicode and custom alphabet support
- [ ] Automated unit tests for the cipher function

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-idea`
3. Commit your changes: `git commit -m "Add amazing idea"`
4. Push to the branch: `git push origin feature/amazing-idea`
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for details.

---

<p align="center">Built for learning cryptography fundamentals. Remember: <strong>shift for fun, not for secrets.</strong></p>