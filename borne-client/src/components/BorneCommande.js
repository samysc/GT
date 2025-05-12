import { useState } from "react";
import QRCode from "react-qr-code";
import { categoryFlows } from "../config/configFlows";
import StepFlow from "./StepFlow";

const menuCategories = [
  "TACOS", "SANDWICH", "ASSIETTE", "CROUSTY", "MENU ENFANT",
  "DESSERT", "BURGER", "PANINI", "HUMMER", "CAFÉ", "FRITE"
];

const dummyMenuItems = {
  TACOS: [
    { name: "Tacos 1 viande", img: "/img/tacos1.png", price: { seul: 8.5, menu: 9 } },
    { name: "Tacos 2 viandes", img: "/img/tacos2.png", price: { seul: 10.5, menu: 11 } },
    { name: "Tacos 3 viandes", img: "/img/tacos3.png", price: { seul: 12.5, menu: 13 } },
    { name: "Tacos 4 viandes", img: "/img/tacos4.png", price: { seul: 14.5, menu: 15 } },
  ],
  SANDWICH: [
    { name: "Kebab", img: "/img/kebab.png", price: { seul: 9, menu: 10 } },
    { name: "Kefta", img: "/img/kefta.png", price: { seul: 9, menu: 10 } },
    { name: "Tenders", img: "/img/tenders.png", price: { seul: 9, menu: 10 } },
    { name: "Chicken Chica", img: "/img/chicken_chica.png", price: { seul: 9, menu: 10 } },
    { name: "Poulet", img: "/img/poulet.png", price: { seul: 9, menu: 10 } },
    { name: "Falafel", img: "/img/falafel.png", price: { seul: 9, menu: 10 } },
    { name: "Western", img: "/img/western.png", price: { seul: 10, menu: 11 } },
    { name: "Américain", img: "/img/americain.png", price: { seul: 10, menu: 11 } },
    { name: "Golden", img: "/img/golden_sandwich.png", price: { seul: 11, menu: 12 } },
  ],
  ASSIETTE: [
    { name: "Assiette 1 viande", img: "/img/assiette1.png", price: { seul: 10.5, menu: 11 } },
    { name: "Assiette 2 viande", img: "/img/assiette2.png", price: { seul: 12.5, menu: 13 } },
    { name: "Assiette 3 viandes", img: "/img/assiette3.png", price: { seul: 14.5, menu: 15 } },
  ],
  CROUSTY: [
    { name: "Sauce sucré", img: "/img/crousty_sucre.png", price: { menu: 10 } },
    { name: "Sauce épicé", img: "/img/crousty_epice.png", price: { menu: 10 } },
  ],
  "MENU ENFANT": [
    { name: "6 Nuggets", img: "/img/nuggets.png", price: { menu: 7 } },
    { name: "Cheeseburger", img: "/img/cheeseburger.png", price: { menu: 7 } },
  ],
  DESSERT: [
    { name: "Tiramisu", img: "/img/tiramisu.png", price: 3 },
    { name: "Tarte au Daim", img: "/img/daim.png", price: 3 },
    { name: "Tarte au Citron", img: "/img/citron.png", price: 3 },
    { name: "Panini Nutella", img: "/img/nutella.png", price: 4.5 },
  ],
  BURGER: [
    { name: "Cheese Burger", img: "/img/cheese_burger.png", price: { seul: 8, menu: 9 } },
    { name: "Chicken Burger", img: "/img/chicken_burger.png", price: { seul: 8, menu: 9 } },
    { name: "Double Cheese Burger", img: "/img/double_cheese_burger.png", price: { seul: 9, menu: 10 } },
    { name: "Baps Burger", img: "/img/baps_burger.png", price: { seul: 9, menu: 10 } },
    { name: "Golden Burger", img: "/img/golden_burger.png", price: { seul: 13, menu: 14 } },
  ],
  PANINI: [
    { name: "Panini 3 fromages", img: "/img/panini_fromages.png", price: { seul: 7, menu: 8 } },
    { name: "Panini Steack Haché", img: "/img/panini_steack.png", price: { seul: 7, menu: 8 } },
    { name: "Panini Poulet", img: "/img/panini_poulet.png", price: { seul: 7, menu: 8 } },
    { name: "Panini Kefta", img: "/img/panini_kefta.png", price: { seul: 7, menu: 8 } },
    { name: "Panini Kebab", img: "/img/panini_kebab.png", price: { seul: 7, menu: 8 } },
    { name: "Panini Nutella", img: "/img/nutella.png", price: 4.5 },
  ],
  HUMMER: [
    { name: "H1", img: "/img/h1.png", price: { seul: 8, menu: 9 } },
    { name: "H2", img: "/img/h2.png", price: { seul: 10, menu: 11 } },
    { name: "H3", img: "/img/h3.png", price: { seul: 12, menu: 13 } },
    { name: "H4", img: "/img/h4.png", price: { seul: 14, menu: 15 } },
  ],
  CAFÉ: [
    { name: "Simple", img: "/img/cafe_simple.png", price: 1.8 },
    { name: "Double", img: "/img/cafe_double.png", price: 2.4 },
  ],
  FRITE: [
    { name: "Petite", img: "/img/frites_petite.png", price: 2 },
    { name: "Moyenne", img: "/img/frites_moyenne.png", price: 3 },
    { name: "Grande", img: "/img/frites_grande.png", price: 4 },
  ]
};


