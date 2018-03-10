

// define the constants for messages
const WELCOME = 'Welcome to Taste of Spain.';
const WELCOME_MESSAGE = 'Let\'s cook together!';
const HELP = 'You can ask to hear the recipe ingredients, start cooking, or send me a shopping list. What would you like to do?';
const STOP = 'Okay, see you again soon!';
'use strict';

// define the constants for API calls
const https = require("https");
const api_url = 'api.amazonalexa.com';
const api_port = '443';

// constant for skill id
const APP_ID =  'amzn1.ask.skill.00b35519-7235-47d7-8d48-4bc34d3ae792';

// recipe data
  const data = { "paella": {
      "ingredients" :
          [
              {"name": "rice", "qty": 2, "units": "cups of"},
              {"name": "chicken or vegetable stock", "qty": 1, "units": "quart"},
              {"name": "shrimp", "qty": 0.5, "units": "pound" },
              {"name": "red, green, or orange pepper", "qty": 1, "units": "medium"},
              {"name": "saffron", "qty": 15, "units": "threads"},
              {"name": "garlic", "qty": 4, "units": "cloves of"},
              {"name": "salt", "qty": 1, "units": "tablespoon"},
              {"name": "black pepper or red pepper flakes", "qty": 1, "units": "teaspoon"},
              {"name": "olive oil", "qty": 4, "units": "tablespoons"},
          ],
      "steps" :
      [
          "First step paella recipe.",
          "Second step paella recipe..",
          "Third step paella recipe.",
          "Serve."
      ],
      "details" :
      [
        "Here is your first detailed tip for paella.",
        "Here is the second detailed tip for paella",
        "Here is the third detail for paella",
        "Here is the fourth detail for paella",
      ]
  },
      "tortilla": {
      "ingredients" :
          [
              {"name": "eggs",  "qty": 7, "units": "medium"},
              {"name": "potatoes", "qty": 4, "units": "small to medium"},
              {"name": "onion", "qty": 1, "units": "medium"},
              {"name": "shallot", "qty": 1, "units": "medium"},
              {"name": "salt", "qty": 1, "units": "tablespoon" },
              {"name": "pepper", "qty": 1, "units": "teaspoon" },
              {"name": "asparagus", "qty": 1, "units": "cup of" }
          ],
      "steps" :
      [
          "First step for tortilla recipe.",
          "Second step for tortilla recipe.",
          "Third step for tortilla recipe",
          "Fourth step for tortilla recipe.",
          "Serve."
      ],
      "details" :
      [
        "Here is your first detailed tip for tortilla.",
        "Here is the second detailed tip for tortilla",
        "Here is the third detail for tortilla",
        "Here is the fourth detail for tortilla",
      ]
      },
       "gazpacho": {
      "ingredients" :
          [
              {"name": "tomatoes", "qty": 1, "units": "cup of"},
              {"name": "onion", "qty": 1, "units": "medium"  },
              {"name": "olive oil", "qty": 2, "units": "tablespoons" },
              {"name": "limes", "qty": 1, "units": "medium" }
          ],
      "steps" :
      [
          "First step for gazpacho recipe.",
          "Second step for gazpacho recipe.",
          "Third step for gazpacho recipe",
          "Fourth step for gazpacho recipe.",
          "Serve."
      ],
       "details" :
      [
         "Here is your first detailed tip for gazpacho.",
        "Here is the second detailed tip for gazpacho",
        "Here is the third detail for gazpacho",
        "Here is the fourth detail for gazpacho",
      ]
    },
     "tapas": {
      "ingredients" :
          [
              {"name": "olive oil",  "qty": 1, "units": "tablespoon"},
              {"name": "honey or agave",  "qty": 1, "units": "tablespoon"},
              {"name": "baguette",  "qty": 1, "units": "fresh"},
              {"name": "brie or chev cheese", "qty": 10, "units": "ounces"  }
          ],
      "steps" :
      [
          "First step for tapas recipe.",
          "Second step for tapas recipe.",
          "Third step for tapas recipe",
          "Fourth step for tapas recipe.",
          "Serve."
      ],
       "details" :
      [
        "Here is your first detailed tip for tapas.",
        "Here is the second detailed tip for tapas",
        "Here is the third detail for tapas",
        "Here is the fourth detail for tapas",
      ]
     },
  };

 // variables for recipe and list info.
  var current_recipe;
  var current_response;
  var list_id;

