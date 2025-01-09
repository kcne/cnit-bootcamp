// exercises.ts

// 1. Basic Types
// Define variables for a user's name (string), age (number), and isAdmin (boolean).
// Write a function that takes a number and returns its square.

const userName:string = "kocanemin";
const age:number = 17;
const isAdmin:boolean=true;

console.log(`Username ${userName}, type: ${typeof userName}`)
console.log(`Age ${age}, type: ${typeof age}`)
console.log(`isAdmin ${isAdmin}, type: ${typeof isAdmin}`)

// 2. Arrays and Tuples
// Create an array of favorite colors (string[]).
// Define a tuple to store the x and y coordinates of a point.
// Write a function to calculate the distance of a point from the origin.
    const favouriteColors:string[] = ["red", "blue", "green"];
    const tuple: [number,number] = [1,2];
    function calculateDistance(origin:[number,number]):number{

        // d=√((x_2-x_1)²+(y_2-y_1)²)
        const distance:number = Math.sqrt((tuple[0]-origin[0])^2 + (tuple[1]-origin[1])^2)

        return distance;
    }

    console.log(calculateDistance([1,1]), typeof calculateDistance([0,0]));
// 3. Enums
// Create an enum for the days of the week.
// Write a function that takes a day and returns whether it is a weekday or a weekend.

    enum DaysOfTheWeek{
        Monday=1,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }

    function getDayType(day:DaysOfTheWeek):string{

        console.log("day", day);
        if(day==6 || day==7){
            return "weekend";
        }

        return "weekday";
    }

    console.log("Day type", getDayType(DaysOfTheWeek.Friday));

// 4. Functions
// Write a function `greet` that takes a name (required) and a greeting (optional, default to "Hello").
    function greet(name:string, greeting:string):string{
    return `${greeting} ${name}`
    }

    console.log(greet("Davud", "Merhaba"));

// 5. Interfaces
// Create an interface `User` with fields: name, email, and age.
// Write a function that takes a User object and returns a formatted string like "Name (Age) - Email".

interface User{
    name:string,
    email:string,
    age:number;
}

function getUser(user:User){
    return `Name: ${user.name}, email: ${user.email}, age: ${user.age}`
}


const myUser:User = {name:"Emin", email:"eminkocan@gmail.com", age: 27};

console.log(getUser(myUser));

// 6. Type Aliases
// Define a type alias `Product` with fields: name, price, and an optional category.
// Write a function to filter an array of Product by a given category.

type category = "fast food" | "drinks" | "alcohol";

type Product = {
    name:string,
    price: number,
    category?: category
}

const myProducts: Product[] = [
    {
        name: "pizza",
        price: 5,
        category:"fast food"
    },
    {
        name: "water",
        price: 1,
        category:"drinks"
    },
    {
        name: "beer",
        price: 2,
        category:"alcohol"
    }
]

function filterCategory(productArray:Product[], category:category):Product[]{

    const filteredProducts:Product[] = productArray.filter((product =>  product.category==category ));

    return filteredProducts;
}

const fastFoodProducts = filterCategory(myProducts,"fast food");
console.log(fastFoodProducts);

// 7. Union and Intersection Types
// Write a function that takes a parameter of type `string | number` and performs different operations based on its type.
// Create two interfaces `Admin` and `Customer`, then define a type `UserRole` as their intersection.

function handleParameter(param: string | number){
    if(typeof param == "string"){
    return "Your parameter is string parameter."
    }
    else {
     return "Your parameter is number parameter."
    }
}

console.log(handleParameter("sadsad"));
console.log(handleParameter(111));


// 8. Generics (Bonus)
// Write a generic function `identity` that takes a value and returns it.
// Create a generic Stack class with methods push, pop, and peek.
