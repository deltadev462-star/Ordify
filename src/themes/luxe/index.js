import config from './config';
import * as components from './components';
import './styles/theme.css';

// Export luxe theme configuration and components
export default {
  config,
  components,
  name: 'luxe',
  displayName: 'Luxe Theme',
  description: 'Premium, elegant design for high-end brands. Perfect for luxury fashion, jewelry, and premium products',
  preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop&q=80', // Luxury store preview
  features: [
    'Video Backgrounds',
    'Elegant Typography',
    'Premium Feel',
    'Gold Accents',
    'Sophisticated Animations',
    'Luxury Shopping Experience',
  ],
};

// Re-export components for easier access
export { components };
export { config };