// update this will relevant images
  const welcomeCardImg = {
      smallImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_small.png',
      largeImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_large.png'
  };

// define Alexa constants
  const Alexa = require('alexa-sdk');
  const AWS = require('aws-sdk');
  const AWSregion = 'us-east-1';
  var persistenceEnabled;
  AWS.config.update({
      region: AWSregion
  });

// export handlers
  exports.handler = function(event, context, callback) {

      const alexa = Alexa.handler(event, context, callback);
      alexa.dynamoDBTableName = 'RecipeSkillTable';
      if (alexa.dynamoDBTableName == 'RecipeSkillTable' ){
        persistenceEnabled=true;
      } else {
        persistenceEnabled=false;
      }

      alexa.registerHandlers(handlers);
      alexa.execute();
  };

// define handlers
  const handlers = {

      'LaunchRequest': function () {
          if (!this.attributes['currentStep'] ) {
              var say = WELCOME + ' ' + HELP;
              this.response.cardRenderer(WELCOME, WELCOME_MESSAGE, welcomeCardImg);

          } else {

              var say = 'Welcome back.  You were on step '
                  + this.attributes['currentStep']
                  + ' of the '+ this.attributes['recipe'] + " recipe"
                  + '. Say restart if you want to start over. '
                  + ' Ready to continue with step '
                  + (parseInt(this.attributes['currentStep']) + 1 ).toString() + "?";

              this.response.cardRenderer('Continue?', "\n" + say);
          }

          this.response.speak(say).listen(say);
          this.emit(':responseReady');
      },
       'CookIntent': function () {
         // delegate to Alexa to collect response from user to access what recipe they want to start cooking
          var filledSlots = delegateSlotCollection.call(this);
          var slotName = "Answer";
          var slotValue = isSlotValid(this.event.request, slotName); // make sure request was filled
          var answer = this.event.request.intent.slots.Answer.value;

          if (answer == 'paella' || answer == 'tortilla espanola' || answer == 'tortilla' || answer == 'gazpacho' || answer == 'tapas') {

             current_recipe = answer;
             this.emit('AMAZON.NextIntent');

          }  else {

            this.emit('Unhandled');
          }
      },
    'Unhandled':function () {
       	this.emit(':ask', 'I\'m sorry, I didn\'t catch that or that recipe is not on our menu.' +
       	' How can I help you? You can say, hear recipe ingredients, start cooking, or send me a shopping list.');
     },
      'IngredientsIntent': function () {
          // delegate to Alexa to get response from user to access what recipe they want to hear the ingredients for
          var filledSlots = delegateSlotCollection.call(this);
          var slotName = "Recipe"; // check if the slot is valid
          var slotValue = isSlotValid(this.event.request, slotName);
          var recipe = this.event.request.intent.slots.Recipe.value;
          current_recipe = recipe;

          if (recipe == 'paella' || recipe == 'tortilla espanola' || recipe == 'tortilla' || recipe == 'gazpacho' || recipe == 'tapas') {

             current_recipe = recipe;
              var say = "";
              var list = [];

              for (var i = 0; i < data[recipe].ingredients.length; i++) {

                var item = data[recipe].ingredients[i];
                list.push(item.qty + ' ' + item.units + ' ' + item.name);
              }
              say += sayArray(list,'and');

              say = 'The ingredients you will need are, ' + say + ' . Are you ready to cook? ';
              var reprompt = 'Say yes if you are ready to begin cooking the recipe.' +
              ' If you would like to change activities, you will lose your current progress.' +
              ' You can say switch or change activities to start something new.';
              var cardlist = list.toString().replace(/\,/g, '\n');

              this.response.cardRenderer('Shopping list', cardlist);
              this.response.speak(say).listen(reprompt);
              this.emit(':responseReady');

            }  else {

              this.emit('Unhandled');
            }
      },

    'CreateListIntent': function () {
        // delegate to Alexa to get response from user, what recipe do they want a shopping list for?
        var filledSlots = delegateSlotCollection.call(this);
        var slotName = "Recipe"; // check for valid slot name
        var slotValue = isSlotValid(this.event.request, slotName);
        var response = this.event.request.intent.slots.Recipe.value;
        current_response = response;

        // get the relevant permissions to access the API
        var accessToken = this.event.context.System.apiAccessToken;
        var consent_token = this.event.session.user.permissions.consentToken;

       // don't make the API calls until after the user has responded with a valid response
       if (this.event.request.dialogState === "COMPLETED") {
         var that = this; // to access this outside of function

          createList(this.event.session, (callback) => {
              console.log("callback:", callback);

              var say;
              let speechOutput;
               // 201 is successful response code from the List API
              if (callback == 201) {
                say = 'Okay, your list was sent. '
                speechOutput = say + " What would you like to do next, start cooking, or hear the recipe ingredients? ";
                that.response.speak(speechOutput).listen(say);
                that.emit(':responseReady');
                // 409 response code indicates the list name already exists
              } else if (callback == 409) {
                say = 'You already have a list with that name. You will need to rename or archive the old one within the Alexa app. '
                speechOutput = say + " What would you like to do next, start cooking, or hear the recipe ingredients? ";
                that.response.speak(speechOutput).listen(say);
                that.emit(':responseReady');
              } else {
                that.emit('Unhandled');
              }
          });
       }
      },
      'AMAZON.YesIntent': function () {
         // yes intent
          this.emit('AMAZON.NextIntent');
      },
      'AMAZON.NoIntent': function () {
         // no intent
          this.response.speak('Okay, see you next time!');
          this.emit(':responseReady');
      },
      'AMAZON.PauseIntent': function () {
          // if database is not enabled, use this message
          var say = "If you pause, you'll lose your progress. Do you want to go to the next step?";
          var reprompt = "Do you want to go to the next step?";

           // if database is enabled, use this message
          if (persistenceEnabled){
            say = 'Okay, you can come back to this skill to pick up where you left off.';
          }

          this.response.speak(say);
          this.emit(':responseReady');
      },
      'AMAZON.NextIntent': function () {
          // user the helper function incrementStep to keep track of user's progress in database
          let recipe = current_recipe;
          var currentStep = incrementStep.call(this, 1);
          var say = 'Step ' + currentStep + ', ' + data[recipe].steps[currentStep - 1];
          var reprompt = 'You can say Pause, Stop, Next, or More Details to hear more tips on this step.' +
          ' If you would like to change activities, you will lose your current progress.' +
          ' You can say switch or change activities to start something new.';

          var sayOnScreen = data[recipe].steps[currentStep - 1];

          if(currentStep == data[recipe].steps.length ) {
              delete this.attributes['currentStep'];
              say += '. <say-as interpret-as="interjection">bon appetit</say-as>';
              this.response.cardRenderer("Enjoy", 'Bon Appetit!', welcomeCardImg);
          } else {
              reprompt += currentStep;
              this.response.cardRenderer('Step ' + currentStep, sayOnScreen);
              this.response.listen(reprompt);
          }

          this.response.speak(say);
          this.emit(':responseReady');
      },
      'MoreDetailsIntent' : function () {
          // user a helper function incrementDetails to keep track of user's progress when they ask to hear more details
          let recipe = this.attributes['recipe'];
          var currentDetail = incrementDetails.call(this, 1);
          var say = 'Step ' + currentDetail + ', ' + data[recipe].details[currentDetail - 1];
          var reprompt = 'You can say Pause, Stop, or Next.';
          var sayOnScreen = data[recipe].details[currentDetail - 1];

          reprompt += currentDetail;
          this.response.cardRenderer('Here\'s your tip:  ' + currentDetail, sayOnScreen);
          this.response.listen(reprompt);

          this.response.speak(say);
          this.emit(':responseReady');
      },
      'SwitchIntent': function () {
          // if the user changes activities mid-stream using the switch keyword (not the restart keyword), clear the database to reset their progress
          this.attributes['currentStep'] = 0;
          this.attributes['currentDetail'] = 0;
          this.attributes['recipe'] = undefined;
          this.emit(':ask', "Okay, what activity would you like to do next? You can say, hear the recipes, start cooking, or get a shopping list?");
      },
      'AMAZON.PreviousIntent': function () {
        // calculate previous steps
        incrementStep.call(this, -2);
        this.emit('AMAZON.NextIntent');
      },
      'AMAZON.RepeatIntent': function () {
          // calculations for repeat
          if (!this.attributes['currentStep'] ) {
              this.attributes['currentStep'] = 0;
          } else {
              this.attributes['currentStep'] = this.attributes['currentStep'] - 1;
          }

          this.emit('AMAZON.NextIntent');
      },
      'AMAZON.HelpIntent': function () {
         // handles prompts when user asks for help
          if (!this.attributes['currentStep']) {
              this.response.speak(HELP).listen(HELP);
          } else {
              var currentStep = this.attributes['currentStep'];
              var say = 'you are on step ' + currentStep + ' of the ' + ' recipe. ';
              var reprompt = 'Say Next to continue or Ingredients to hear the list of ingredients.';
              this.response.speak(say + reprompt).listen(reprompt);
          }
          this.emit(':responseReady');
      },
      'AMAZON.StartOverIntent': function () {
          // clear attributes if user restarts
          delete this.attributes['currentStep'];
          this.emit('LaunchRequest');
      },
      'AMAZON.NoIntent': function () {
        // stop intent
          this.emit('AMAZON.StopIntent');
      },
      'AMAZON.CancelIntent': function () {
        // cancel intent
          this.response.speak(STOP);
          this.emit(':responseReady');
      },
      'AMAZON.StopIntent': function () {
          // stop intent
          this.emit('SessionEndedRequest');
      },
      'SessionEndedRequest': function () {
          // end session
          console.log('session ended!');
          this.response.speak(STOP);
          this.emit(':responseReady');
      }
  };

  //  Helper Functions  =================================================================================================
