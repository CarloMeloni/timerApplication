class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if(callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if(this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 2);

    };

    pause = () => {
        clearInterval(this.interval);
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
            if(this.onComplete) {
                this.onComplete();
            }
            this.pause();
            
        } else {
            this.timeRemaining = this.timeRemaining - 0.02;
            ////SET/////////////////GET//////////
            if(this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}