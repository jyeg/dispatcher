## Dispatcher Coding Challenge I

### Task

The goal is to implement a node module which interacts with Twilio's API and purchases a phone number.
The module should accept a phone number and attempt to purchase another number in the same area code.
If no phone number is available in the same area code, it should purchase a phone number which is in the same state as the input phone number.

Additionally, the module should expose a function that deletes all phone numbers that are associacted with the Twilio Account. (While you're testing this implementation, don't worry about deleting pre-existing numbers)

### Assumptions you can make

The input phone number follows E164 specifications and is a US phone number. You can use any node module you deem helpful.

### Desired Usage

```javascript
var fancyHands = require('yourModule');

fancyHands.purchasePhoneNumberAsync({nearPhoneNumber: '+16196210102'})
  .then(function(purchasedNumber) {
    console.log('Yeay - I am proud owner of ' + purchasedNumber);
  })
  .catch(function(error) {
    console.error('Aw crap.');
    console.error(error);
  });
  
fancyHands.deleteAllPhoneNumbersAsync();  
```

### Test cases that might be helpful

Area code 619 is not exhausted yet.
Area code 212 is already exhausted (e.g. another phone number in NY needs to be purchased).

### Helpful Resources

Twilio offers an API explorer you can use to interact with their API.
Useful APIs for this task might be
- https://www.twilio.com/user/account/developer-tools/api-explorer/available-local
- https://www.twilio.com/user/account/developer-tools/api-explorer/incoming-create

### Deliverable

Your implementation of the module

Please develop in a way that would allow other developers to get up to speed and contribute to your code base quickly:
> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

### Twilio Credentials you should use for this task

```
User: development@dispatchertrucking.com
Password: D1spatcher

Account Sid: ACfb37bf4634ab94764c5aac4293f31ce3
Auth Token: 4e937b83d5c8893829ca4538ff77d21b

Note: The account is pre charged which will allow you to test the purchase implementation (Every purchase costs $1).
```