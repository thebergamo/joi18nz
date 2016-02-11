'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('code').expect;
const joi = require('joi');

lab.experiment('Initialize Joi18nz', () => {
  lab.test('throws an error if no Joi instance sended in constructor', (done) => {
    expect(require('../index')).to.throw(TypeError, 'Joi is required');
    return done();
  });

  lab.test('return a Joi instance if an instance of Joi is sended', (done) => {
    expect(require('../index')(joi)).to.include({isJoi: true});
    return done();
  });
});

lab.experiment('Validate Schemas', () => {
  let Joi = require('../index')(joi);
  const schema = {
    name: Joi.string().required(),
    isPlayer: Joi.boolean().optional()
  };

  let value = {
    name: 'Marcos',
    isPlayer: true
  };

  lab.test('when no i18n option is sended (default Joi behavior)', (done) => {
    Joi.validate(value, schema, (err, data) => {
      expect(err).to.be.null();
      expect(data).to.include(value);
      return done();
    });
  });

  lab.test('when no i18n option is sended (default Joi behavior sync version)', (done) => {
    let result = Joi.validate(value, schema);
    expect(result.error).to.be.null();
    expect(result.value).to.include(value);
    return done();
  });

  lab.test('when no i18n option is send, and just the value is send (default Joi behavior)', (done) => {
    Joi.validate(value, (err, data) => {
      expect(err).to.be.null();
      expect(data).to.include(value);
      return done();
    });
  });

  lab.test('when a i18n options is sended, but no file match `file`', (done) => {
    Joi.validate({}, schema, {i18n: 'pt_BR'}, (err, data) => {
      expect(err).to.include({isJoi: true, name: 'ValidationError'});
      expect(err.details).to.deep.include([{message: '"name" is required'}]);
      return done();
    });
  });

  lab.test('when a i18n option is sended and a correct directory haven`t the translation `file`', (done) => {
    Joi = require('../index')(joi, __dirname + '/../i18n');
    Joi.validate({}, schema, {i18n: 'es'}, (err, data) => {
      expect(err).to.include({isJoi: true, name: 'ValidationError'});
      expect(err.details).to.deep.include([{message: '"name" is required'}]);
      return done();
    });
  });

  lab.test('when a i18n option is sended and a correct directory have the translation `file`', (done) => {
    Joi = require('../index')(joi, __dirname + '/../i18n');
    Joi.validate({}, schema, {i18n: 'pt_BR'}, (err, data) => {
      expect(err).to.include({isJoi: true, name: 'ValidationError'});
      expect(err.details).to.deep.include([{message: '"name" é obrigatório'}]);
      return done();
    });
  });
});
