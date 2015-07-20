/**
 * Created by JohnYeg on 7/20/15.
 */
var fancyHands = require('../dispatcher')

fancyHands.purchasePhoneNumberAsync({nearPhoneNumber: '+16196210102'})
  .then(function(purchasedNumber) {
    console.log('Yeay - I am proud owner of ' + purchasedNumber);
  })
  .catch(function(error) {
    console.error('Aw crap.');
    console.error(error);
  });

fancyHands.deleteAllPhoneNumbersAsync();