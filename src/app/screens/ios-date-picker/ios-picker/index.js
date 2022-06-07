import BScroll from './bs.min';

const css = ".rolldate-container{font-size:20px;color:#333;text-align:center}.rolldate-container ul{margin:0;padding:0}.rolldate-container li{list-style-type:none}.rolldate-container header{position:relative;line-height:60px;font-size:18px;border-bottom:1px solid #e0e0e0}.rolldate-container .rolldate-mask{position:fixed;width:100%;height:100%;top:0;left:0;z-index:999;background-color:rgba(37,38,45,.4)}.rolldate-container .rolldate-panel{position:fixed;bottom:0;left:0;width:100%;height:333px;z-index:1000;background:#fff;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out;-webkit-transform:translate3d(0,273px,0);transform:translate3d(0,273px,0)}.rolldate-container .rolldate-btn{position:absolute;left:0;top:0;height:100%;padding:0 15px;color:#666;font-size:16px;cursor:pointer;-webkit-tap-highlight-color:transparent}.rolldate-container .rolldate-confirm{left:auto;right:0;color:#007bff}.rolldate-container .rolldate-content{position:relative;top:20px}.rolldate-container .rolldate-wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.rolldate-container .rolldate-wrapper>div{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:173px;line-height:36px;overflow:hidden;-webkit-flex-basis:-8e;-ms-flex-preferred-size:-8e;flex-basis:-8e;width:1%}.rolldate-container .rolldate-wrapper ul{margin-top:68px}.rolldate-container .rolldate-wrapper li{height:36px}.rolldate-container .rolldate-dim{position:absolute;left:0;top:0;width:100%;height:68px;background:-o-linear-gradient(bottom,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));background:-webkit-gradient(linear, left bottom, left top, from(hsla(0, 0%, 100%, 0.4)), to(hsla(0, 0%, 100%, 0.8)));background:-o-linear-gradient(bottom, hsla(0, 0%, 100%, 0.4), hsla(0, 0%, 100%, 0.8));background:linear-gradient(0deg,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));pointer-events:none;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:10}.rolldate-container .mask-top{border-bottom:1px solid #ebebeb}.rolldate-container .mask-bottom{top:auto;bottom:1px;border-top:1px solid #ebebeb}.rolldate-container .fadeIn{-webkit-transform:translateZ(0);transform:translateZ(0)}.rolldate-container .fadeOut{-webkit-transform:translate3d(0,273px,0);transform:translate3d(0,273px,0)}@media screen and (max-width:414px){.rolldate-container{font-size:18px}}@media screen and (max-width:320px){.rolldate-container{font-size:15px}}";

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  const insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
styleInject(css);
let $ = (selector, flag) => {
  if(typeof selector != 'string' && selector.nodeType){
    return selector;
  }
  return flag? document.querySelectorAll(selector) : document.querySelector(selector);
}
export function RollDate(config = {}){
  let _this = this,
    el;

  _this.extend(config);
  if(config.el){
    el = $(config.el);

    if(!el || el.bindRolldate){return;}
    el.bindRolldate = 1;

    _this.tap(el, function(){
      _this.show();
    })
  }

  if(config.value){
    if(config.el){
      if(el.nodeName.toLowerCase() == 'input'){
        el.value = config.value;
      }else{
        el.innerText = config.value;
      }
    }
    let str = config.value.replace(/-/g, '/').replace(/[^\d/:\s]/g, ''),
      date = new Date(str);

    if(!date || date == 'Invalid Date'){
      console.error('Invalid Date：'+str);
    }else{
      if(config.el){
        el.bindDate = date;
      }else{
        _this.bindDate = date;
      }
    }
  }
}
RollDate.prototype = {
  constructor: RollDate,
  baseData: function() {
    return {
      domId: {
        YYYY: 'rolldate-year',
        MM: 'rolldate-month',
        DD: 'rolldate-day',
        hh: 'rolldate-hour',
        mm: 'rolldate-min',
        ss: 'rolldate-sec'
      },
      opts: {
        el:'',
        format:'YYYY-MM-DD',
        beginYear: 1920,
        endYear: 2050,
        init:null,
        moveEnd:null,
        confirm:null,
        cancel:null,
        minStep:1,
        trigger: 'tap',
        cfg: {
          language: 'vi'
        }
      }
    };
  },
  extend: function(config){
    let _this = this,
      opts = _this.baseData().opts;

    for(let key in opts){
      if(opts[key] && Object.prototype.toString.call(opts[key]) == '[object Object]'){
        for(let key2 in config[key]){
          opts[key][key2] = config[key][key2] == undefined? opts[key][key2]:config[key][key2];
        }
      }else{
        opts[key] = config[key] || opts[key];
      }
    }
    _this.config = opts;
  },
  createUI: function(){
    let _this = this,
      data = _this.baseData(),
      config = _this.config,
      domId = data.domId,
      FormatArr = config.format.split(/-|\/|\s|:/g),
      len = FormatArr.length,
      ul = '',
      date = config.el? ($(config.el).bindDate || new Date()) : (_this.bindDate || new Date()),
      itemClass = '',
      cfg = config.cfg,
      language = cfg.language,
      headerInfo = [...FormatArr],
      headerElement = '';
    for(let i=0; i<len; i++){
      let f = FormatArr[i],
        domMndex = 0;
      if(headerInfo[i] === ('YYYY')) {
        headerInfo[i] = language === 'en' ? 'Year' : 'Năm';
      }
      if(headerInfo[i] === 'DD') {
        headerInfo[i] = language === 'en' ? 'Day' : 'Ngày';
      }
      if(headerInfo[i] === 'MM') {
        headerInfo[i] = language === 'en' ? 'Month' : 'Tháng';
      }
      if(headerInfo[i] === 'mm') {
        headerInfo[i] = language === 'en' ? 'Minute' : 'Phút';
      }
      if(headerInfo[i] === 'ss') {
        headerInfo[i] = language === 'en' ? 'Second' : 'Giây';
      }
      if(headerInfo[i] === 'hh'){
        headerInfo[i] = language === 'en' ? 'Hour' : 'Giờ';
      }
      if(headerInfo[i] === 'mm'){
        headerInfo[i] = language === 'en' ? 'Minute' : 'Phút';
      }
      ul += '<div id="'+ domId[f]+'"><ul class="wheel-scroll">';
      headerElement += `<div style="flex: 1">${headerInfo[i]}</div>`
      if(f == 'YYYY'){
        for(let j=config.beginYear; j<=config.endYear; j++){
          itemClass = j == date.getFullYear()? 'active':'';

          ul += `<li class="wheel-item ${itemClass}" data-index="${domMndex}">${j}</li>`;
          domMndex ++;
        }
      }else if(f == 'MM'){
        for(let k=1; k<=12; k++){
          itemClass = k == date.getMonth() + 1? 'active':'';

          ul += `<li class="wheel-item ${itemClass}" data-index="${domMndex}">${k<10? '0'+k : k}</li>`;
          domMndex ++;
        }
      }else if(f == 'DD'){
        let day = _this.getMonthlyDay(date.getFullYear(), date.getMonth() + 1);
        for(let l=1; l<=day; l++){
          itemClass = l == date.getDate()? 'active':'';
          const x = `0${l}`.slice(-2)
          ul += `<li class="wheel-item ${itemClass}" data-index="${domMndex}">${x}</li>`;
          domMndex ++;
        }
      }else if(f == 'hh'){
        for(let m=0; m<=23; m++){
          itemClass = m == date.getHours()? 'active':'';

          ul += `<li class="wheel-item ${itemClass}" data-index="${domMndex}">${m<10? '0'+m : m}</li>`;
          domMndex ++;
        }
      }else if(f == 'mm'){
        for(let n=0; n<=59; n+=config.minStep){
          itemClass = n == date.getMinutes()? 'active':'';

          ul += `<li class="wheel-item ${itemClass}" data-index="${domMndex}">${n<10? '0'+n : n}</li>`;
          domMndex ++;
        }
      }else if(f == 'ss'){
        for(let o=0; o<=59; o++){
          itemClass = o == date.getSeconds()? 'active':'';

          ul += `<li class="wheel-item ${itemClass}" data-index="${domMndex}">${o<10? '0'+o : o}</li>`;
          domMndex ++;
        }
      }
      ul += '</ul></div>'
    }
    let $html = `<div class="rolldate-mask"></div>
            <div class="rolldate-panel">
                <header>
                    <span class="rolldate-btn rolldate-cancel">${cfg.language === 'en' ? 'Cancel' : 'Huỷ'}</span>
                    ${cfg.language === 'en' ? 'Pick time' : 'Chọn thời gian'}
                    <span class="rolldate-btn rolldate-confirm">${cfg.language === 'en' ? 'Apply' : 'Lưu'}</span>
                </header>
                <header style="display: flex">${headerElement}</header>
                <section class="rolldate-content">
                    <div class="rolldate-dim mask-top"></div>
                    <div class="rolldate-dim mask-bottom"></div>
                    <div class="rolldate-wrapper">
                        ${ul}
                    </div>
                </section>
            </div>`,
      box = document.createElement("div");

    box.className = `rolldate-container`;
    box.innerHTML = $html;
    document.body.appendChild(box);

    _this.scroll = {};

    for(let i=0; i<len; i++){
      let $id = domId[FormatArr[i]];

      _this.scroll[FormatArr[i]] = new BScroll('#'+$id, {
        wheel: {
          selectedIndex: 0
        }
      });

      let that = _this.scroll[FormatArr[i]],
        active = $(`#${$id} .active`),
        index = active? active.getAttribute('data-index') : Math.round(date.getMinutes()/config.minStep);

      that.wheelTo(index);
      // 滚动结束
      that.on('scrollEnd', () => {
        if(config.moveEnd){
          config.moveEnd.call(_this, that);
        }
        if([domId['YYYY'], domId['MM']].indexOf(that.wrapper.id) != -1 && _this.scroll['YYYY'] && _this.scroll['MM'] && _this.scroll['DD']){
          let day = _this.getMonthlyDay(_this.getSelected(_this.scroll['YYYY']), _this.getSelected(_this.scroll['MM'])),
            li = '';

          if(day != $('#'+domId['DD']+' li', 1).length){

            for(let l=1; l<=day; l++){
              li += `<li class="wheel-item">${l<10? '0'+l : l}</li>`;
            }
            $('#'+domId['DD']+' ul').innerHTML = li;
            _this.scroll['DD'].refresh();
          }
        }
      })

    }
    $('.rolldate-panel').className = 'rolldate-panel fadeIn';
  },
  tap:function (el, fn) {
    let _this = this,
      hasTouch = "ontouchstart" in window;

    if(hasTouch && _this.config.trigger == 'tap'){
      let o = {},
        touchstart = function(e) {
          let t = e.touches[0];

          o.startX = t.pageX;
          o.startY = t.pageY;
          o.sTime = + new Date;
        },
        touchend = function(e) {
          let t = e.changedTouches[0];

          o.endX = t.pageX;
          o.endY = t.pageY;
          if((+ new Date) - o.sTime < 300){
            if(Math.abs(o.endX-o.startX) + Math.abs(o.endY-o.startY) < 20){
              e.preventDefault();
              fn.call(this, e);
            }
          }
          o = {};
        };

      if(typeof fn == 'function'){
        el.addEventListener('touchstart', touchstart);
        el.addEventListener('touchend', touchend);
      }else{
        el.removeEventListener('touchstart', touchstart);
        el.removeEventListener('touchend', touchend);
      }
    }else{
      let click = function(e) {
        fn.call(this, e);
      };
      if(typeof fn == 'function'){
        el.addEventListener('click', click);
      }else{
        el.removeEventListener('click', click);
      }
    }
  },
  show: function(){
    let _this = this,
      config = _this.config,
      el;

    if(config.el){
      el = $(config.el);

      if(!el.bindRolldate){return;}
      if(el.nodeName.toLowerCase() == 'input'){el.blur();}
    }
    if($('.rolldate-container')){return;}
    if(config.init && config.init.call(_this) === false){return;}

    _this.createUI();
    _this.event();
  },
  hide: function(flag){
    let _this = this,
      el = $('.rolldate-panel.fadeIn');

    if(el){
      el.className = 'rolldate-panel fadeOut';
      _this.destroy(flag);
    }
  },
  event: function(){
    let _this = this,
      mask = $('.rolldate-mask'),
      cancel = $('.rolldate-cancel'),
      confirm = $('.rolldate-confirm');

    _this.tap(mask, function(){
      _this.hide(1);
    })
    _this.tap(cancel, function(){
      _this.hide(1);
    })
    _this.tap(confirm, function(){
      let config = _this.config,
        el,
        date = config.format,
        newDate = new Date();

      for(let f in _this.scroll){
        let d = _this.getSelected(_this.scroll[f]);

        date = date.replace(f, d);
        if(f == 'YYYY'){
          newDate.setFullYear(d);
        }else if(f == 'MM'){
          newDate.setMonth(d-1);
        }else if(f == 'DD'){
          newDate.setDate(d);
        }else if(f == 'hh'){
          newDate.setHours(d);
        }else if(f == 'mm'){
          newDate.setMinutes(d);
        }else if(f == 'ss'){
          newDate.setSeconds(d);
        }
      }
      if(config.confirm){
        let flag = config.confirm.call(_this, date);
        if(flag === false){
          return false
        }else if(flag){
          date = flag;
        }
      }
      if(config.el){
        el = $(config.el);
        if(el.nodeName.toLowerCase() == 'input'){
          el.value = date;
        }else{
          el.innerText = date;
        }
        el.bindDate = newDate;
      }else{
        _this.bindDate = newDate;
      }
      _this.hide();

    })
  },
  getMonthlyDay: function(year, month){
    let day;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      day = 31
    } else if (month == 4 || month == 6 || month == 11 || month == 9) {
      day = 30
    } else if (month == 2) {
      if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) { //闰年
        day = 29
      } else {
        day = 28
      }

    }
    return day;
  },
  destroy: function(flag){
    let _this = this,
      config = _this.config;

    for(let i in _this.scroll){
      _this.scroll[i].destroy();
    }

    if(flag && config.cancel){
      config.cancel.call(_this);
    }

    _this.tap($('.rolldate-mask'), 0);
    _this.tap($('.rolldate-cancel'), 0);
    _this.tap($('.rolldate-confirm'), 0);
    setTimeout(function() {
      let el = $('.rolldate-container');

      if(el)document.body.removeChild(el);
      el = null;
    }, 300);
  },
  getSelected: function(scroll){
    return $('#'+scroll.wrapper.id+' li', 1)[scroll.getSelectedIndex()].innerText.replace(/\D/g, '');
  }
}
