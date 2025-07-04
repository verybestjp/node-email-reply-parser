/**
 * This file is part of node-email-reply-parser.
 * For the full license information, please see the LICENSE file distributed with this package.
 */

import cloneDeep from 'lodash-es/cloneDeep.js';
import filter from 'lodash-es/filter.js';
import map from 'lodash-es/map.js';

/**
 * Represents an email of fragments
 * @licence MIT License
 */
class Email {

    /**
     * Creates a new Email from a collection of Fragments
     * @param {Array<Fragment>} fragments the fragments that complete this email
     */
    constructor(fragments) {
        this._fragments = fragments;
    }

    /**
     * Gets all of the fragments for this email
     * @returns {Array<Fragment>} the fragments of this Email
     */
    getFragments() {
        return cloneDeep(this._fragments);
    }

    /**
     * Gets a string that represents the visible text of this Email
     * @returns {string} the visible text
     */
    getVisibleText(options = {}) {
        var visibleFragments;

        if (options.aggressive === true) {
            visibleFragments = filter(this._fragments, (f, index) => {
                if (this._fragments[index - 1]
                    && this._fragments[index + 1]
                    && this._fragments[index - 1].isHidden()
                    && this._fragments[index + 1].isHidden()) {
                    return false;
                }
                return !f.isHidden();
            });

        } else {
            visibleFragments = filter(this._fragments, f => !f.isHidden());
        }
        var fragmentBodies = map(visibleFragments, f => f.getContent());
        return fragmentBodies.join("\n");
    }
}

export default Email;
