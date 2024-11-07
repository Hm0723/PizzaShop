import React, { useState } from "react"; // Added useState import
import ReactDOM from "react-dom/client";

const buttonStyle = {
    margin: "0 10px",
    padding: "8px 16px",
    backgroundColor: "#f4a261",
    border: "none",
    color: "white",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
};

const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
];

function isShopOpen() {
    const currentHour = new Date().getHours();
    return currentHour >= 10 && currentHour < 22;
}

function App() {
    return (
        <div style={{
            backgroundColor: "lightyellow"
        }}>
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <h1 style={{
            color: "orange",
            fontSize: "48px",
            textTransform: "uppercase",
            textAlign: "center",
            fontFamily: "Courier New"
        }}>
            Haw Ming's Pizza Co.
        </h1>
    );
}

function Menu() {
    const [priceFilter, setPriceFilter] = useState("all");

    const filteredPizzas = pizzaData.filter((pizza) => {
        if (priceFilter === "below10") return pizza.price < 10;
        if (priceFilter === "10to15") return pizza.price >= 10 && pizza.price <= 15;
        if (priceFilter === "above15") return pizza.price > 15;
        return true; 
    });

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{
                textAlign: "center",
                fontSize: "36px",
                textTransform: "uppercase",
                fontFamily: "Courier New, monospace",
                paddingBottom: "10px"
            }}>--OUR MENU--</h2>

            {isShopOpen() ? 
            <div>
                <p style={{
                    textAlign: "center",
                    fontFamily: "Courier New, monospace",
                    fontSize: "18px"
                }}>Authentic Italian Cuisine, all from our stone oven</p> 
            </div> : null}

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <button onClick={() => setPriceFilter("all")} style={buttonStyle}>All</button>
                <button onClick={() => setPriceFilter("below10")} style={buttonStyle}>Below $10</button>
                <button onClick={() => setPriceFilter("10to15")} style={buttonStyle}>$10 - $15</button>
                <button onClick={() => setPriceFilter("above15")} style={buttonStyle}>Above $15</button>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 2fr))",
                gap: "20px",
                padding: "20px",
                maxWidth: "800px",
                margin: "0 auto"
            }}>
                {filteredPizzas.map((pizza) => (
                    <Pizza key={pizza.name} pizza={pizza} />
                ))}
            </div>
        </div>
    );
}

// Pizza component remains the same
function Pizza({ pizza }) {
    return (
        <div>
            <h2 style={{
                fontFamily: "Serif, Georgia",
            }}>{pizza.name}</h2>
            <p style={{
                fontStyle: "oblique"
            }}>{pizza.ingredients}</p>
            <p style={{
                fontStyle: "oblique"
            }}>Price: ${pizza.price}</p>
            <img src={pizza.photoName} alt={pizza.name} style={{
                width: "100%",
                height: "auto"
            }}/>
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer">
            {isShopOpen() ? 
            <div>
                <p style={{ 
                    textAlign: "center", 
                    margin: "0",
                    paddingTop: "0",
                    fontFamily: "Courier New, monospace",
                    paddingBottom: "20px"
                }}>We're Currently Open</p>
                <button style={{ 
                    backgroundColor: "green", 
                    color: "white",
                    border: "none",
                    padding: "15px 30px",
                    margin: "0 auto",
                    display: "block",
                    cursor: "pointer"
                }}>Order</button>
            </div> : "Sorry we're closed"}
        </footer>
    );
}

// Render App component to the root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
