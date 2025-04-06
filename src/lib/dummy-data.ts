
import { nanoid } from 'nanoid';

// Helper function to get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Categories for NGOs
const ngoCategories = [
  'Environment', 'Education', 'Healthcare', 'Poverty', 'Animal Welfare',
  'Human Rights', 'Disaster Relief', 'Arts & Culture', 'Community Development',
  'Food Security', 'Water & Sanitation', 'Refugee Support', 'Children', 'Women Empowerment'
];

// Locations for NGOs
const ngoLocations = [
  'Global', 'North America', 'Europe', 'Asia', 'Africa', 'South America',
  'Australia', 'Middle East', 'Southeast Asia', 'East Africa', 'West Africa',
  'Central America', 'Caribbean', 'Pacific Islands', 'Eastern Europe'
];

// Impact statements for NGOs
const impactStatements = [
  'Planted 1M+ trees', 'Educated 50,000+ children', 'Provided 2M+ meals',
  'Built 500+ water wells', 'Rescued 10,000+ animals', 'Housed 5,000+ families',
  'Distributed 3M+ vaccines', 'Supported 20,000+ refugees', 'Restored 100,000+ acres',
  'Protected 50+ endangered species', 'Empowered 30,000+ women', 'Funded 1,500+ small businesses',
  'Reduced carbon by 500K+ tons', 'Saved 15,000+ lives', 'Created 8,000+ jobs'
];

// Names for NGOs
const ngoNamePrefixes = [
  'Global', 'United', 'International', 'World', 'Universal', 'Earth', 'Planetary',
  'Hope', 'Bright', 'New', 'Future', 'Rising', 'Sustainable', 'Compassionate', 'Kind'
];

const ngoNameSuffixes = [
  'Foundation', 'Initiative', 'Alliance', 'Network', 'Coalition', 'Union',
  'Partnership', 'Association', 'Movement', 'Trust', 'Fund', 'Project', 'Collective',
  'Collaborative', 'Council', 'Action'
];

const ngoThemes = [
  'Hope', 'Future', 'Children', 'Earth', 'Ocean', 'Forest', 'Education', 'Health',
  'Poverty', 'Equality', 'Justice', 'Peace', 'Relief', 'Development', 'Water', 'Food'
];

// Generate a random NGO name
const generateNGOName = (): string => {
  const usePrefix = Math.random() > 0.5;
  
  if (usePrefix) {
    return `${getRandomItem(ngoNamePrefixes)} ${getRandomItem(ngoThemes)} ${getRandomItem(ngoNameSuffixes)}`;
  } else {
    return `${getRandomItem(ngoThemes)} ${getRandomItem(ngoNameSuffixes)}`;
  }
};

// Sample image URLs 
const imageUrls = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1578496781379-7dcfb995293d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1559024094-4a0b775911d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1536859355448-76f92ebdc33d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1469571486292-b53e58fd5e1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1603398920229-ea676722C355?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
];

// Descriptions for NGOs
const ngoDescriptionTemplates = [
  'Working to {action} {target} through {method} and community engagement.',
  'Dedicated to {action} for {target} by implementing innovative {method}.',
  'Committed to {action} {target} with sustainable {method} and advocacy.',
  'Our mission is to {action} and support {target} through {method}.',
  'Empowering communities to {action} {target} with collaborative {method}.'
];

const ngoActions = [
  'protect', 'educate', 'feed', 'house', 'support', 'empower', 'conserve',
  'provide healthcare to', 'advocate for', 'fund', 'rescue', 'rehabilitate',
  'develop', 'restore', 'preserve'
];

const ngoTargets = [
  'underprivileged children', 'endangered species', 'local communities',
  'refugees', 'the environment', 'disaster victims', 'homeless individuals',
  'wildlife habitats', 'vulnerable populations', 'indigenous cultures',
  'natural resources', 'at-risk youth', 'rural areas', 'marginalized groups'
];

const ngoMethods = [
  'educational programs', 'community initiatives', 'policy reform',
  'direct intervention', 'research and development', 'technological solutions',
  'grassroots organizing', 'sustainable practices', 'medical outreach',
  'economic development', 'conservation efforts', 'emergency response',
  'cultural preservation', 'public awareness campaigns'
];

// Generate a random NGO description
const generateNGODescription = (): string => {
  const template = getRandomItem(ngoDescriptionTemplates);
  return template
    .replace('{action}', getRandomItem(ngoActions))
    .replace('{target}', getRandomItem(ngoTargets))
    .replace('{method}', getRandomItem(ngoMethods));
};

// Generate dummy NGO recommendation data
export const generateDummyNGOs = (count: number = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: generateNGOName(),
    category: getRandomItem(ngoCategories),
    location: getRandomItem(ngoLocations),
    impact: getRandomItem(impactStatements),
    matchScore: getRandomInt(70, 99),
    image: getRandomItem(imageUrls),
    description: generateNGODescription(),
  }));
};

// Post types for action feed
const postTypes = ['Donation', 'Volunteer', 'Petition'];

// Titles for action posts
const donationTitles = [
  'Emergency Relief for {location} Disaster',
  'Fund {project} Initiative in {location}',
  'Support {target} in Need',
  'Provide Essential Supplies for {location}',
  'Help Build a {project} in {location}'
];

const volunteerTitles = [
  '{skill} Volunteers Needed for {project}',
  'Join Our {project} Program',
  'Help {target} with Your {skill} Skills',
  'Community {project} Volunteers Wanted',
  'Remote {skill} Support Opportunity'
];

const petitionTitles = [
  'Support the {policy} Act',
  'Stop {problem} in {location}',
  'Advocate for {target} Rights',
  'Call for {action} in {location}',
  'Urge {target} to {action}'
];

