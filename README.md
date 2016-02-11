# Joi18nz

[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Dependency Status][david-badge]][david-url]

Internacionlization(i18n) error messages for [Joi](https://github.com/hapijs/joi)

###  Getting Started
For using Joi18nz is very simple:
```javascript
'use strict';
const Joi = require('joi18nz')(require('joi'), __dirname + '/locale');
```
You must send to joi18nz an intance of Joi and the directory of the translation files.

After, initializing the module, you have the instance of Joi, and you can use that like you use Joi.

You can translate your messages, simple adding an extra option in your validate function.

```javascript
let schema = {
  name: Joi.string().required()
};

let value = {};

Joi.validate(value, schema, {i18n: 'pt_BR'}, function (err, data) {
  console.log(err, data);
});
// output
/*
{ [ValidationError: falha em "name", pois ["name" é obrigatório]]
  isJoi: true,
  name: 'ValidationError',
  details: 
   [ { message: '"name" é obrigatório',
       path: 'name',
       type: 'any.required',
       context: [Object] } ],
  _object: {},
  annotate: [Function] } {}
*/
```

For more information about how translate the tokens, you can see the `pt_BR` translation inside the `i18n` directory in this project.

**NOTE:** If you specify an invalid path to your folders we just use the default english version for the errors or the translations default in the `i18n` directory in this project.

After all, you just have a Joi instance, you can use that like you use Joi in your project, no incompatibilities with an existing implementation.

### Contribute

To contribute you can try to find an [issue or enchancment][0] and try to
implement it. Fork the project, implement the code, make tests and send the PR to the master branch.

### Testing

For testing you just need run `npm install && npm test` inside root folder of this project. 

### License

Copyright (c) 2016, Marcos Bérgamo <marcos@thedon.com.br>

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

[0]: https://github.com/thebergamo/joi18nz/issues?q=is%3Aopen+is%3Aenchancement+is%3Abug

[travis-badge]: https://api.travis-ci.org/thebergamo/joi18nz.svg?branch=master
[travis-url]: https://travis-ci.org/thebergamo/joi18nz
[coveralls-badge]:https://coveralls.io/repos/thebergamo/joi18nz/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/thebergamo/joi18nz?branch=master
[david-badge]: https://david-dm.org/thebergamo/joi18nz.svg
[david-url]: https://david-dm.org/thebergamo/joi18nz

