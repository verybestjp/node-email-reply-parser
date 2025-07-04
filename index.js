/**
 * This file is part of node-email-reply-parser.
 * For the full license information, please see the LICENSE file distributed with this package.
 */

import Parser from "./lib/Parser.js";

/**
 * Parses the given text into an email
 * @param {string} text the email text to parse
 * @param {boolean} [visibleTextOnly] if true, the visible text will be returned instead of an Email
 * @returns {Email|string} the parsed Email or visible text, depending on the second argument
 */
function parse(text, visibleTextOnly) {
    var parser = new Parser();
    var email = parser.parse(text);

    if (visibleTextOnly) {
        if (!email) return '';
        else return email.getVisibleText();
    } else return email;
}

export default parse;

// Only run this code if we're the main entry point (useful for quick testing locally)
// Only run this code if we're the main entry point (useful for quick testing locally)
if (import.meta.url === `file://${process.argv[1]}`) {
    // we only import fs and path here because it is bloat to the library otherwise
    const fs = await import('fs');
    const path = await import('path');

    if (process.argv.length != 3) {
        console.error("Invalid argument. Syntax: node index.js <file path>");
        process.exit(1);
    }

    var fileContents = fs.default.readFileSync(process.argv[2], 'utf8');
    var text = parse(fileContents, true);

    console.log(text);
}