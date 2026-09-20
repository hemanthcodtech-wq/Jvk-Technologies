const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'platform_stats'
  },
  stats: {
    studentsCount: { type: Number, default: 5000 },
    studentsSuffix: { type: String, default: '+' },
    studentsLabel: { type: String, default: 'Students' },
    
    coursesCount: { type: Number, default: 25 },
    coursesSuffix: { type: String, default: '+' },
    coursesLabel: { type: String, default: 'Courses' },

    instructorsCount: { type: Number, default: 15 },
    instructorsSuffix: { type: String, default: '+' },
    instructorsLabel: { type: String, default: 'Instructors' },

    satisfactionRate: { type: Number, default: 99 },
    satisfactionSuffix: { type: String, default: '%' },
    satisfactionLabel: { type: String, default: 'Satisfaction' },

    communitiesCount: { type: Number, default: 15 },
    communitiesSuffix: { type: String, default: '+' },
    communitiesLabel: { type: String, default: 'Global Communities' },

    lineageRate: { type: Number, default: 100 },
    lineageSuffix: { type: String, default: '%' },
    lineageLabel: { type: String, default: 'Authentic Vedic Lineage' }
  },
  contact: {
    whatsappNumber: { type: String, default: '+919059519151' },
    callNumber: { type: String, default: '+919059519151' },
    email: { type: String, default: 'support@jvktech.com' },
    address: { type: String, default: 'IT Hub, India' }
  },
  categories: {
    type: [String],
    default: ['Full Stack Java', 'Python & AI', 'MERN Stack', 'Cloud & DevOps', 'Software Testing', 'Data Engineering', 'Software Development', 'Service Now', 'Salesforce', 'Other']
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
