const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
require('dotenv').config();

const data = [
  {
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    address: "12 MG Road, Kochi",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    menu: [
      { itemName: "Paneer Tikka", price: 220, category: "Starters", description: "Grilled cottage cheese", imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300" },
      { itemName: "Butter Chicken", price: 320, category: "Mains", description: "Creamy tomato curry", imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300" },
      { itemName: "Gulab Jamun", price: 120, category: "Desserts", description: "Milk solid dumplings in syrup", imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300" }
    ]
  },
  {
    name: "The Burger Lab",
    cuisine: "American",
    rating: 4.2,
    address: "45 Fort Kochi, Kochi",
    imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400",
    menu: [
      { itemName: "Crispy Wings", price: 280, category: "Starters", description: "Buffalo style chicken wings", imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300" },
      { itemName: "Classic Smash Burger", price: 380, category: "Mains", description: "Double patty with special sauce", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300" },
      { itemName: "Oreo Shake", price: 160, category: "Desserts", description: "Thick blended shake", imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300" }
    ]
  },
  {
    name: "Pasta Bella",
    cuisine: "Italian",
    rating: 4.7,
    address: "8 Marine Drive, Kochi",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    menu: [
      { itemName: "Bruschetta", price: 180, category: "Starters", description: "Toasted bread with tomatoes", imageUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300" },
      { itemName: "Spaghetti Carbonara", price: 360, category: "Mains", description: "Creamy egg and bacon pasta", imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300" },
      { itemName: "Tiramisu", price: 200, category: "Desserts", description: "Classic Italian dessert", imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300" }
    ]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Restaurant.deleteMany();
    await Restaurant.insertMany(data);
    console.log('Database seeded!');
    process.exit();
  });