angular
    .module('app')
    .controller('videoController', videoController);

videoController.$inject = ['$rootScope', '$scope', '$element', '$compile', 'videoService', 'mailService'];

function videoController($rootscope, $scope, $element, $compile, videoService, mailService) {


    var vm = this;
    videoService.initialized();
    console.log(videoService.getData());

    var currentQuestion = 0;

    var stopAtSeconds = videoService.getData().content[currentQuestion].seconds;
    vm.prompt="First Question will appear here."
    vm.options = new Array();
    vm.answer = '';

    vm.checkResponse = checkResponse;


    kWidget.addReadyCallback(function( playerId ){
        var kdp = document.getElementById( playerId );
        // binds an event and namespces it to "myPluginName"
        kdp.kBind("playerUpdatePlayhead.myPluginName", function( data, id ){
            // data = the player's progress time in seconds
            // id = the ID of the player that fired the notification
             console.log(stopAtSeconds);

            if (data > stopAtSeconds){
                console.log(stopAtSeconds);
                kdp.sendNotification("doPause");
                setPrompt();
            }





        });



        kdp.kBind("userInitiatedPause.myPluginName", function( data, id ){
            // data = the player's progress time in seconds
            // id = the ID of the player that fired the notification
            console.log("user paused at " + data);
        });
    });

    function getRestartPlayerToggle(){
        return restartPlayerToggle;
    }


    function checkResponse(option, answer){
        if (option == answer){
            console.log("correct");
            window.alert("Correct!");
        }
        else {
            console.log("incorrect");
            window.alert("Incorrect!");

        }
        nextQuestion();
    }

    function nextQuestion(){
        console.log("next question");
        vm.prompt="Next question...";
        vm.options = [];
        currentQuestion++;
        stopAtSeconds = videoService.getData().content[currentQuestion].seconds;

        kWidget.addReadyCallback(function( playerId ){
            var kdp = document.getElementById( playerId );
            // binds an event and namespces it to "myPluginName"
            kdp.sendNotification("doPlay");
        });

        
    }

    function setPrompt (){

        vm.prompt=videoService.getData().content[currentQuestion].prompt;
        vm.options = videoService.getData().content[currentQuestion].options;
        vm.answer= videoService.getData().content[currentQuestion].answer;
        $scope.$digest();
    }


}