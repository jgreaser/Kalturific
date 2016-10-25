angular
    .module('app')
    .factory('videoService', videoService);

videoService.$inject = [];

function videoService() {
    

    var data =  {
        uiconfID: '35766781',
        entryID: '1_nxe6z1hf',
        options: {},
        content:[{seconds: 5,
                prompt: 'Did he come from the left, or the right?',
                options: ['left', 'right', 'top', 'bottom'],
                answer: 'left'},
                {seconds: 10,
                prompt: 'Seriously  though, left or right?',
                options: ['left', 'right'],
                answer: 'left'},
                {seconds: 20,
                prompt: 'Did you see the gorilla?',
                options: ['yes', 'no'],
                answer: 'yes'}]};

    var service = {
        initialized: initialized,
        getData: getData
    };

    return service;

    function initialized(){
        console.log("initialized");
    }

    function getData(){
        return data;
    }    
}