const locations = [
  'Kenya', 'Indonesia', 'Brazil', 'Nepal', 'Haiti',
  'Urban Communities', 'Rural Areas', 'Coastal Regions',
  'Mountain Villages', 'Desert Communities', 'Island Nations'
];

const projects = [
  'Clean Water', 'School Building', 'Healthcare Center', 'Community Garden',
  'Solar Power', 'Literacy', 'Microfinance', 'Conservation', 'Tech Education',
  'Mental Health', 'Reforestation', 'Refugee Support'
];

const targets = [
  'Children', 'Women', 'Elderly', 'Refugees', 'Farmers',
  'Indigenous Communities', 'Wildlife', 'Oceans', 'Forests',
  'Endangered Species', 'Small Businesses', 'Artists'
];

const skills = [
  'Medical', 'Teaching', 'Technical', 'Marketing', 'Legal',
  'Construction', 'Design', 'Research', 'Translation', 'Mentoring'
];

const policies = [
  'Environmental Protection', 'Education Reform', 'Healthcare Access',
  'Wildlife Conservation', 'Climate Action', 'Food Security',
  'Clean Energy', 'Digital Rights', 'Fair Housing', 'Living Wage'
];

const problems = [
  'Deforestation', 'Pollution', 'Poverty', 'Discrimination', 'Corruption',
  'Child Labor', 'Animal Testing', 'Water Scarcity', 'Food Waste',
  'Human Trafficking', 'Habitat Destruction'
];

const actions = [
  'Immediate Action', 'Policy Change', 'Corporate Responsibility',
  'Sustainable Practices', 'Funding Allocation', 'Community Engagement',
  'Ethical Standards', 'Transparency', 'Inclusive Decision Making'
];

// Generate titles for different post types
const generatePostTitle = (postType: string): string => {
  let title = '';
  
  if (postType === 'Donation') {
    title = getRandomItem(donationTitles);
  } else if (postType === 'Volunteer') {
    title = getRandomItem(volunteerTitles);
  } else if (postType === 'Petition') {
    title = getRandomItem(petitionTitles);
  }
  
  return title
    .replace('{location}', getRandomItem(locations))
    .replace('{project}', getRandomItem(projects))
    .replace('{target}', getRandomItem(targets))
    .replace('{skill}', getRandomItem(skills))
    .replace('{policy}', getRandomItem(policies))
    .replace('{problem}', getRandomItem(problems))
    .replace('{action}', getRandomItem(actions));
};

// Generate descriptions for action posts
const generatePostDescription = (postType: string): string => {
  if (postType === 'Donation') {
    return `Your donation will help us ${getRandomItem(ngoActions)} ${getRandomItem(ngoTargets)} in ${getRandomItem(locations)}. Together, we can make a difference through ${getRandomItem(ngoMethods)} that create sustainable change.`;
  } else if (postType === 'Volunteer') {
    return `We're looking for ${getRandomItem(skills)} volunteers to help with our ${getRandomItem(projects)} project. This is a chance to use your skills to support ${getRandomItem(targets)} while gaining valuable experience.`;
  } else {
    return `Sign our petition to ${getRandomItem(ngoActions)} ${getRandomItem(ngoTargets)} and stop ${getRandomItem(problems)} in ${getRandomItem(locations)}. Your signature helps push for ${getRandomItem(actions)} that can lead to real change.`;
  }
};

// Generate dummy action posts
export const generateDummyActionPosts = (count: number = 20, ngoData: any[] = []) => {
  const ngos = ngoData.length > 0 ? ngoData : generateDummyNGOs(20);
  
  return Array.from({ length: count }, (_, i) => {
    const ngo = getRandomItem(ngos);
    const postType = getRandomItem(postTypes);
    
    const basePost = {
      id: i + 1,
      ngoName: ngo.name,
      ngoLogo: ngo.image,
      postType,
      title: generatePostTitle(postType),
      description: generatePostDescription(postType),
      image: getRandomItem(imageUrls),
      actions: {
        donate: postType === 'Donation' || Math.random() > 0.5,
        volunteer: postType === 'Volunteer' || Math.random() > 0.7,
        petition: postType === 'Petition' || Math.random() > 0.7
      }
    };
    
    // Add type-specific properties
    if (postType === 'Donation') {
      const goal = getRandomInt(5000, 100000);
      const raisedPercentage = getRandomInt(10, 95) / 100;
      const raised = Math.floor(goal * raisedPercentage);
      
      return {
        ...basePost,
        goal: `$${goal.toLocaleString()}`,
        raised: `$${raised.toLocaleString()}`,
        supporters: getRandomInt(50, 1000),
        daysLeft: getRandomInt(1, 60)
      };
    } else if (postType === 'Volunteer') {
      return {
        ...basePost,
        volunteers: {
          needed: getRandomInt(10, 100),
          signed: getRandomInt(1, 70)
        },
        hoursPerWeek: getRandomInt(1, 10),
        duration: `${getRandomInt(1, 12)} ${Math.random() > 0.5 ? 'weeks' : 'months'}`
      };
    } else {
      // Petition
      const goal = getRandomInt(5000, 50000);
      const current = getRandomInt(1000, goal - 1000);
      
      return {
        ...basePost,
        signatures: {
          goal,
          current
        },
        impact: getRandomItem([
          'Could save 1.2M meals annually',
          'Would protect 50,000 acres of forest',
          'May help 10,000+ children access education',
          'Could reduce plastic waste by 30%',
          'Would improve healthcare for 25,000 people'
        ])
      };
    }
  });
};
