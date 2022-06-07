import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const SLIDE_IN_ANIMATION = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))],
        { optional: true }
      ),
    ])
  ])
])

export const fadeInOut = trigger('fadeInOut', [
  transition('* => *', [
    query(
      ':enter', [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave', [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);
