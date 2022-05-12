function Dog(name,age){
    this.name = name;
    this.age = age;
}

class Cat{
    constructor(name, age){
        this.name = name;
        this.age = age
    }
}

function runTests(){
    console.log("Tests");

    // creating objects



    // object literal
    let dog1 = {name:"lalo", age: 7, color: "pink"};

    // object constructor
    let dog2 = new Dog("Einstein", 2);

    // class
    let cat1 = new Cat("kitty", 1);

}

runTests();