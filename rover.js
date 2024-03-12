class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   };

    receiveMessage(message) {
      let results = [];
      for (let i = 0; i < message.commands.length; i++){
         if (message.commands[i].commandType === 'STATUS_CHECK'){
            results[i] = {
               completed: true,
               roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
            };
         }
         else if (message.commands[i].commandType === 'MODE_CHANGE'){
            if (message.commands[i].value === 'LOW_POWER' || message.commands[i].value === 'NORMAL'){
               this.mode = message.commands[i].value; 
            };
               results[i] = {completed: true};
         }
         else if (message.commands[i].commandType === 'MOVE'){
            if (this.mode === 'LOW_POWER'){
               results[i] = {completed: false};
            } else {
               this.position = message.commands[i].value;
               results[i] = {completed: true};
            };
         };
      };
      return {
         message: message.name,
         results: results
      }
   }
};


module.exports = Rover;



