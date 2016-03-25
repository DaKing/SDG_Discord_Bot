//Note: the .js is not required as Node assumes these files are javascript
var Discord = require( "discord.js" )

//These three required for the fs.readdirSync()
var fs = require( "fs" );
var path = require( "path" );
var process = require( "process" );


var bot = new Discord.Client ();
var AuthDetails = require("./auth.json");

var cenaImageFolder = "./cenaimages/";

var cenaImageArray = new Array();
cenaImageArray = fs.readdirSync(cenaImageFolder);//Loops through a given folder and creates an array of file names
/*
var tableCatchTimeStamps = new Array(3);
for (var i = 0; i < tableCatchTimeStamps.length; i++){
	tableCatchTimeStamps[i] = new Date();
}*/
//Table catcher object constructor
function TableCatcher(channel){
	this.currentEmotionalState = 0;
	this.emotionalState = ["┬─┬ノ( ゜-゜ノ)", "┬─┬ノ(ಠ益ಠノ)", "┬─┬ノ(ಥ益ಥノ)", "(/ .□.)\ ︵╰(゜Д゜)╯︵ /(.□. \)"]
	this.lastFlipTimestamp = new Date();
	this.channel = channel; 
}
var tableCatcherArray = new Array(); //Keeps all TableCatcher objects

bot.on("message", function(message)
{
	//Make all message content lower case so all triggers can be written lower case and always work.
	var lowerCaseMessage = message.content.toLowerCase();
	//John Cena
	if(lowerCaseMessage.includes("and his name is") ||
		lowerCaseMessage.includes("and his name was") ||
		message.content.includes("\uD83C\uDFBA") &&
		!message.author.equals(bot.user)){ //Unicode trumpet
		
		//Reply message	
		bot.reply(message, "\uD83C\uDFBA\uD83C\uDFBA\uD83C\uDFBA\uD83C\uDFBA**JOHN CENA!**\uD83C\uDFBA\uD83C\uDFBA\uD83C\uDFBA\uD83C\uDFBA");
		console.log(message.author.username);
		//Get random image path from array
		var randomCenaImageFilePath = cenaImageArray[Math.floor(Math.random() * cenaImageArray.length)];
		//Reply with random cena image
		bot.sendFile(message.channel, cenaImageFolder.concat(randomCenaImageFilePath),"jonny.png", (err, message) => {
			if(err)
				console.log("couldn't send image:", err);
		})
	}
	/*
	//Catch tables
	if(message.content.includes("(╯°□°）╯︵ ┻━┻")){
		if (Math.abs(new Date() - tableCatchTimeStamps[2]) <= 90000){
			tableCatchTimeStamps.unshift(new Date());
			tableCatchTimeStamps.splice(3, 1);
			bot.reply(message, "FOURTH CATCH - **add an action here**");
		} else if (Math.abs(new Date() - tableCatchTimeStamps[1]) <= 60000){
			tableCatchTimeStamps.unshift(new Date());
			tableCatchTimeStamps.splice(3, 1);
			bot.reply(message, "┬─┬ノ(ಥ益ಥノ)");
		} else if(Math.abs(new Date() - tableCatchTimeStamps[0]) <= 30000) {
			tableCatchTimeStamps.unshift(new Date());
			tableCatchTimeStamps.splice(3, 1);
			bot.reply(message, "┬─┬ノ(ಠ益ಠノ)");
		} else {
			tableCatchTimeStamps.unshift(new Date());
			tableCatchTimeStamps.splice(3, 1);
			bot.reply(message, "┬─┬ノ( ゜-゜ノ)");
		}
	}
	*/
	if(message.content.includes("(╯°□°）╯︵ ┻━┻")){
		var channelHasCatcher = false;
		if (tableCatcherArray.length > 0){ //Make sure there's at least 1 object in the array
			for (var i = 0; i < tableCatcherArray.length; i++){ //loop through array to see if object already exists for channel
				var currentTableCatcher = tableCatcherArray[i];
				if (currentTableCatcher.channel.equals(message.channel)){
					channelHasCatcher = true;
					if (Math.abs(new Date() - currentTableCatcher.lastFlipTimestamp) <= 30000){
						bot.reply(message, currentTableCatcher.emotionalState[currentTableCatcher.currentEmotionalState]);
						currentTableCatcher.lastFlipTimestamp = new Date();
						currentTableCatcher.currentEmotionalState++;
					}
				}
			}
		}else{
			tableCatcherArray[0] = new TableCatcher(message.channel);
			var currentTableCatcher = tableCatcherArray[0];
			bot.reply(message, currentTableCatcher.emotionalState[currentTableCatcher.currentEmotionalState]);
			currentTableCatcher.lastFlipTimestamp = new Date();
			currentTableCatcher.currentEmotionalState++;
		}
	}
	//KoolAid - just the KoolAid man. Ohhhh yeeahh!
	if(lowerCaseMessage.includes("oh no") ||
		lowerCaseMessage.includes("hey koolaid")){
		bot.sendFile(message.channel, "./koolaid.jpg","koolaid.jpg", (err, message) => {
			if(err)
				console.log("couldn't send image:", err);
		});
	}

	// Macho Man!
	if(lowerCaseMessage.includes("savage")) {
		bot.reply(message, "Ohhhh yeah brother!");
		bot.sendFile(message.channel, "./savage.jpg","savage.jpg", (err, message) => {
			if(err)
				console.log("couldn't send image:", err);
		});
	}
});

bot.login(AuthDetails.email, AuthDetails.password);
