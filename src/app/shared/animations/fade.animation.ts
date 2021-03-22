import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

const fadeAnimation = trigger('fade', [
  // ...
  state(
    'fadeIn',
    style({
      opacity: 1,
    })
  ),
  state(
    'fadeOut',
    style({
      opacity: 0,
    })
  ),
  transition('fadeIn <=> fadeOut', [animate('0.8s')]),
]);

export default fadeAnimation;
