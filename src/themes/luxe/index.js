import config from './config';
import * as components from './components';
import './styles/theme.css';

export default {
  config,
  components,
  name: 'luxe',
  displayName: 'Luxe Theme',
  description: 'Premium, elegant design for high-end brands. Perfect for luxury fashion, jewelry, and premium products',
  preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop&q=80',
  features: [
    'Video Backgrounds',
    'Elegant Typography',
    'Premium Feel',
    'Gold Accents',
    'Sophisticated Animations',
    'Luxury Shopping Experience',
  ],
};

export { components };
export { config };
