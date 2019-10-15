class FSM {

  constructor(config) {
  this.config = config;
      this.history = [];
      this.index = 0;
      this.history[this.index] = [];
      this.history[this.index][0] = null;
      this.history[this.index][1] = this.config.initial;
      this.undoCounter = [];
  
  }
  
  getState() {
    return this.history[this.index][1];
  }
  
  changeState(state) {
    let j = 0;
    for (let stateOptions in this.config.states) {
      if (state === stateOptions) {
      this.index++;
      if (this.undoCounter[this.undoCounter.length - 1] === 1) {
          this.undoCounter.pop();
      } else {
          this.history[this.index] = [];
          this.undoCounter.push(0);
      }
      this.history[this.index][0] = null;
      this.history[this.index][1] = state;
      j++;
      }
    }
    if (j === 0) {
      throw new Error("Exeption: State isn't exist!");
      }
      }
  
  trigger(event) {
    let j = 0;
    let curEvent = '';
    for (let transition in this.config.states[this.history[this.index][1]].transitions) {
      if (transition === event) {
        this.index++;
        if (this.undoCounter[this.undoCounter.length - 1] === 1) {
          this.undoCounter.pop();
      } else {
          this.history[this.index] = [];
          this.undoCounter.push(0);
      }
        this.history[this.index][0] = transition;
        this.history[this.index][1] = this.config.states[this.history[this.index - 1][1]].transitions[transition];
        j++;
      } 
    }
    if (j === 0) {
      throw new Error("Exeption: Event in current state isn't exist");
      }
  }
  
  reset() {
    this.undoCounter = [];
    this.history[this.index][0] = null; 
    this.history[this.index][1] = this.config.initial; 
  }
  
  getStates(event) {
    let result = [];
    let result2 = [];
          let j = 0;
    if (!event) {
      return Object.keys(this.config.states);
        }
    for (let state of Object.keys(this.config.states)) {
      console.log(state);
      for (let ev of Object.keys(this.config.states[state].transitions)) {
      if (ev === event) {
        console.log(ev);
        result.push(state);
                  j++;
      }
      }
    }
    if (j === 0) {
      return result2;
          } else {
          return result;
          }
  }
  
  undo() {
    if (this.index === 0) {
      return false;
    } else if (this.index === 1) {
      this.index--;
      this.history[this.index][0] = null;
      this.history[this.index][1] = this.config.initial;
      this.undoCounter.push(1);
      return true;
    } else if (this.index > 1) {
      this.index--;  
      this.undoCounter.push(1);
      return true;
    } else {
      return false;
    }
  
  }
  
  redo() {
      let j = 1;
          if (this.undoCounter[this.undoCounter.length - j] === 1) {
              do {
                  if (this.history[this.index + j][0] !== null) {
                      this.trigger(this.history[this.index + j][0]);
                      } else {
                      this.changeState(this.history[this.index + j][1]);
                      j++;
                      }
                  } while (this.undoCounter[this.undoCounter.length - j] === 1);
                  
              return true;
          } else {
              return false;
    }
  }
  
  clearHistory() {
        for (let i = 0; i < this.history.length; i++){
            for (let j = 0; j < this.history.length[i]; j++){
                this.history[i][j] = null;
        }
    }
      this.index = 0;
      this.undoCounter = [];
    }
          }

module.exports = FSM;
