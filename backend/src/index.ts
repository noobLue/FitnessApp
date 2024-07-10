import express from "express";
const app = express();

app.use(express.json());

interface FoodDescription {
    id: number,
    name: string, 
    calories: number,
    fat: number,
    carbohydrates: number,
    protein: number,
};

interface Ingredient {
    foodDescriptionId: number,
    grams: number
}

interface CompoundFoodDescription {
    id: number,
    name: string,
    ingredients: Ingredient[]
};

interface FoodEntry {
    type: 'ingredient' | 'compound',
    id: number, // food description id or compound food id 
    grams: number
}


const foodDescriptions: FoodDescription[] = [
    {
        id: 1,
        name: "Taysmaito", 
        calories: 64, 
        fat: 2.4, 
        carbohydrates: 4.8, 
        protein: 3.4
    }
];

app.get("/api/foods", (req, res) => {
    console.log(req.body);

    res.json(foodDescriptions);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});