// keep track of which step in the recipe the user is on by storing in table
  function incrementStep(increment){
    if (!this.attributes['currentStep'] ) {
        this.attributes['currentStep'] = 1;
        this.attributes['recipe'] = current_recipe;
    } else {
        this.attributes['currentStep'] = this.attributes['currentStep'] + increment;
        if (this.attributes['currentStep'] < 0) {
          this.attributes['currentStep'] = 0;
          this.attributes['recipe'] = current_recipe;
        }
    }
    console.log("incrementStep: " + this.attributes['currentStep']);
    return this.attributes['currentStep'];
  }

// keep track of which detail step the user is on
  function incrementDetails(increment){
    if (!this.attributes['currentDetail'] ) {
        this.attributes['currentDetail'] = 1;
        this.attributes['recipe'] = current_recipe;
    } else {
        this.attributes['currentDetail'] = this.attributes['currentDetail'] + increment;
        if (this.attributes['currentDetail'] < 0) {
          this.attributes['currentDetail'] = 0;
          this.attributes['recipe'] = current_recipe;
        }
    }
    console.log("incrementStep: " + this.attributes['currentStep']);
     // return user to the primary step sequence
    return this.attributes['currentStep'];
  }

// helper function for concatenating strings
  function sayArray(myData, andor) {

      var listString = '';

      if (myData.length == 1) {
          //just say the one item
          listString = myData[0];
      } else {
          if (myData.length == 2) {
              //add the conjuction between the two words
              listString = myData[0] + ' ' + andor + ' ' + myData[1];
          } else if (myData.length == 4 && andor=='and'){
              //read the four words in pairs when the conjuction is and
              listString=myData[0]+" and "+myData[1]+", as well as, "
                  + myData[2]+" and "+myData[3];

          }  else {
              //build an oxford comma separated list
              for (var i = 0; i < myData.length; i++) {
                  if (i < myData.length - 2) {
                      listString = listString + myData[i] + ', ';
                  } else if (i == myData.length - 2) {            //second to last
                      listString = listString + myData[i] + ', ' + andor + ' ';
                  } else {                                        //last
                      listString = listString + myData[i];
                  }
              }
          }
      }

      return(listString);
  }

