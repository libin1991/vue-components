import MobileIndex from './mobile-index';
import MobileSlip from './mobile-slip';
import MobilePPT from './mobile-ppt';
import MobileMusic from './mobile-music-page';
import Transform3D from './transform3D';

export default [
  {
    path: '',
    name: 'mobileIndex',
    component: MobileIndex
  },
  {
    path: 'mobile-slip',
    name: 'mobileSlip',
    component: MobileSlip
  },
  {
    path: 'mobile-ppt',
    name: 'mobilePPT',
    component: MobilePPT
  },
  {
    path: 'mobile-music',
    name: 'mobileMusic',
    component: MobileMusic
  },
  {
    path: 'transform-3d',
    name: 'transform3D',
    component: Transform3D
  }
];
