//use fs npm package to read and write to text files
var fs = require("fs");

// define constructor that will store and retrieve data for basic flashcards
var BasicCard =function(front,back){
	
	  	this.front = front;
	  	this.back = back;
	  	
	  	this.storeCard = function (front,back){
			// this.cardFronts.push(front);
			// this.cardBacks.push(back);
			if(!front){
			console.log("Front text was not entered")
			}
			if(!back){
			console.log("Back text was not entered")
			}
			else{
	        fs.appendFile("log.txt", "," + "front:" + front +","+ "Back:" + back);
			}
		}

		this.cardFront = function (front){
	        fs.appendFile("frontlog.txt", "," + front);
		}
		
		this.cardBack = function (back){
	        fs.appendFile("backlog.txt", "," + back);
		}
}

// make constructor available so it can be called from another js file

module.exports = BasicCard;
