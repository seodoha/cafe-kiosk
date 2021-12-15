;const kioskApp = (function(kioskApp, window){
    kioskApp = {
        // 초기화
        init: () => {
            const self = kioskApp;
            
            self.menuFetch();
            self.eventTrigger();
        },
        menuFetch: () => {
            let menuArr = [];


        },
        eventTrigger: () => {
            const list = document.getElementById("coffeMenu");

            list.addEventListener('click', (e) => {
                e.preventDefault();


            });
        },
    };

    return kioskApp.init();
})(window.kioskApp || {}, window);