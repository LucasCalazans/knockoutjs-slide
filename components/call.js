define([], function() {

    return function(params) {
        this.call = () => {
            let audio = new Audio('/components/msn.mp3');
            audio.play();
        }
    };
});