/**
 * Created by JohnYeg on 7/19/15.
 */
var should = require('chai').should(),
	dispatcher = require('../dispatcher'),
	buy = dispatcher.purchasePhoneNumberAsync,
	sell = dispatcher.deleteAllPhoneNumbersAsync;

describe('#purchase', function() {
	it('validates input', function() {
		buy().should.equal(Error ( 'Input not correctly formatted, ex: {nearPhoneNumber: +16196210102}' ));
	});

	it('buys number in area code.', function() {
		buy({nearPhoneNumber: '+16196210102'}).should.not.throw('Input not correctly formatted, ex: {nearPhoneNumber: +16196210102}');
	});

});


describe('#delete', function() {

});