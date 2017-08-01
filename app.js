var inquirer = require("inquirer");

// Loads the two diff flash cards
var clozeData = require("./clozecard.js");
var basicData = require("./basiccard.js");

// variables for Inquirer
var count = 0;
// number of cards to create
var cards = 0;

// Stores the array of flash cards
var cardArray = [];


// Asks user what type of flash card to create
function askQuestion () {
	// runs loop for inquirer for each card user requested to create for as long as the Count is less than the cards.
	if (count < cards) {
  	inquirer.prompt([
	    {
		    type: "list",
		    name: "type",
		    message: "What type of Flashcard do you want to create?",
		    choices: ["Basic Card", "Cloze Card"]
	    }]).then(function(carTypeObj) {
    	// saves the user's requested flash card type to variable. 
    		cardType = carTypeObj.type;

		    if (cardType === "Cloze Card"){
		        inquirer.prompt([
		        {
		            name: "frontCardCloze",
		            message: "What should the Question be?"
		        }, {
		            name: "backCardCloze",
		            message: "What part do you want to remove? (Must match exactly)"
		        }]).then(function(cardDataCloze) {
		            createCloze(cardDataCloze.frontCardCloze, cardDataCloze.backCardCloze);
		        });
		    } else {
	        	inquirer.prompt([
	        	{
		        	name: "fullAnswer",
		            message: "What should the Question be?"
	        	}, {
		            name: "cloze",
		            message: "What should the answer be?"
	          	}]).then(function(cardDataBasic) {
	              createBasic(cardDataBasic.fullAnswer, cardDataBasic.cloze);
	        	});
    		}
    	});
	} else {
    	console.log("");
    	review();
	}
};

// function calls to basic card.js to create a basic flash card from that constructor. 
function createBasic (basicFront, basicBack){
	if ((basicFront.trim() === "") || (basicBack.trim() === "")) {
		console.log("Try again.");
		askQuestion();
	} else {
		cardArray.push(new basicData.BasicCard(basicFront, basicBack));
    	count++;
    	console.log(cardArray)
	    askQuestion();
	}
};

// function calls to close card.js to create the cloze card from that constructor. 
function createCloze (fullAnswer, cloze, clozeQuestion) {
	if ((fullAnswer.trim() === "") || (cloze.trim() === "")) {
		console.log("Try again.");
    	askQuestion();
  	} else if (fullAnswer.trim().includes(cloze.trim())) {

  		// method to remove the "cloze" phrase from the flashcard question.
    	clozeQuestion = fullAnswer.replace(cloze, "......");

		cardArray.push(new clozeData.ClozeCard(fullAnswer, cloze, clozeQuestion));
		console.log(cardArray);
    	count++;
    	askQuestion();
    } else {
    	console.log("Try again.");
    	askQuestion();
	}
};

// Starts the app by asking how many cards to create
inquirer.prompt([
	{
		name: "cardNumber",
	    message: "How many cards total do you want to make?"
	}]).then(function(cardNum) {
    	cards = cardNum.cardNumber;
        askQuestion();
	});

function review () {
	console.log("/nTime to review your flash cards!");
	for (var j=0; j < cardArray.length; j++){

		

		
	}
}






















