class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config) {
            throw Error();
        }

        this.states = config.states;
        this.defaultState = config.initial;
        this.story = [];
        this.head = 0;
        this.changeState(config.initial);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(!this.states[state]) {
            throw Error();
        }

        this.state = state;
        if(this.head === this.story.length) {
            this.story.push(state);
        }
        
        this.head++;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.changeState(this.states[this.state].transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.defaultState);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        return !event ?
            Object.keys(this.states) :            
            Object.keys(this.states).filter(x => this.states[x].transitions[event]);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.head < 2) {
            return false;
        } else {
            this.head--;
            this.state = this.story[this.head - 1];
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.story.length === this.head) {
            return false;
        } else {
            this.state = this.story[this.head];
            this.head++;
            return true;  
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.story = [];
        this.head = 0;
        this.changeState(this.state);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