// tell Alexa to handle slot collection
function delegateSlotCollection(){

  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);

    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
      var updatedIntent=this.event.request.intent;
      this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      this.emit(":delegate");
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      return this.event.request.intent;
    }
}

// check slot values are correct
function isSlotValid(request, slotName){
        var slot = request.intent.slots[slotName];
        console.log("request = "+JSON.stringify(request));
        var slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}

// get the metadata for the Alexa lists from the customer using List API
const getListsMetadata = function(session, callback) {
    console.log("starting getListsMetadata");

    if(!session.user.permissions) {
        console.log("permissions are not defined");
        callback(null);
        return;
    }

    var consent_token = session.user.permissions.consentToken;
    consent_token = session.user.permissions.consentToken;

    var options = {
        host: api_url,
        port: api_port,
        path: '/v2/householdlists/',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + consent_token,
            'Content-Type': 'application/json'
        }
    }

    var req = https.request(options, (res) => {
        console.log('STATUS getListsMetadata: ', res.statusCode);
        console.log('HEADERS getListsMetadata: ', JSON.stringify(res.headers));

        if(res.statusCode === 403) {
            console.log("permissions are not granted");
            callback(null);
            return;
        }

        var body = [];
        res.on('data', function(chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            callback(body);
        });

        res.on('error', (e) => {
            console.log(`Problem with request: ${e.message}`);
        });
    }).end();

    console.log("ending getListsMetadata");
};

