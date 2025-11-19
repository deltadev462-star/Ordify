import config from './config';
import * as components from './components';
import './styles/theme.css';

export default {
  config,
  components,
  name: 'modern',
  displayName: 'Modern Theme',
  description: 'Clean, contemporary design perfect for fashion & lifestyle brands',
  preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=225&fit=crop&q=80',
  features: [
    'Hero Slider',
    'Product Grid with Hover Effects',
    'Mega Menu',
    'Quick View',
    'Responsive Design',
    'Smooth Animations',
  ],
};

export { components };
export { config };