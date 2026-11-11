const foodDatabase = [
    { name: "Apple (1 medium)", cal: 95 },
    { name: "Banana (1 medium)", cal: 105 },
    { name: "Orange (1 medium)", cal: 62 },
    { name: "Grapes (1 cup)", cal: 104 },
    { name: "Strawberries (1 cup)", cal: 49 },
    { name: "Broccoli (1 cup)", cal: 55 },
    { name: "Carrots (1 cup)", cal: 52 },
    { name: "Spinach (1 cup)", cal: 7 },
    { name: "Potato (1 medium)", cal: 161 },
    { name: "Sweet Potato (1 medium)", cal: 103 },
    { name: "Avocado (half)", cal: 117 },
    { name: "Chicken Breast (4oz)", cal: 165 },
    { name: "Salmon (4oz)", cal: 235 },
    { name: "Ground Beef 80/20 (4oz)", cal: 287 },
    { name: "Egg (1 large)", cal: 72 },
    { name: "Tofu (1/2 cup)", cal: 94 },
    { name: "Black Beans (1/2 cup)", cal: 114 },
    { name: "Lentils (1/2 cup)", cal: 115 },
    { name: "Plain Greek Yogurt (1 cup)", cal: 100 },
    { name: "Almonds (1 oz)", cal: 164 },
    { name: "Peanuts (1 oz)", cal: 161 },
    { name: "Peanut Butter (2 tbsp)", cal: 188 },
    { name: "Brown Rice (1 cup cooked)", cal: 216 },
    { name: "White Rice (1 cup cooked)", cal: 205 },
    { name: "Quinoa (1 cup cooked)", cal: 222 },
    { name: "Oats (1/2 cup dry)", cal: 150 },
    { name: "Whole Wheat Bread (1 slice)", cal: 69 },
    { name: "White Bread (1 slice)", cal: 75 },
    { name: "Pasta (1 cup cooked)", cal: 220 },
    { name: "Bagel (1 medium)", cal: 245 },
    { name: "Flour Tortilla (8 inch)", cal: 144 },
    { name: "Vanilla Ice Cream (1/2 cup)", cal: 137 },
    { name: "Chocolate Chip Cookie (1 medium)", cal: 148 },
    { name: "Potato Chips (1 oz)", cal: 152 },
    { name: "Pretzels (1 oz)", cal: 108 },
    { name: "Cheddar Cheese (1 oz)", cal: 113 },
    { name: "Butter (1 tbsp)", cal: 102 },
    { name: "Olive Oil (1 tbsp)", cal: 119 },
    { name: "Whole Milk (1 cup)", cal: 149 },
    { name: "Almond Milk (1 cup)", cal: 39 },
    { name: "Orange Juice (1 cup)", cal: 112 },
    { name: "Cola (12 oz)", cal: 140 },
    { name: "Black Coffee (8 oz)", cal: 2 },
    { name: "Bacon (2 slices)", cal: 86 },
    { name: "Pork Sausage (1 link)", cal: 133 },
    { name: "Pancakes (2 medium)", cal: 172 },
    { name: "Waffle (1 large)", cal: 218 },
    { name: "Honey (1 tbsp)", cal: 64 },
    { name: "Maple Syrup (1 tbsp)", cal: 52 },
    { name: "Cheese Pizza (1 slice)", cal: 285 }
];

// Global variable to store the user's calculated calorie target
var currentCalorieTarget = 0;

// Attach Event Listeners (No inline HTML handlers used)
document.getElementById("calculate-btn").addEventListener("click", calculateHealthPlan);
document.getElementById("generate-btn").addEventListener("click", function() {
    generateMealPlan(currentCalorieTarget);
});

