
const WELCOME = 'Welcome to Taste of Spain.';
const WELCOME_MESSAGE = 'Let\'s cook together!';
const HELP = 'You can ask for a shopping list or ingredients, or start cooking.';
const STOP = 'Okay, see you again soon!';

// stub the data for now
  const data = { "paella": {
      "ingredients" :
          [
              {"name": "bread",  "qty": 2, "units": "pieces of"},
              {"name": "egg",    "qty": 1, "units": ""  },
              {"name": "cheese", "qty": 1, "units": "slice of" }
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
              {"name": "eggs",  "qty": 6, "units": " large"},
              {"name": "potatoes",    "qty":2, "units": "medium"  },
              {"name": "spice", "qty": 10, "units": "pinches of" }
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
              {"name": "tomatoes",  "qty": 2, "units": " cups of"},
              {"name": "peppers",    "qty":5, "units": ""  },
              {"name": "limes", "qty": 2, "units": "small ripe" }
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
              {"name": "rice",  "qty": 2, "units": " cups of"},
              {"name": "veggies",    "qty":5, "units": ""  },
              {"name": "spices", "qty": 10, "units": "pinch of" }
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

  var current_recipe;

// update this will relevant images
  const welcomeCardImg = {
      smallImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_small.png',
      largeImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_large.png'
  };

  // 2. Skill Code =======================================================================================================
  const Alexa = require('alexa-sdk');
  const AWS = require('aws-sdk');
  const AWSregion = 'us-east-1';
  var persistenceEnabled;
  AWS.config.update({
      region: AWSregion
  });

  exports.handler = function(event, context, callback) {
      var alexa = Alexa.handler(event, context);

      alexa.dynamoDBTableName = 'RecipeSkillTable';
      if (alexa.dynamoDBTableName == 'RecipeSkillTable' ){
        persistenceEnabled=true;
      } else {
        persistenceEnabled=false;
      }

      alexa.registerHandlers(handlers);
      alexa.execute();
  };

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
         // delegate to Alexa to collect response from user, e.g. what recipe does user want to make?
          var filledSlots = delegateSlotCollection.call(this);
          var slotName = "Answer";
          var slotValue = isSlotValid(this.event.request, slotName);

          var answer = this.event.request.intent.slots.Answer.value;

          // return to this, refactor if statement
          if (answer == 'paella' || answer == 'tortilla espanola' || answer == 'tortilla' || answer == 'gazpacho' || answer == 'tapas') {
             current_recipe = answer;
             this.emit('AMAZON.NextIntent');
          }  else {
            this.emit('Unhandled');
          }
      },
    'Unhandled':function () {
       	this.emit(':ask', 'I\'m sorry, I didn\'t catch that or that recipe is not on our menu.' +
       	' How can I help you? You can say, start cooking or get grocery list.');
     },
      'IngredientsIntent': function () {

          // delegate to Alexa to get response from user, what recipe do they want ingredients for?
          var filledSlots = delegateSlotCollection.call(this);

         // check if the slot is valid, e.g. provided a valid answer for what recipe to cook
          var slotName = "Recipe";
          var slotValue = isSlotValid(this.event.request, slotName);
          var recipe = this.event.request.intent.slots.Recipe.value;
          current_recipe = recipe;

          // come back & refactor if statement
          if (recipe == 'paella' || recipe == 'tortilla espanola' || recipe == 'tortilla' || recipe == 'gazpacho' || recipe == 'tapas') {
             current_recipe = recipe;
              var say = "";
              var list = [];

              for (var i = 0; i < data[recipe].ingredients.length; i++) {
                var item = data[recipe].ingredients[i];
                list.push(item.qty + ' ' + item.units + ' ' + item.name);
              }
              say += sayArray(list,'and');

              // add another option that lets the user get all recipe ingredients or multiple recipes,
              // if they do this, however, need to prompt them after to a new handler to ask what they'd like to start with.

              say = 'The ingredients you will need are, ' + say + '. Are you ready to cook? ';
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
      'AMAZON.YesIntent': function () {
          this.emit('AMAZON.NextIntent');
      },
      'AMAZON.NoIntent': function () {
          this.response.speak('Okay, see you next time!');
          this.emit(':responseReady');
      },
      'AMAZON.PauseIntent': function () {

          var say = "If you pause, you'll lose your progress. Do you want to go to the next step?";
          var reprompt = "Do you want to go to the next step?";

          // cross-session persistence is enabled
          if (persistenceEnabled){
            say = 'Okay, you can come back to this skill to pick up where you left off.';
          }
          this.response.speak(say);
          this.emit(':responseReady');
      },
      'AMAZON.NextIntent': function () {

          let recipe = current_recipe;
          console.log(`recipe: ${recipe}`);

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
        // adding an intent in case the user changes their mind mid-stream and decides they want to do something else.
        // In this case, need to reset the attributes so that the count and recipes are cleared.
        // optionally, could set up another copy or table
          this.attributes['currentStep'] = 0;
          this.attributes['currentDetail'] = 0;
          this.attributes['recipe'] = undefined;

          this.emit(':ask', "Okay, what activity would you like to do next? You can say, get ingredients or start cooking?");
      },
      'AMAZON.PreviousIntent': function () {
        incrementStep.call(this, -2);
        this.emit('AMAZON.NextIntent');
      },
      'AMAZON.RepeatIntent': function () {
          if (!this.attributes['currentStep'] ) {
              this.attributes['currentStep'] = 0;
          } else {
              this.attributes['currentStep'] = this.attributes['currentStep'] - 1;
          }
          this.emit('AMAZON.NextIntent');
      },
      'AMAZON.HelpIntent': function () {
          if (!this.attributes['currentStep']) {  // new session
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
          delete this.attributes['currentStep'];
          this.emit('LaunchRequest');
      },
      'AMAZON.NoIntent': function () {
          this.emit('AMAZON.StopIntent');
      },
      'AMAZON.HelpIntent': function () {
          this.response.speak(HELP).listen(HELP);
          this.emit(':responseReady');
      },
      'AMAZON.CancelIntent': function () {
          this.response.speak(STOP);
          this.emit(':responseReady');
      },
      'AMAZON.StopIntent': function () {
          this.emit('SessionEndedRequest');
      },
      'SessionEndedRequest': function () {
          console.log('session ended!');
          this.response.speak(STOP);
          this.emit(':responseReady');
      }
  };

  //  END of Intent Handlers {} ========================================================================================
  //  Helper Functions  =================================================================================================

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
     // return user to the primary step sequence, not the next detail
    return this.attributes['currentStep'];
  }


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

  function randomArrayElement(array) {
      var i = 0;
      i = Math.floor(Math.random() * array.length);
      return(array[i]);
  }

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
