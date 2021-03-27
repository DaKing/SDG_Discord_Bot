// Table catcher object constructor
const tableCatcherArray = new Array(); // Keeps all TableCatcher objects

const tableCatchManager = function (bot) {
  this.tableCatcherReply = function (message) {
    let channelHasCatcher = false;
    if (tableCatcherArray.length > 0) { // Make sure there's at least 1 object in the array
      for (let i = 0; i < tableCatcherArray.length; i += 1) { // loop through array to see if object already exists for channel
        var currentTableCatcher = tableCatcherArray[i]; // set new var to current array object
        if (currentTableCatcher.channel.equals(message.channel)) { // if the we find an object already exists for the channel
          channelHasCatcher = true;// set flag to true that channel already has object
          if (currentTableCatcher.tableBroken == true && Math.abs(new Date() - currentTableCatcher.lastFlipTimestamp) < 300000) { // if table is broken and it's been less than 5 minutes
            message.reply("*TABLE SHATTERS*: Shamebot's sick of your shit. He'll be back to save the tables in a few minutes.");
          } else if (currentTableCatcher.tableBroken == true && Math.abs(new Date() - currentTableCatcher.lastFlipTimestamp) >= 300000) { // if table is broken but it's been 5 minutes or more
            currentTableCatcher.tableBroken = false;
            message.reply(currentTableCatcher.emotionalState[currentTableCatcher.currentEmotionalState]);
            currentTableCatcher.lastFlipTimestamp = new Date();
            currentTableCatcher.currentEmotionalState++;
          } else { // else -> table is not broken...
            if (Math.abs(new Date() - currentTableCatcher.lastFlipTimestamp) <= 30000) {
              message.reply(currentTableCatcher.emotionalState[currentTableCatcher.currentEmotionalState]);
              currentTableCatcher.lastFlipTimestamp = new Date();
              if (currentTableCatcher.currentEmotionalState <= currentTableCatcher.emotionalState.length - 2) {
                currentTableCatcher.currentEmotionalState++;
              } else {
                currentTableCatcher.currentEmotionalState = 0;
                currentTableCatcher.tableBroken = true;
              }
            } else if (Math.abs(new Date() - currentTableCatcher.lastFlipTimestamp) > 30000) {
              const timePast = Math.abs(new Date() - currentTableCatcher.lastFlipTimestamp);
              let numberOfIncrementsPast = (timePast / 30000) - 1; // 30 seconds is one increment

              if (numberOfIncrementsPast < 1) {
                // return previous table catch emotion
                currentTableCatcher.currentEmotionalState--;
                message.reply(currentTableCatcher.emotionalState[currentTableCatcher.currentEmotionalState]);
                currentTableCatcher.lastFlipTimestamp = new Date();
              } else {
                // decrease emotional states equal to the number of increments to a minimum of 0
                numberOfIncrementsPast = Math.floor(numberOfIncrementsPast);
                if (currentTableCatcher.currentEmotionalState - numberOfIncrementsPast <= 0) {
                  currentTableCatcher.currentEmotionalState = 0;
                  message.reply(currentTableCatcher.emotionalState[0]);
                } else {
                  currentTableCatcher.currentEmotionalState -= numberOfIncrementsPast;
                  message.reply(currentTableCatcher.emotionalState[currentTableCatcher.currentEmotionalState]);
                }
              }

              if (currentTableCatcher.currentEmotionalState <= currentTableCatcher.emotionalState.length - 2) {
                currentTableCatcher.currentEmotionalState++;
              } else {
                message.reply(currentTableCatcher.emotionalState[currentTableCatcher.currentEmotionalState]);
                currentTableCatcher.currentEmotionalState = 0;
                currentTableCatcher.tableBroken = true;
              }
            }
          }
        }
      }
      if (channelHasCatcher === false) {
        tableCatcherArray.push(new TableCatcher(message.channel));
        var currentTableCatcher = tableCatcherArray[tableCatcherArray.length - 1];
        message.reply(currentTableCatcher.emotionalState[currentTableCatcher.currentEmotionalState]);
        currentTableCatcher.lastFlipTimestamp = new Date();
        currentTableCatcher.currentEmotionalState++;
      }
    } else {
      tableCatcherArray[0] = new TableCatcher(message.channel);
      var currentTableCatcher = tableCatcherArray[0];
      message.reply(currentTableCatcher.emotionalState[currentTableCatcher.currentEmotionalState]);
      currentTableCatcher.lastFlipTimestamp = new Date();
      currentTableCatcher.currentEmotionalState++;
    }
  };

  function TableCatcher(channel) {
    this.currentEmotionalState = 0;
    this.emotionalState = ['┬─┬ノ( ゜-゜ノ)', '┬─┬ノ(ಠ益ಠノ)', '┬─┬ノ(ಥ益ಥノ)', '(/ .□.)\ ︵╰(゜Д゜)╯︵ /(.□. \)'];
    this.lastFlipTimestamp = new Date();
    this.channel = channel;
    this.tableBroken = false;
  }
};

module.exports = tableCatchManager;
