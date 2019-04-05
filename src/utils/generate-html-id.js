/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const XRegExp = require('xregexp');

module.exports = {
  /**
   * Generates a valid HTML identifier from the string
   * @param {string} text The text to use to generate the identifier
   * @returns {string} the string for the identifier
   */
  generateId: (text) => {
    const unicodeWord = XRegExp('[^\\pL\\pN _-]+', 'g'); // Accept unicode letters, numbers, space, underscore and '-'
    return text.toLowerCase()
      .replace(/\s/g, '-') // replace white-spaces by '-'
      .replace(unicodeWord, ''); // remove all non-letters
  },

};
