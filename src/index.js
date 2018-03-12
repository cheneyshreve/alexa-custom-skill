

// define the constants for messages
const WELCOME = 'Welcome to Just A Little Taste of Spain.';
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
              {"name": "shrimp", "qty": "one-half", "units": "pound of" },
              {"name": "tomato", "qty": 2, "units": "medium" },
              {"name": "saffron", "qty": 15, "units": "threads of"},
              {"name": "garlic", "qty": 3, "units": "cloves of"},
              {"name": "salt", "qty": 2, "units": "teaspoons"},
              {"name": "black pepper or red pepper flakes", "qty": 1, "units": "teaspoon"},
              {"name": "olive oil", "qty": 4, "units": "tablespoons"},
          ],
      "steps" :
      [
        "The ingredients you will need are, 2 cups of paella rice, or your preferred rice, 1 quart of vegetable or chicken stock, one-half pound of shrimp, about 15 threads of saffron, 3 cloves of garlic, 2 teaspoons of salt, 1 teaspoon of black pepper, and about 4 tablespoons of olive oil. The materials you will need are, one 10 to 12-inch skillet, 1 saucepan, 1 chef\'s knife, and a bowl or wire mesh strainer to rinse the rice.",
        "First let\'s rinse the rice in the strainer or bowl until the water runs clear. Next we will drain off the excess water. Great, let\'s move on to the onion and garlic. Remove the skin from the onion and garlic cloves, then quarter and dice the onion. Press the garlic in a garlic press, or alternatively, chop it up finely. Great, now wash the tomatoes, cut them into quarters, and then dice them into small chunks. ",
        "Add the olive oil to the skillet and heat to medium heat. Add the onions and stir occasionally for about 4 minutes, or until they become translucent. Next add in the garlic, tomatoes, salt, pepper, and saffron. Let this mixture simmer on medium heat until it reduces in volume, approximately 3 to 5 minutes, stirring occasionally. Add the rice to the skillet and stir to coat. ",
        "Add the chicken or vegetable stock to a saucepan and bring to a boil. Then let\'s add in the rice mixture and stir once to combine. Okay, let\'s reduce the heat to medium-low, and set a timer for 10 minutes while you prepare the shrimp. Remove the shells from the shrimp and devein them. Once the 10 minute timer is up, add the shrimp to the rice mixture, let the mixture cook for another 8 to 10 minutes. Turn the pan occasionally to ensure the mixture cooks evenly.",
        "We\'re all done, let the paella cool for a few minutes and serve."
      ],
      "details" :
      [
        "Any type of rice is fine to use, we recommend paella rice, white, or brown rice. If you are using wild rice, it can take up to 40 minutes to cook, so you may need to add additional broth, and adjust the cooking time accordingly.",
        "For a vegetarian option, use vegetable broth and substitute vegan or vegetarian chorizo, which is cooked following package instructions, and added once the rice is finished cooking.",
        "Mussels or clams can be used in addition to, or as a substitution for, the shrimp.",
        "As an optional garnish, top with chopped fresh parsley, or fresh, or dried oregano."
      ]
  },
      "tortilla": {
      "ingredients" :
          [
              {"name": "eggs",  "qty": 6, "units": "medium"},
              {"name": "potatoes", "qty": 4, "units": "medium"},
              {"name": "onion", "qty": "one-half", "units": "medium"},
              {"name": "shallot", "qty": 1, "units": "medium"},
              {"name": "salt", "qty": 2, "units": "teaspoons" },
              {"name": "pepper", "qty": 1, "units": "teaspoon" },
              {"name": "green beans", "qty": "one-half", "units": "cup of" }
          ],
      "steps" :
      [
        "The ingredients you will need are, 4 potatoes, 6 eggs, 1 onion, 1 shallot, 2 teaspoons of salt, 1 teaspoon of pepper, and optionally, about one-half of a cup of green beans. The materials you will need are, 1 oven safe skillet, such as a cast iron skillet, 10 to 12 inches in diameter, 1 chef\'s knife, a fork or egg beater, 1 large mixing bowl, and a steamer, or optionally, a microwave safe bowl.",
        "Preheat the oven to 350 degrees Fahrenheit. Prepare the vegetables by washing the potatoes and green beans, and by removing the skins from the onion and shallot. Okay, next you\'ll want to cut the potatoes into quarters, then thinly slice them. Great, now let\'s cut the onion and shallot into quarters, then dice them into small chunks. Finally, let\'s beat 6 eggs in a large mixing bowl with a fork or egg beater, and set them aside.",
        "Heat 2 tablespoons of olive oil to a medium heat in the skillet, then add the onion, shallot, salt and pepper. Stir to combine the ingredients, then reduce the heat to a low simmer. You\'ll want to keep an eye on these, stirring them occasionally so they cook evenly.",
        "Add about an inch of water to a saucepan and bring it to a boil. Then add the potatoes to the steamer basket and then place it over the pot. Cover the pot with a lid and steam the potatoes until they have softened, or about 3 to 4 minutes. While you're waiting for the potatoes to steam, go back to the onion and shallot mixture. Turn the heat up to medium-high. Cook until the onions until they are translucent, or about 3 to 4 minutes.",
        "Okay, now go back to our potatoes. Take the potatoes out of the steamer and add them to the skillet with the onion and shallot, and then cook until the potatoes start to brown, stirring occasionally for about 2 minutes. Then let\'s pour the eggs over the vegetables in the skillet. Then we will garnish the top with green beans in a star pattern.",
        "Now it\'s time for baking. Place the skillet in the top rack of the oven and bake for 10 minutes, or until the mixture begins to fluff up. Okay, now switch the oven broiler on and broil until the top of the tortilla becomes brown and crispy, about 2 to 4 minutes, depending on your preference. Remove the dish from the oven and let it for a few minutes in the pan before transferring it to a cutting board to cut. Slice and serve"
      ],
      "details" :
      [
        "This recipe is made healthier by steaming the potatoes instead of pan frying them in olive oil and butter.",
        "The potatoes could be peeled or left with the skins on for this recipe, depending on your preference. You can also substitute golden potatoes with red or white potatoes.",
        "If you\'re not using a steamer, add the potatoes to a microwave safe bowl, cover them in about an inch of water and microwave until they soften, checking in about 1-minute intervals.",
        "For a variation on this recipe, add an ounce of strong cheese, such as blue cheese, before baking.",
        "Tortilla tastes great cold or warm, enjoy it in the morning with freshly sliced apple and goat\'s cheese."

      ]
      },
       "gazpacho": {
      "ingredients" :
          [
              {"name": "tomatoes", "qty": 4, "units": "large, or 20 to 30 cherry"},
              {"name": "cucumbers", "qty": 1, "units": "medium, or 2 to 3 smaller"},
              {"name": "cilantro", "qty": "one-half", "units": "bunch"},
              {"name": "onion", "qty": "one-half", "units": "medium"  },
              {"name": "olive oil", "qty": 2, "units": "tablespoons" },
              {"name": "lime", "qty": 1, "units": "medium" },
              {"name": "salt", "qty": 1, "units": "teaspoon" },
              {"name": "pepper", "qty": 1, "units": "teaspoon" },
              {"name": "basalmic vinegar", "qty": 1, "units": "teaspoon"}
          ],
      "steps" :
      [
        "The ingredients you will need are, 4 large tomatoes, or about 20 to 30 cherry tomatoes, 1 onion, 1 lime, one-half to 1 teaspoon each of salt and pepper, 1 medium cucumber, or 2 to 3 smaller Persian cucumbers, 2 tablespoons of olive oil, 1 teaspoon of balsamic vinegar, and optionally, about one-half of a bunch of fresh cilantro. The materials you will need are, 1 large mixing bowl, 1 chef\'s knife, a vegetable peeler, and a spoon for mixing.",
        "Wash the tomatoes, cucumber, and cilantro, and remove the skin from the onion. Okay, next let\'s use a peeler to skin the cucumber, then dice it into evenly sized chunks with the chef\'s knife. Moving on to the tomatoes, let\'s cut them into quarters, then dice them into evenly sized chunks. Great, now let\'s repeat the quartering and dicing steps for the onion.",
        "If you are using cilantro, cut off the majority of the stem portion and discard it. Then roll the leafy portion into a bundle, and finely chop it. Okay, now grab the lime. Roll the lime on a hard surface under your palm to soften, then slice the lime through the center. ",
        "If you are using a food processor, add the vegetables, olive oil, balsamic, salt, pepper, and then squeeze one-half, or both halves, of the lime on top of the mixture, depending on your preference. Cover the container and pulse until the mixture reaches the desired consistency. Alternatively, combine all of the ingredients in a mixing bowl and stir to combine.",
        "Cover the mixing bowl or food processing container and transfer it to the refrigerator to cool. When the mixture is cool, serve and enjoy."

      ],
       "details" :
      [
        "For a zestier gazpacho, add about a half of a clove of diced raw garlic. ",
        "For a spicier version, add one half of a finely diced jalapeno pepper, or alternatively, about one teaspoon of crushed red pepper flakes. ",
        "You can substitute one half of a lemon or about a tablespoon of lemon juice concentrate for the lime. Meyer\'s lemons have a sweet and tangy flavor, which makes a nice substitution.",
        "Gazpacho is great on its own, as a side dish, or served with a crusty baguette."
      ]
    },
     "tapas": {
      "ingredients" :
          [
              {"name": "olive oil",  "qty": 2, "units": "tablespoons"},
              {"name": "honey or agave",  "qty": 1, "units": "tablespoon"},
              {"name": "baguette",  "qty": 1, "units": "fresh"},
              {"name": "brie or goat\'s cheese", "qty": 4, "units": "ounces"},
              {"name": "sea salt", "qty": 1, "units": "teaspoon"},
              {"name": "black pepper", "qty": 1, "units": "teaspoon"},
              {"name": "walnuts", "qty": "one-half", "units": "cup"  }
          ],
      "steps" :
      [
        "The ingredients you will need are, 1 baguette, about a tablespoon of honey or agave, a teaspoon each of salt and pepper, and optionally, about a half-cup of walnuts for garnish. The materials you will need are, a serrated knife or bread knife, a chef\'s knife, and an oven safe pan.",
        "Preheat the oven to 375 degrees Fahrenheit. Let the cheese warm to room temperature. Okay, great, next we\'ll slice the baguette into even slices, about an inch thick. Place the bread slices on a pan and then drizzle olive oil over them. Moving on to the cheese, grab it and spread the cheese evenly over each slice. Depending on your preference, you can dice the walnuts or leave them as is. Made your decision? That\'s swell, now add the walnuts on top of the cheese. Finally, let\'s drizzle the honey or agave over the top, and sprinkle a small amount of salt and pepper over each slice.",
        "Place the tapas pan into the oven on the top rack. Bake for about 5 minutes or until the walnuts begin to soften. Remove the pan from the oven and let the tapas cool for a few minutes before serving."
      ],
       "details" :
      [
        "Want to reduce the amount of cheese used? Wash and slice a large tomato into large, even slices. Add the tomato on top of the bread before adding cheese, or alternate between slices of bread with cheese and tomato.",
        "Don\'t have walnuts? No problem. You can substitute chopped almonds.",
        "You can substitute mangecho, iberico, or even a sharp cheddar cheese for this recipe, depending on your preference. For a vegan option, opt for tomatoes or vegan cheese and substitute agave for honey."
      ]
     },
  };
 // variables for recipe and list info.
  var current_recipe;
  var current_response;
  var list_id;

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
              this.response.cardRenderer(WELCOME, WELCOME_MESSAGE);

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

        if(!this.event.session.permissions && !this.event.session.user.permissions) {
           var say = 'You need to enable permissions for accessing lists within the Alexa app before I can send you a list. '
           var speechOutput = say + " What would you like to do next, start cooking, or hear the recipe ingredients? ";
           this.response.speak(speechOutput).listen(say);
           this.emit(':responseReady');
           return;
        }

         var consent_token = this.event.session.user.permissions.consentToken;

        if (this.event.request.dialogState === "COMPLETED")  {
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
                say = 'You already have a list with that name. You will need to archive the old one within the Alexa app. '
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
              this.response.cardRenderer("Enjoy", 'Bon Appetit!');
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
          var say = 'Tip ' + currentDetail + ', ' + data[recipe].details[currentDetail - 1];
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
           name: "tapas: 1 baguette, 4 oz. goat\'s cheese or brie cheese, 1 Tbsp honey or agave, 1 Tbsp olive oil, 0.5 c. chopped walnuts, salt to taste",
           state: 'active',
           version: 1
       }
     } else if (current_response == "paella") {
        messageObject = {
           name: "paella: 2 c. rice, 1 qt. vegetable or chicken broth, 4 Tbsp olive oil, 15 threads saffron, 2 medium tomatoes, 0.5 pound shrimp, 1 onion, 1 shallot, salt and pepper to taste ",
           state: 'active',
           version: 1
        }
     } else if (current_response == "tortilla" || current_response == 'tortilla espanola') {
        messageObject = {
           name: "tortilla espanola: 6 eggs, 4 medium potatoes, 2 tsp salt, 1 onion, 1 shallot, 0.5 c. green beans, pepper to taste",
           state: 'active',
           version: 1
        }
     } else if (current_response == 'gazpacho'){
        messageObject = {
           name: "gazpacho: 4 medium tomatoes or 20-30 cherry tomatoes, 1 cucumber, 2 Tbsp olive oil, 1 onion, 1 lime, 1 bunch cilantro, 1 tsp basalmic vinegar, salt and pepper to taste",
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
