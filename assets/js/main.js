import { Beverage, Water, Milk, Ice, Banilla, Caramel, Mocha } from "./beverage.js";

// 모듈패턴
;const kioskApp = (function(kioskApp, window){
    let coffeMenu = [],
        orderArr = [];
    const coffeList = document.getElementById("coffeMenu"),
          $dim = document.querySelectorAll(".dim")[0],
          $layer = document.querySelectorAll(".layerPopup")[0];
    
    kioskApp.popup = {
        open() {
            $dim.classList.add("active");
            $layer.classList.add("active");
        },
        close() {
            const popHead = document.getElementsByClassName("popHead")[0],
                  popChk = document.getElementById("hotChk");

            $dim.classList.remove("active");
            $layer.classList.remove("active");
            popHead.innerText = '';
            popChk.checked = true;
        },
    };

    kioskApp.app = {
        // 초기화
        init() {
            const self = kioskApp.app;
            
            self.menuFetch();           // DB에서 메뉴정보 받아오기 (가정)
            self.menuBind();            // 메뉴 바인딩
            self.eventTrigger();        // 이벤트 트리거 (이벤트 델리게이션 패턴 적용)
        },
        menuFetch() {
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
        menuBind() {
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
        eventTrigger() {
            const self = kioskApp,
                  popHead = document.getElementsByClassName("popHead")[0],
                  popChk = document.getElementById("hotChk");

            let tempEl = {},
                setEl;

            coffeList.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target || e.srcElement;
                
                if ( target.parentNode.nodeName == 'A' ) {
                    let $el = target.parentNode.childNodes;
                    
                    tempEl['item'] = target.parentNode.getAttribute('data-item'),
                    tempEl['title'] = $el[1].innerText,
                    tempEl['price'] = $el[2].innerText.split(' 원')[0];

                    if ( tempEl.item != 'espresso' ) {
                        popHead.innerText = tempEl['title'];
                        self.popup.open();
                    } else {
                        orderArr.push(new Beverage(tempEl.item));
                        console.log(orderArr);
                    }
                }
                
                if ( target.nodeName == 'A' ) {
                    let $el = target.childNodes;

                    tempEl['item'] = target.getAttribute('data-item'),
                    tempEl['title'] = $el[1].innerText,
                    tempEl['price'] = $el[2].innerText.split(' 원')[0];
                    
                    if ( tempEl.item != 'espresso' ) {
                        popHead.innerText = tempEl['title'];
                        self.popup.open();
                    } else {
                        orderArr.push(new Beverage(tempEl.item));
                        console.log(orderArr);
                    }
                }

            });

            document.getElementById('btnCancel').addEventListener('click', () => self.popup.close());
            document.getElementById('btnAdd').addEventListener('click', () => {
                tempEl['type'] = popChk.checked ? 'hot' : 'ice';
                
                switch ( tempEl.item ) {
                    case 'americano':
                        setEl = tempEl.type == 'hot' ? Water(new Beverage('americano')) : Ice(Water(new Beverage('iceAmericano')));
                        break;
                    case 'cafelatte':
                        setEl = tempEl.type == 'hot' ? Milk(new Beverage('cafelatte')) : Ice(Milk(new Beverage('iceCafelatte')));
                        break;
                    case 'banillalatte':
                        setEl = tempEl.type == 'hot' ? Banilla(Milk(new Beverage('banillalatte'))) : Ice(Banilla(Milk(new Beverage('iceBanillalatte'))));
                        break;
                    case 'caramellatte':
                        setEl = tempEl.type == 'hot' ? Caramel(Milk(new Beverage('caramellatte'))) : Ice(Caramel(Milk(new Beverage('iceCaramellatte'))));
                        break;
                    case 'cafemoca':
                        setEl = tempEl.type == 'hot' ? Mocha(Milk(new Beverage('cafemocha'))) : Ice(Mocha(Milk(new Beverage('iceCafemocha'))));
                        break;
                    default:
                        break;
                }

                orderArr.push(setEl);
                self.popup.close();
                tempEl = [];
                setEl = [];

                console.log(orderArr);
            });


        },
    };

    return kioskApp.app.init();
})(window.kioskApp || {}, window);