/**
 * Created by JohnYeg on 7/18/15.
 *
 	The goal is to implement a node module which interacts with Twilio's API and purchases a phone number.

 	The module should accept a phone number and attempt to purchase another number in the same area code.
 	If no phone number is available in the same area code, it should purchase a phone number which is in
 	the same state as the input phone number.

	 Additionally, the module should expose a function that deletes all phone numbers that are associacted
 	with the Twilio Account. (While you're testing this implementation, don't worry about deleting pre-existing numbers)
 */
// Twilio Credentials
var accountSid = 'ACfb37bf4634ab94764c5aac4293f31ce3';
var authToken = '4e937b83d5c8893829ca4538ff77d21b';

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);
var Q = require("q");

module.exports = {
	//{nearPhoneNumber: '+16196210102'}
	purchasePhoneNumberAsync : function(number) {
		if(!number){
			return new Error ( 'Input not correctly formatted, ex: {nearPhoneNumber: +16196210102}' );
		}else{

			// Need to access the area code.
			var areaCode = number['nearPhoneNumber'].substr(2,3);

			return (client.availablePhoneNumbers('US').local.get({
				areaCode:areaCode
			}).then(function(searchResults) {

				// handle the case where there are no numbers found
				if (searchResults.availablePhoneNumbers.length < 1) {
					throw { message:'No numbers found with that area code' };
				}

				// Okay, so there are some available numbers.  Now, let's buy the first one
				// in the list.  Return the promise created by the next call to Twilio:
				return client.incomingPhoneNumbers.create({
					phoneNumber:searchResults.availablePhoneNumbers[0].phoneNumber
				});

			}).then(function(number){
				// We bought the number!  Everything worked!
				console.log('Your new number: '+number.phoneNumber);
				return number.phoneNumber;
			}).fail(function(error){
				// This callback will be invoked on any error returned in the
				// process.
				console.log('Number purchase failed! Reason: '+error.message);
			}));

		}
	},

	/**
	 * Remove all numbers from Dispatcher account.
	 *
	 * @return
	 */
	deleteAllPhoneNumbersAsync : function(){

		client.incomingPhoneNumbers.list({

		}).then(function(searchResults) {

			// handle the case where there are no numbers found
			if (searchResults.incoming_phone_numbers.length < 1) {
				throw { message:'No numbers found with that area code' };
			}

			// list of available numbers. for each attempt a delete.
			return searchResults.incoming_phone_numbers.forEach(function(number){
				client.incomingPhoneNumbers(number.sid).delete();
			});

		}).fail(function(error){
			// This callback will be invoked on any error returned in the
			// process.
				console.log('Number delete failed! Reason: '+error.message);
		});
	}
};
