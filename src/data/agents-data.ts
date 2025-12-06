export interface Agent {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  gradient: string;
}

export const agentsData: Agent[] = [
  {
    id: "seo-agent",
    name: "SEO Agent",
    icon: "🔍",
    color: "#FF6B6B",
    description: "Optimize your store for search engines and increase organic traffic",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)"
  },
  {
    id: "content-agent",
    name: "Content Agent",
    icon: "✍️",
    color: "#4ECDC4",
    description: "Create compelling content that converts visitors into customers",
    gradient: "linear-gradient(135deg, #4ECDC4 0%, #95E1D3 100%)"
  },
  {
    id: "support-agent",
    name: "Support Agent",
    icon: "💬",
    color: "#A8E6CF",
    description: "Provide 24/7 customer support with intelligent responses",
    gradient: "linear-gradient(135deg, #A8E6CF 0%, #DCEDC8 100%)"
  },
  {
    id: "pricing-agent",
    name: "Pricing Agent",
    icon: "💰",
    color: "#C7CEEA",
    description: "Dynamic pricing optimization to maximize your profits",
    gradient: "linear-gradient(135deg, #C7CEEA 0%, #FFDAB9 100%)"
  },
  {
    id: "inventory-agent",
    name: "Inventory Agent",
    icon: "📦",
    color: "#FFD93D",
    description: "Smart inventory management and stock predictions",
    gradient: "linear-gradient(135deg, #FFD93D 0%, #F95959 100%)"
  },
  {
    id: "ads-agent",
    name: "Ads Agent",
    icon: "📢",
    color: "#FF6B9D",
    description: "Create and optimize ad campaigns across all platforms",
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)"
  },
  {
    id: "recommendation-agent",
    name: "Recommendation Agent",
    icon: "💡",
    color: "#95E1D3",
    description: "AI-powered product recommendations for your customers",
    gradient: "linear-gradient(135deg, #95E1D3 0%, #3FC1C9 100%)"
  },
  {
    id: "logistics-agent",
    name: "Logistics Agent",
    icon: "🚚",
    color: "#F38181",
    description: "Optimize shipping routes and delivery times",
    gradient: "linear-gradient(135deg, #F38181 0%, #FCE38A 100%)"
  },
  {
    id: "fraud-agent",
    name: "Fraud Agent",
    icon: "🛡️",
    color: "#364F6B",
    description: "Advanced fraud detection and prevention system",
    gradient: "linear-gradient(135deg, #364F6B 0%, #3FC1C9 100%)"
  },
  {
    id: "seller-coach-agent",
    name: "Seller Coach Agent",
    icon: "🎯",
    color: "#FC5185",
    description: "Personal coaching to improve your selling strategies",
    gradient: "linear-gradient(135deg, #FC5185 0%, #F5F5F5 100%)"
  },
  {
    id: "photo-enhancer-agent",
    name: "Photo Enhancer Agent",
    icon: "📸",
    color: "#AA96DA",
    description: "Enhance product photos with AI-powered editing",
    gradient: "linear-gradient(135deg, #AA96DA 0%, #FCBAD3 100%)"
  },
  {
    id: "email-agent",
    name: "Email Agent",
    icon: "📧",
    color: "#6C5CE7",
    description: "Automated email marketing campaigns that convert",
    gradient: "linear-gradient(135deg, #6C5CE7 0%, #A8E6CF 100%)"
  }
];

// Helper function to get agent by ID
export const getAgentById = (id: string): Agent | undefined => {
  return agentsData.find(agent => agent.id === id);
};

// Helper function to get multiple agents by IDs
export const getAgentsByIds = (ids: string[]): Agent[] => {
  return agentsData.filter(agent => ids.includes(agent.id));
};