export default function BorneCommande() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderType, setOrderType] = useState(null);
  const [ticketCode, setTicketCode] = useState(null);

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (indexToRemove) => {
    setSelectedItems(selectedItems.filter((_, index) => index !== indexToRemove));
  };

  const handleCancel = () => {
    setSelectedItems([]);
    setSelectedCategory(null);
    setOrderType(null);
    setTicketCode(null);
  };

  const handleValidate = () => {
    const id = `GT-${Date.now()}`;
    setTicketCode(id);

    fetch("http://localhost:4000/print", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketCode: id,
        items: selectedItems,
        orderType,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Impression ticket OK", data))
      .catch((err) => console.error("Erreur lors de l'impression", err));
  };

  if (ticketCode) {
    return (
      <div className="w-screen h-screen bg-white flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold mb-4">Merci pour votre commande !</h1>
        <p className="mb-6 text-lg">Voici votre ticket :</p>
        <div className="bg-yellow-100 p-6 rounded-2xl shadow-xl">
          <QRCode value={ticketCode} size={180} />
          <p className="mt-4 font-mono text-xl">{ticketCode}</p>
        </div>
        <button
          onClick={handleCancel}
          className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-xl text-lg"
        >
          Nouvelle commande
        </button>
      </div>
    );
  }

  if (!orderType) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col justify-center items-center px-4">
        <img
          src="/img/logo.png"
          alt="Logo Golden Tacos"
          className="w-[300px] sm:w-[360px] md:w-[440px] h-auto mb-12"
        />
        <div className="flex flex-col space-y-8 w-full max-w-md">
          <button
            onClick={() => setOrderType("Sur place")}
            className="w-full py-5 bg-green-800 text-white text-3xl font-bold rounded-3xl shadow-xl transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 uppercase"
          >
            SUR PLACE
          </button>
          <button
            onClick={() => setOrderType("\u00c0 emporter")}
            className="w-full py-5 bg-orange-800 text-white text-3xl font-bold rounded-3xl shadow-xl transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 uppercase"
          >
            À EMPORTER
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col">
      <header className="text-center py-6">
        <h1 className="text-5xl font-extrabold text-[#FFD700] uppercase">Golden Tacos</h1>
        <h2 className="text-2xl mt-2 uppercase">{orderType}</h2>
      </header>

      <div className="flex flex-1 border-t border-white">
        <aside className="w-1/4 bg-black border-r border-white p-4 space-y-2 overflow-y-auto">
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full py-2 px-4 rounded-xl text-left text-lg font-medium text-black ${
                selectedCategory === category ? "bg-yellow-400" : "bg-white"
              }`}
            >
              {category}
            </button>
          ))}
        </aside>

        <main className="flex-1 bg-black p-4 grid grid-cols-2 gap-4 overflow-y-auto border-r border-white">
          {selectedCategory &&
            dummyMenuItems[selectedCategory]?.map((item) => (
              <button
                key={item.name}
                onClick={() => handleAddItem(item.name)}
                className="bg-white text-black rounded-2xl shadow p-4 text-xl font-semibold hover:bg-yellow-300 flex flex-col items-center"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-40 h-40 object-cover mb-2 rounded-xl"
                />
                <hr className="w-24 border-t border-black mb-2" />
                <div className="text-center font-bold mb-1">{item.name}</div>
                {typeof item.price === "object" ? (
                  <div className="flex justify-between w-full px-2 text-sm">
                    {item.price.seul !== undefined && (
                      <div className="text-center">
                        <div className="font-bold">SEUL</div>
                        <div>{item.price.seul.toFixed(2)}€</div>
                      </div>
                    )}
                    {item.price.menu !== undefined && (
                      <div className="text-center">
                        <div className="font-bold">MENU</div>
                        <div>{item.price.menu.toFixed(2)}€</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-sm font-medium">{item.price.toFixed(2)}€</div>
                )}
              </button>
            ))}
        </main>

        <aside className="w-1/4 bg-black text-white border-l border-white p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Commande</h2>
          {selectedItems.length === 0 ? (
            <p className="text-gray-400">Aucun article sélectionné</p>
          ) : (
            <ul className="space-y-2">
              {selectedItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-white text-black px-3 py-2 rounded-xl shadow flex justify-between items-center"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 text-sm font-bold ml-4"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>

      <footer className="bg-black border-t border-white p-4 flex justify-between">
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white py-2 px-6 rounded-xl text-lg"
        >
          Annuler la commande
        </button>
        <button
          onClick={handleValidate}
          className="bg-green-700 text-white py-2 px-6 rounded-xl text-lg"
        >
          Valider la commande
        </button>
      </footer>
    </div>
  );
}
