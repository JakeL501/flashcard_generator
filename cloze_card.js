//use fs npm package to read and write to text files
var fs = require("fs");

// define constructor that will store and retrieve data for cloze flashcards
var ClozeCard = function (text, cloze) {
	this.text = text;
	this.cloze = cloze;

	this.fullText = function (text, cloze) {
		if (!cloze) {
			console.log("Deletion text was not entered")
		}
		if (!text) {
			console.log("Partial text was not entered")
		} else {
			fs.appendFile("fulllog.txt", "," + text + " " + cloze);
		}
	}
	this.deletion = function (cloze) {
		fs.appendFile("clozelog.txt", "," + cloze);
	}
}

// make constructor available so it can be called from another js file

module.exports = ClozeCard;