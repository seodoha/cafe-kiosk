import { Espresso, Water, Ice } from "./beverage.js";

// 모듈패턴
;const kioskApp = (function(kioskApp, window){
    let coffeMenu = [];
    const coffeList = document.getElementById("coffeMenu");

    kioskApp = {
        // 초기화
        init: () => {
            const self = kioskApp;
            
            self.menuFetch();           // DB에서 메뉴정보 받아오기 (가정)
            self.menuBind();            // 메뉴 바인딩
            self.eventTrigger();        // 이벤트 트리거 (이벤트 델리게이션 패턴 적용)
        },
        menuFetch: () => {
            coffeMenu.push({
                item : 'espresso',
                src : 'assets/images/espresso.jpg',
                title : '에스프레소',
                price : 1500
            });

            coffeMenu.push({
                item : 'americano',
                src : 'assets/images/americano.jpg',
                title : '아메리카노',
                price : 1800
            });

            coffeMenu.push({
                item : 'cafelatte',
                src : 'assets/images/cafelatte.jpg',
                title : '카페라떼',
                price : 2300
            });

            coffeMenu.push({
                item : 'banillalatte',
                src : 'assets/images/banillalatte.jpg',
                title : '바닐라라떼',
                price : 2500
            });

            coffeMenu.push({
                item : 'caramellatte',
                src : 'assets/images/caramellatte.jpg',
                title : '카라멜라떼',
                price : 2500
            });

            coffeMenu.push({
                item : 'cafemoca',
                src : 'assets/images/cafemoca.jpg',
                title : '카페모카',
                price : 2500
            });
        },
        menuBind: () => {
            coffeMenu.map((obj) => {
                const $el_li = document.createElement('li'),
                    $el_a = document.createElement('a'),
                    $el_img = document.createElement('img'),
                    $el_tit = document.createElement('span'),
                    $el_price = document.createElement('span');

                $el_a.setAttribute('href', '#');
                $el_a.setAttribute('data-item', obj.item);

                $el_img.setAttribute('src', obj.src);
                $el_img.setAttribute('alt', obj.title);

                $el_tit.className = 'tit';
                $el_tit.innerText = obj.title;

                $el_price.className = 'price';
                $el_price.innerText = obj.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' 원';
                
                $el_a.append($el_img);
                $el_a.append($el_tit);
                $el_a.append($el_price);
                $el_li.append($el_a);
                coffeList.append($el_li);
            });
        },
        eventTrigger: () => {
            const self = kioskApp;

            console.log(new Espresso());  // 에스프레소
            console.log(Water(new Espresso()));  // 아메리카노
            console.log(Ice(Water(new Espresso())));  // 아이스 아메리카노
            console.log();  // 카페라떼
            console.log();  // 아이스 카페라떼

            coffeList.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target || e.srcElement;

                if ( target.parentNode.nodeName == 'A' || target.nodeName == 'A' ) {
                    
                }

            });
        },
    };

    return kioskApp.init();
})(window.kioskApp || {}, window);