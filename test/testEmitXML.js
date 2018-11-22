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
/* eslint-env mocha */
const assert = require('assert');
const winston = require('winston');
const emit = require('../src/xml/emit-xml');

const logger = winston.createLogger({
  // tune this for debugging
  level: 'debug',
  // and turn this on if you want the output
  silent: true,
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

const payload = {
  content: {
    xml: {
      document: {
        title: {
          '#text': 'Bill, Welcome to the future',
          '@level': 1,
        },
      },
    },
  },
  response: {},
};

const expectedXML = '<?xml version="1.0" encoding="utf-8"?><document><title level="1">Bill, Welcome to the future</title></document>';

describe('Test emit-xml', () => {
  it('builds XML from object', () => {
    const output = emit(payload, { logger });
    assert.deepEqual(output.response.body, expectedXML);
  });

  it('fails gracefully in case of invalid object', () => {
    payload.content.xml = /bla/; // unexpected RegExp object which will break xmlbuilder-js
    assert.deepEqual(emit(payload, { logger }), {});
  });

  it('does nothing if no object specified', () => {
    payload.content.xml = undefined;
    assert.deepEqual(emit(payload, { logger }), {});
  });

  it('keeps existing response body', () => {
    payload.content.xml = undefined;
    payload.response.body = expectedXML;
    assert.deepEqual(emit(payload, { logger }), {});
  });
});
