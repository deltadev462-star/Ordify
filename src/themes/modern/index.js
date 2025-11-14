import config from './config';
import * as components from './components';
import './styles/theme.css';

// Export modern theme configuration and components
export default {
  config,
  components,
  name: 'modern',
  displayName: 'Modern Theme',
  description: 'Clean, contemporary design perfect for fashion & lifestyle brands',
  preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=225&fit=crop&q=80', // Fashion store preview
  features: [
    'Hero Slider',
    'Product Grid with Hover Effects',
    'Mega Menu',
    'Quick View',
    'Responsive Design',
    'Smooth Animations',
  ],
};

// Re-export components for easier access
export { components };
export { config };