function calculateHealthPlan() {
    var weightInput = parseFloat(document.getElementById("weight").value);
    var heightInput = parseFloat(document.getElementById("height").value);
    var ageInput = parseFloat(document.getElementById("age").value);
    var genderInput = document.getElementById("gender").value;
    var errorMsg = document.getElementById("error-msg");

    // Validate inputs
    if (isNaN(weightInput) || isNaN(heightInput) || isNaN(ageInput) || weightInput <= 0 || heightInput <= 0 || ageInput <= 0) {
        errorMsg.textContent = "Please enter valid positive numbers for Weight, Height, and Age.";
        return;
    }
    errorMsg.textContent = "";

    // 1. Calculate BMI: weight / (height/100)^2
    var heightInMeters = heightInput / 100;
    var bmi = weightInput / (heightInMeters * heightInMeters);
    var roundedBMI = bmi.toFixed(2);

    // 2. Calculate Basic Calories using only if / else if
    var basicCalories = 0;
    if (genderInput === "Men") {
        basicCalories = (weightInput * 10) + (heightInput * 6.25) - (ageInput * 5) + 5;
    } else if (genderInput === "Women") {
        basicCalories = (weightInput * 10) + (heightInput * 6.25) - (ageInput * 5) - 161;
    }

    // 3. Determine Calorie Target and BMI Category using only if / else if
    var calorieTarget = 0;
    var category = "";

    if (bmi >= 30.0) {
        calorieTarget = basicCalories - 750;
        category = "Obese";
    } else if (bmi >= 25.0) {
        calorieTarget = basicCalories - 500;
        category = "Overweight";
    } else if (bmi < 25.0) {
        calorieTarget = basicCalories;
        category = "Normal / Underweight";
    }

    // Round target calories to nearest whole number
    currentCalorieTarget = Math.round(calorieTarget);

    // Display BMI and Calorie Target
    document.getElementById("bmi-output").textContent = roundedBMI;
    document.getElementById("category-output").textContent = category;
    document.getElementById("calorie-output").textContent = currentCalorieTarget;

    // Show the "Generate Meal Plan" button for re-rolling meals
    document.getElementById("generate-btn").style.display = "inline-block";

    // 4. Trigger BMI Animation
    animatePerson(bmi);

    // 5. Generate Initial Meal Plan
    generateMealPlan(currentCalorieTarget);
}

function animatePerson(bmi) {
    var personGraphic = document.getElementById("person-visual");
    
    // Scale width proportionally to BMI (clamped between 35px and 160px)
    var newWidth = bmi * 2.5;
    if (newWidth < 35) {
        newWidth = 35;
    } else if (newWidth > 160) {
        newWidth = 160;
    }

    // Adjust height slightly for visual contrast
    var newHeight = 180;
    if (bmi >= 30.0) {
        newHeight = 165;
    } else if (bmi < 18.5) {
        newHeight = 195;
    }

    personGraphic.style.width = newWidth + "px";
    personGraphic.style.height = newHeight + "px";
}

function generateMealPlan(targetCalories) {
    var selectedFoods = [];
    var currentTotalCalories = 0;
    var attempts = 0;
    var maxAttempts = 200;

    // Keep picking random foods until we get as close to targetCalories as possible without going over
    while (attempts < maxAttempts) {
        var randomIndex = Math.floor(Math.random() * foodDatabase.length);
        var randomFood = foodDatabase[randomIndex];
        var remainingCalories = targetCalories - currentTotalCalories;

        // Only use if / else if to decide whether to add the food or skip
        if (randomFood.cal <= remainingCalories) {
            selectedFoods.push(randomFood);
            currentTotalCalories = currentTotalCalories + randomFood.cal;
            attempts = 0;
        } else if (randomFood.cal > remainingCalories) {
            attempts = attempts + 1;
        }
    }

    // Final scan: loop through the database once to fill any tiny remaining gap
    for (var i = 0; i < foodDatabase.length; i++) {
        var item = foodDatabase[i];
        if (currentTotalCalories + item.cal <= targetCalories) {
            selectedFoods.push(item);
            currentTotalCalories = currentTotalCalories + item.cal;
        }
    }

    // Display the selected foods on the screen using a standard for loop
    var mealListElement = document.getElementById("meal-list");
    mealListElement.innerHTML = "";

    for (var j = 0; j < selectedFoods.length; j++) {
        var li = document.createElement("li");
        li.textContent = selectedFoods[j].name + " (" + selectedFoods[j].cal + " kcal)";
        mealListElement.appendChild(li);
    }

    document.getElementById("total-meal-calories").textContent = currentTotalCalories;
}
