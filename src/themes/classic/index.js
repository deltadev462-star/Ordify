import config from './config';
import * as components from './components';
import './styles/theme.css';

// Export classic theme configuration and components
export default {
  config,
  components,
  name: 'classic',
  displayName: 'Classic Theme',
  description: 'Traditional ecommerce design with proven conversion patterns for established brands',
  preview: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=225&fit=crop&q=80', // Classic store preview
  features: [
    'Sidebar Filters',
    'Breadcrumb Navigation',
    'Detailed Product Info',
    'Customer Reviews',
    'Traditional Layout',
    'Pagination',
  ],
};

// Re-export components for easier access
export { components };
export { config };