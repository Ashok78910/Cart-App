const A1 = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "Los Angeles" },
  { name: "Mike", age: 28, city: "Chicago" },
  { name: "Alice", age: 32, city: "San Francisco" },
];

const A2 = [
  { name: "John", occupation: "Engineer", salary: 70000 },
  { name: "Jane", occupation: "Designer", salary: 65000 },
];

A1.forEach((person1) => {
  A2.forEach((person2) => {
    if (person1.name === person2.name) {
      Object.assign(person1, person2);
    }
  });
});

console.log(A1);
