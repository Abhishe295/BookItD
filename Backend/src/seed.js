import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Experience from './models/Experience.js';
import Promo from './models/Promo.js';
// import Art_Workshop from './assets/Art Workshop.webp';
// import Beach_Yoga from './assets/Beach Yoga.jpg';
// import Camel_Safari from './assets/Camel Safari.avif';
// import City_Food_Walk from './assets/City Food Walk.jpg';
// import Coffee_Tasting from './assets/Coffee Tasting.jpg';
// import Cooking_Class from './assets/cooking class.jpg';
// import Cycling_Tour from './assets/Cycling Tour.jpg';
// import Heritage_Walk from './assets/Heritage walk.jpg';
// import Mountain_Trekking from './assets/Mountain Trekking.jpg';
// import Nature_Photography_Hike from './assets/Nature Photography Hike.jpg';
// import River_Rafting from './assets/River Rafting.webp';
// import Street_Photography_Tour from './assets/Street Photography Tour.jpg';
// import Sunset_Kayaking from './assets/Sunset Kayaking.jpg';
// import Tea_Plantation_Tour from './assets/Tea Plantation Tour.jpg';
// import Temple_Tour from './assets/Temple Tour.jpg';


dotenv.config({ path: '../.env' });

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in env');

  await mongoose.connect(uri);
  console.log('[✓] MongoDB connected');

  await Experience.deleteMany({});
  await Promo.deleteMany({});

const experiences = [
  {
    title: 'Sunset Kayaking',
    location: 'Goa',
    coverImage: '/assets/Sunset Kayaking.jpg',
    shortDescription: 'Paddle while watching the sunset.',
    longDescription: '2 hours kayaking experience with snacks.',
    timeSlots: [
      { date: '2025-11-01', time: '16:00 - 18:00', price: 1200, available: 8 },
      { date: '2025-11-02', time: '16:00 - 18:00', price: 1200, available: 8 }
    ]
  },
  {
    title: 'City Food Walk',
    location: 'Delhi',
    coverImage: '/assets/City Food Walk.jpg',
    shortDescription: 'Taste local specialties with a guide.',
    longDescription: '3-hour walking food tour.',
    timeSlots: [
      { date: '2025-11-05', time: '10:00 - 13:00', price: 800, available: 12 },
      { date: '2025-11-06', time: '10:00 - 13:00', price: 800, available: 12 }
    ]
  },
  {
    title: 'Mountain Trekking',
    location: 'Manali',
    coverImage: '/assets/Mountain Trekking.jpg',
    shortDescription: 'Explore Himalayan trails.',
    longDescription: 'Full-day guided trek with lunch and gear.',
    timeSlots: [
      { date: '2025-11-10', time: '08:00 - 17:00', price: 1500, available: 10 }
    ]
  },
  {
    title: 'Beach Yoga',
    location: 'Pondicherry',
    coverImage: '/assets/Beach Yoga.jpg',
    shortDescription: 'Morning yoga by the sea.',
    longDescription: '1-hour session with certified instructor.',
    timeSlots: [
      { date: '2025-11-03', time: '07:00 - 08:00', price: 500, available: 15 }
    ]
  },
  {
    title: 'Tea Plantation Tour',
    location: 'Munnar',
    coverImage: '/assets/Tea Plantation Tour.jpg',
    shortDescription: 'Walk through lush tea gardens.',
    longDescription: '2-hour guided tour with tasting.',
    timeSlots: [
      { date: '2025-11-07', time: '09:00 - 11:00', price: 600, available: 10 }
    ]
  },
  {
    title: 'Camel Safari',
    location: 'Jaisalmer',
    coverImage: '/assets/Camel Safari.avif',
    shortDescription: 'Ride into the desert.',
    longDescription: 'Evening camel ride with sunset view.',
    timeSlots: [
      { date: '2025-11-08', time: '17:00 - 19:00', price: 1000, available: 6 }
    ]
  },
  {
    title: 'Heritage Walk',
    location: 'Jaipur',
    coverImage: '/assets/Heritage walk.jpg',
    shortDescription: 'Discover royal architecture.',
    longDescription: '3-hour walk through forts and palaces.',
    timeSlots: [
      { date: '2025-11-04', time: '09:00 - 12:00', price: 700, available: 10 }
    ]
  },
  {
    title: 'River Rafting',
    location: 'Rishikesh',
    coverImage: '/assets/River Rafting.webp',
    shortDescription: 'Thrilling white-water adventure.',
    longDescription: 'Rafting with safety gear and guide.',
    timeSlots: [
      { date: '2025-11-09', time: '10:00 - 12:00', price: 1300, available: 8 }
    ]
  },
  {
    title: 'Art Workshop',
    location: 'Kolkata',
    coverImage: '/assets/Art Workshop.webp',
    shortDescription: 'Paint with local artists.',
    longDescription: '2-hour guided art session.',
    timeSlots: [
      { date: '2025-11-11', time: '14:00 - 16:00', price: 900, available: 10 }
    ]
  },
  {
    title: 'Coffee Tasting',
    location: 'Coorg',
    coverImage: '/assets/Coffee Tasting.jpg',
    shortDescription: 'Sip and learn about coffee.',
    longDescription: '1-hour tasting session with expert.',
    timeSlots: [
      { date: '2025-11-12', time: '11:00 - 12:00', price: 400, available: 12 }
    ]
  },
  {
    title: 'Street Photography Tour',
    location: 'Mumbai',
    coverImage: '/assets/Street Photography Tour.jpg',
    shortDescription: 'Capture city life.',
    longDescription: 'Guided walk with photography tips.',
    timeSlots: [
      { date: '2025-11-13', time: '16:00 - 18:00', price: 1000, available: 8 }
    ]
  },
  {
    title: 'Cooking Class',
    location: 'Chennai',
    coverImage: '/assets/cooking class.jpg',
    shortDescription: 'Learn to cook South Indian dishes.',
    longDescription: 'Hands-on class with chef.',
    timeSlots: [
      { date: '2025-11-14', time: '11:00 - 13:00', price: 1100, available: 6 }
    ]
  },
  {
    title: 'Temple Tour',
    location: 'Varanasi',
    coverImage: '/assets/Temple Tour.jpg',
    shortDescription: 'Explore ancient temples.',
    longDescription: 'Guided spiritual walk.',
    timeSlots: [
      { date: '2025-11-15', time: '08:00 - 10:00', price: 600, available: 10 }
    ]
  },
  {
    title: 'Nature Photography Hike',
    location: 'Ooty',
    coverImage: '/assets/Nature Photography Hike.jpg',
    shortDescription: 'Capture scenic landscapes.',
    longDescription: 'Hike with photography mentor.',
    timeSlots: [
      { date: '2025-11-16', time: '07:00 - 10:00', price: 1200, available: 8 }
    ]
  },
  {
    title: 'Cycling Tour',
    location: 'Udaipur',
    coverImage: '/assets/Cycling Tour.jpg',
    shortDescription: 'Ride through lakes and hills.',
    longDescription: 'Morning cycling with guide.',
    timeSlots: [
      { date: '2025-11-17', time: '06:00 - 08:00', price: 900, available: 10 }
    ]
  }
];


  for (const exp of experiences) {
    await new Experience(exp).save();
  }

  await Promo.create({ code: 'SAVE10', type: 'percent', value: 10 });
  await Promo.create({ code: 'FLAT100', type: 'flat', value: 100 });

  console.log('[✓] Seeded successfully');
  process.exit(0);
}

run();