// use the createList API to send a custom list to the user's Alexa app
function createList(session, callback) {

    var consent_token = session.user.permissions.consentToken; // get permissions from user

    let options = {
      host: api_url,
      port: api_port,
      listId: list_id,
      path:  '/v2/householdlists/',
      state : 'active',
      version : 1,
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + consent_token,
          'Content-Type': 'application/json'
      }
     };

    let messageObject; // fill message object depending on recipe requested
     if (current_response == "tapas") {
        messageObject = {
           name: "tapas: baguette, 4 oz. chev or brie cheese, 1 Tbsp honey or agave, 1 Tbsp olive oil, salt to taste",
           state: 'active',
           version: 1
       }
     } else if (current_response == "paella") {
        messageObject = {
           name: "paella: 2 c. rice, 1 qt. vegetable or chicken broth, 2 Tbsp olive oil, 15 threads saffron, 1 onion, 1 shallot, 1 red pepper, 1 Tbsp salt, pepper to taste ",
           state: 'active',
           version: 1
        }
     } else if (current_response == "tortilla" || current_response == 'tortilla espanola') {
        messageObject = {
           name: "tortilla espanola: 7 eggs, 4-6 small potatoes, 1 Tbsp salt, 1 medium onion, 1 shallot, pepper to taste",
           state: 'active',
           version: 1
        }
     } else if (current_response == 'gazpacho'){
        messageObject = {
           name: "gazpacho: 12 oz. cherry tomatoes, romas, or tomato medly, 1 Tbsp olive oil, 1 yellow onion, 1 lime",
           state: 'active',
           version: 1
        }
     } else {
        callback(null);
        return;
     }

     let req = https.request(options, (res) => {
        if(res.statusCode === 403) {
            console.log("permissions are not granted");
            callback(null);
            return;
        } else {
            callback(res.statusCode);
            console.log(res.statusCode);
        }

        var body = [];
        res.on('data', function(chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            console.log(JSON.stringify(body));
            callback(body);
        });

        res.on('error', (e) => {
            console.log(`Problem with request: ${e.message}`);
        });
    });

    req.write(JSON.stringify(messageObject));
    req.end();
}
