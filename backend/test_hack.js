const axios = require('axios');

// Dummy hack ideas representing ex-bachelor wisdom
const hacks = [
  {
    title: 'Sunday Bulk Cooking',
    content: 'Cook rice, lentils, boiled eggs, and roast veggies on Sunday. Portion and refrigerate. 15 min meals all week.',
    category: 'cooking',
    authorName: 'Alumni Arif'
  },
  {
    title: 'Envelope Budget Trick',
    content: 'Withdraw weekly cash for food & transport. When the envelope is empty—stop spending. Trains discipline fast.',
    category: 'money',
    authorName: 'Frugal Faisal'
  },
  {
    title: '2-in-1 Cleaning Routine',
    content: 'Start laundry and immediately clean kitchen counters + sink. By the time clothes are done, chores are over.',
    category: 'general',
    authorName: 'Efficient Esha'
  },
  {
    title: 'First Date Cook Hack',
    content: 'Shallow fry parboiled potatoes + eggs + onions + chili = Spanish-style tortilla. Looks fancy, costs almost nothing.',
    category: 'dating',
    authorName: 'Smooth Shoumik'
  },
  {
    title: 'Move-Out Color Code',
    content: 'Label boxes by room using colored tape. Unpacking feels guided instead of chaotic.',
    category: 'moving',
    authorName: 'Planner Priya'
  },
  {
    title: 'Frozen Veg Savior',
    content: 'Always keep frozen mixed vegetables. Add to noodles, eggs, fried rice to fake nutrition.',
    category: 'cooking',
    authorName: 'Nutrition Nabil'
  }
];

async function seedHacks() {
  for (const hack of hacks) {
    try {
      const res = await axios.post('http://localhost:5000/api/hacks', hack);
      console.log('Added hack:', res.data.title);
    } catch (err) {
      console.error('Error adding hack:', hack.title, {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        code: err.code
      });
    }
  }
}

seedHacks();
