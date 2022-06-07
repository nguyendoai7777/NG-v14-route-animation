export interface RollDateProp {
  el: string;
  format:  'DD/MM' | 'MM/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD' | 'YYYY/MM' |
    'YYYY-DD-MM' | 'YYYY/DD/MM' |
    'DD-MM' | 'MM-YYYY' | 'DD-MM-YYYY' | 'YYYY-MM-DD' | 'YYYY-MM' |
    'YYYY' | 'DD' | 'MM' |
    'hh' | 'mm' | 'ss' | 'hh:mm:ss' | 'hh:mm' | 'mm:ss';
  beginYear: number;
  endYear: number;
  init?: () => void;
  moveEnd?: (scrollEnd: ScrollEndDateEvent) => void;
  confirm?: (dateValue: string) => void;
  cancel?: () => void;
  minStep?: number;
  trigger: 'tap' | 'click';
  cfg?: {
    language?: 'vi' | 'en';
  }
}

export interface ScrollEndDateEvent {
  absStartX: number;
  absStartY: number;
  directionLocked: string;
  directionX: number;
  directionY: number;
  distX: number;
  distY: number;
  enabled: boolean;
  endTime: number;
  hasHorizontalScroll: boolean;
  hasVerticalScroll: boolean;
  initiated: boolean;
  itemHeight: number;
  items: HTMLCollection;
  lastScale: number;
  maxScrollX: number;
  maxScrollY: number;
  minScrollX: number;
  minScrollY: number;
  moved: boolean;
  movingDirectionX: number;
  movingDirectionY: number;
  options: {
    HWCompositing: boolean;
    autoBlur: boolean;
    bindToWrapper: boolean;
    bounce: boolean;
    bounceTime: number;
    click: boolean;
    dblclick: boolean;
    deceleration: number;
    directionLockThreshold: number;
    disableMouse: boolean;
    disableTouch: boolean;
    eventPassthrough: string;
    flickLimitDistance: number;
    flickLimitTime: number;
    freeScroll: boolean;
    infinity: boolean;
    itemHeight: number;
    momentum: boolean;
    momentumLimitDistance: number;
    momentumLimitTime: number;
    mouseWheel: boolean;
    observeDOM: boolean;
    preventDefault: boolean;
    preventDefaultException: {
      tagName: RegExp;
    };
    probeType: number;
    pullDownRefresh: boolean;
    pullUpLoad: boolean;
    resizePolling: number;
    scrollX: boolean;
    scrollY: boolean;
    scrollbar: boolean;
    snap: boolean;
    startX: number;
    startY: number;
    stopPropagation: boolean;
    swipeBounceTime: number;
    swipeTime: number;
    tap: boolean;
    useTransform: boolean;
    useTransition: boolean;
    wheel: {
      selectedIndex: number;
      wheelItemClass: string;
      wheelWrapperClass: string;
    };
    zoom: boolean;
  };
  pointX: number;
  pointY: number;
  relativeX: number;
  relativeY: number;
  scale: number;
  scroller: HTMLElement;
  scrollerHeight: number;
  scrollerStyle: CSSStyleDeclaration;
  scrollerWidth: number;
  selectedIndex: number;
  startTime: number;
  startX: number;
  startY: number;
  stopFromTransition: boolean;
  target: HTMLElement;
  translateZ: `translateZ(${any})`;
  wrapper: HTMLElement;
  wrapperHeight: number;
  wrapperOffset: {
    left: number;
    top: number;
  };
  wrapperWidth: number;
  x: number;
  y: number;
}
