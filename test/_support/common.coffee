'use strict'

global._ = require 'underscore'
global.assert = require 'assert'
global.sinon = require 'sinon'
chai = global.chai = require 'chai'
global.should = chai.should()
global.expect = chai.expect
global.AssertionError = chai.AssertionError
# chai.Assertion.includeStack = true

global.swallow = (thrower) ->
  try
    thrower()
  catch e
    console.error e

chai.use require 'chai-changes'
chai.use require 'sinon-chai'
