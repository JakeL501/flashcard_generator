//use inquirer npm package to prompt the user and have him/her input a choice
var inquirer = require("inquirer");
//use fs npm package to read and write to text files
var fs = require("fs");
//use request npm package to request other files
var request = require("request");

//require or call js files that contain the constructors needed to execute user choices
var basic = require("./basic_card.js");
var cloze = require("./cloze_card.js");

//prompt user to input the operation: make cards or show card info
inquirer
    .prompt([{
        type: "list",
        name: "operation",
        choices: ["make", "show", "nevermind"],
        message: "What do you want to do?"
    }]).then(function (answer) {
        //if user chooses to make info call the function for that
        if (answer.operation === "make") {
            makeOperation();
        }
        //if user chooses to retrieve info call the function for that
        else if (answer.operation === "show") {
            readOperation();
        }
        else (answer.operation === "nevermind"); {
            console.log("Then Leave.")
        }

    });


var makeOperation = function () {
    //prompt user to input the type of flashcards he wants to make
    inquirer.prompt([{
        type: "list",
        name: "basicOrCloze",
        choices: ["basic", "cloze", "nevermind"],
        message: "Which one were you going to make?"
    }]).then(function (answer) {
        //if user chooses basic run the funtion that makes basic flashcards
        if (answer.basicOrCloze === "basic") {
            makeBasic();
        }
        //if user chooses cloze run the funtion that makes cloze flashcards
        if (answer.basicOrCloze === "cloze") {
            makeCloze();
        }
        if (answer.operation === "nevermind") {
           console.log("............ fine");
            makeOperation();
        }


    });
}
//prompt user to input the type of flashcards he wants to read
var readOperation = function () {
    inquirer.prompt([{
        type: "list",
        name: "basicOrCloze",
        choices: ["basic", "cloze", "nevermind"],
        message: "You forgot what you wrote already? Fine, which ones did you want?"
    }]).then(function (answer) {
        //if user chooses basic run the funtion that reads basic flashcards
        if (answer.basicOrCloze === "basic") {
            readBasic();
        }
        //if user chooses cloze run the funtion that reads cloze flashcards
        if (answer.basicOrCloze === "cloze") {
            readCloze();
        }
        if (answer.basicOrCloze === "nevermind") {
            console.log(".....okay....")
            makeOperation();
        }

    });
}
// function to show info needed for storing basic flashcards
var makeBasic = function () {
    inquirer.prompt([
        //prompt user to input front text for basic flashcards
        {
            type: "input",
            name: "front",
            message: "Enter front text"
        },
        //prompt user to input back text for basic flashcards
        {
            type: "input",
            name: "back",
            message: "Now the back text"

        }
    ]).then(function (answer) {
        // pass values to a function that calls constructors from basic_card.js file
        basicFlashCard(answer.front, answer.back);

    });
}

// function to show info needed for storing cloze flashcards
var makeCloze = function () {
    inquirer.prompt([
        //prompt user to input full text for cloze flashcards
        {
            type: "input",
            name: "full",
            message: "Enter your full text"
        },
        //prompt user to input partial text for cloze flashcards
        {
            type: "input",
            name: "partial",
            message: "Enter your partial text"
        },
        //prompt user to input the deleted text for cloze flashcards
        {
            type: "input",
            name: "deletion",
            message: "Now your deletion text"
        }
    ]).then(function (answer) {
        // pass values to a function that calls constructors from cloze_card.js file    
        clozeFlashCard(answer.partial, answer.deletion);

    });
}

//function that passes values to constructor in basic_card.js file
var basicFlashCard = function (front, back) {
    var basicCard = new basic(front, back);
    basicCard.makeCard(front, back);
    console.log('Here is what you wrote to the text file mortal. ' + "'" + basicCard.front + "'" + "on the front " + "and" + "'" + basicCard.back + "'" + "on the back.");

}

//function that passes values to constructor in cloze_card.js file
var clozeFlashCard = function (text, deletion) {
    var clozeCard = new cloze(text, deletion);
    clozeCard.fullText(text, deletion);
    clozeCard.partialText(text);
    clozeCard.deletion(deletion);

    console.log('This is what you logged to the text file...... loser. ' + text + " " + deletion);
}

//function that reads text file values using constructor in basic_card.js file
var readBasic = function () {
    fs.readFile("log.txt", "utf8", function (error, data) {
        console.log("You made these basic flashcards. " + data);
    });
}

//function that reads text file values using constructor in cloze_card.js file
var readCloze = function () {
    fs.readFile("fulllog.txt", "utf8", function (error, data) {
        console.log("You made these cloze flashcards. " + data);
    });
}