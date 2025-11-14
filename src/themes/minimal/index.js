import config from './config';
import * as components from './components';
import './styles/theme.css';

// Export minimal theme configuration and components
export default {
  config,
  components,
  name: 'minimal',
  displayName: 'Minimal Theme',
  description: 'Clean, minimal design focusing on products. Perfect for luxury goods, jewelry, and premium brands',
  preview: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=225&fit=crop&q=80', // Minimal store preview
  features: [
    'Full-screen Images',
    'Subtle Animations',
    'Lots of White Space',
    'Minimal Navigation',
    'Focus on Products',
    'Elegant Typography',
  ],
};

// Re-export components for easier access
export { components };
export { config };