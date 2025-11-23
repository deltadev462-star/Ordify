import config from './config';
import * as components from './components';
import './styles/theme.css';

export default {
  config,
  components,
  name: 'minimal',
  displayName: 'Minimal Theme',
  description: 'Clean, minimal design focusing on products. Perfect for luxury goods, jewelry, and premium brands',
  preview: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=225&fit=crop&q=80',
  features: [
    'Full-screen Images',
    'Subtle Animations',
    'Lots of White Space',
    'Minimal Navigation',
    'Focus on Products',
    'Elegant Typography',
  ],
};

export { components };
export { config };
