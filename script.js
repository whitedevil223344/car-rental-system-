const cars = [
    { id: 1, name: "Honda Civic", price: 1500, seats: 5, fuel: "Petrol", status: "Available", renter: "" },
    { id: 2, name: "Toyota Corolla", price: 1800, seats: 5, fuel: "Petrol", status: "Available", renter: "" },
    { id: 3, name: "Maruti Suzuki Swift", price: 1200, seats: 5, fuel: "Diesel", status: "Available", renter: "" },
    { id: 4, name: "Hyundai Creta", price: 2200, seats: 5, fuel: "Diesel", status: "Available", renter: "" },
    { id: 5, name: "Mahindra Scorpio", price: 2500, seats: 7, fuel: "Diesel", status: "Available", renter: "" },
    { id: 6, name: "Tata Nexon", price: 1800, seats: 5, fuel: "Electric", status: "Available", renter: "" },
    { id: 7, name: "Ford EcoSport", price: 1700, seats: 5, fuel: "Petrol", status: "Available", renter: "" }
];

// Function to load cars into the grid
function loadCars() {
    const carGrid = document.getElementById("car-grid");
    carGrid.innerHTML = ""; // Clear the grid
    cars.forEach(car => {
        const carTile = document.createElement("div");
        carTile.className = "car-card";
        carTile.innerHTML = `
            <h3>${car.name}</h3>
            <p>ID: ${car.id}</p>
            <p>Price: ₹${car.price}/day</p>
            <p>Seats: ${car.seats}</p>
            <p>Fuel: ${car.fuel}</p>
            <p>Status: <span style="color: ${car.status === "Available" ? "green" : "red"}">${car.status}</span></p>
            ${car.renter ? `<p>Rented by: ${car.renter}</p>` : ""}
        `;
        carGrid.appendChild(carTile);
    });
}

// Rent a car
document.getElementById("rental-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const carId = parseInt(document.getElementById("car-id").value);
    const customerName = document.getElementById("customer-name").value;

    const car = cars.find(c => c.id === carId && c.status === "Available");
    if (car) {
        car.status = "Rented";
        car.renter = customerName;
        document.getElementById("confirmation-message").textContent = `Car ${car.name} has been rented by ${customerName}.`;
        document.getElementById("confirmation-message").style.color = "green";
        loadCars();
    } else {
        document.getElementById("confirmation-message").textContent = "Car not available or invalid ID.";
        document.getElementById("confirmation-message").style.color = "red";
    }
});

// Return a car
document.getElementById("return-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const carId = parseInt(document.getElementById("return-car-id").value);

    const car = cars.find(c => c.id === carId && c.status === "Rented");
    if (car) {
        car.status = "Available";
        car.renter = "";
        document.getElementById("return-message").textContent = `Car ${car.name} has been returned.`;
        document.getElementById("return-message").style.color = "green";
        loadCars();
    } else {
        document.getElementById("return-message").textContent = "Car not found or already available.";
        document.getElementById("return-message").style.color = "red";
    }
});

// Initial load
loadCars();
