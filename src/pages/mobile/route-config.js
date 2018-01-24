import MobileIndex from './mobile-index';
import MobileSlip from './mobile-slip';
import MobilePPT from './mobile-ppt';
import MobileMusic from './mobile-music-page';
import PhotoAlbums from './photoAlbums';
import Test from './test';

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
    path: 'photo-albums',
    name: 'photoAlbums',
    component: PhotoAlbums
  },
  {
    path: 'test',
    name: 'test',
    component: Test
  }
];
