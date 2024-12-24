// Updated car data with more options
let cars = [
    { id: "1", model: "Toyota Corolla", rented: false },
    { id: "2", model: "Honda Civic", rented: false },
    { id: "3", model: "Tesla Model 3", rented: false },
    { id: "4", model: "Ford Mustang", rented: false },
    { id: "5", model: "Chevrolet Camaro", rented: false },
    { id: "6", model: "BMW 3 Series", rented: false },
    { id: "7", model: "Audi A4", rented: false },
    { id: "8", model: "Mercedes-Benz C-Class", rented: false },
    { id: "9", model: "Hyundai Sonata", rented: false },
    { id: "10", model: "Volkswagen Passat", rented: false },
];

// Load cars from localStorage if available
if (localStorage.getItem("cars")) {
    cars = JSON.parse(localStorage.getItem("cars"));
} else {
    localStorage.setItem("cars", JSON.stringify(cars));
}

// Function to display available cars
function displayCars() {
    const carList = document.getElementById("car-list");
    carList.innerHTML = ""; // Clear the list first
    cars.forEach((car) => {
        const carCard = document.createElement("div");
        carCard.className = "car-card";
        carCard.innerHTML = `
            <h3>${car.model}</h3>
            <p><strong>ID:</strong> ${car.id}</p>
            <p><strong>Status:</strong> ${car.rented ? "Rented" : "Available"}</p>
        `;
        carList.appendChild(carCard);
    });
}

// Function to rent a car
function rentCar(event) {
    event.preventDefault();
    const carId = document.getElementById("carId").value;
    const car = cars.find((c) => c.id === carId);

    if (car && !car.rented) {
        car.rented = true;
        localStorage.setItem("cars", JSON.stringify(cars));
        document.getElementById("rentMessage").textContent = "Car rented successfully!";
        displayCars();
    } else {
        document.getElementById("rentMessage").textContent = "Invalid Car ID or already rented.";
    }

    document.getElementById("rentForm").reset();
}

// Function to return a car
function returnCar(event) {
    event.preventDefault();
    const carId = document.getElementById("returnCarId").value;
    const car = cars.find((c) => c.id === carId);

    if (car && car.rented) {
        car.rented = false;
        localStorage.setItem("cars", JSON.stringify(cars));
        document.getElementById("returnMessage").textContent = "Car returned successfully!";
        displayCars();
    } else {
        document.getElementById("returnMessage").textContent = "Invalid Car ID or already available.";
    }

    document.getElementById("returnForm").reset();
}

// Event listeners
document.getElementById("rentForm").addEventListener("submit", rentCar);
document.getElementById("returnForm").addEventListener("submit", returnCar);

// Initial display of cars
displayCars();
