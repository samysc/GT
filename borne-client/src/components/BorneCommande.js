import React, { useState } from "react";
import QRCode from "react-qr-code";   // ← default export
import StepFlow from "./StepFlow.js";
import { categoryFlows } from "../config/configFlows.js";

const menuCategories = [
  "TACOS","SANDWICH","ASSIETTE","CROUSTY","MENU ENFANT",
  "DESSERT","BURGER","PANINI","HUMMER","CAFÉ","FRITE"
];

const dummyMenuItems = {
  TACOS: [
    { name: "Tacos 1 viande", img: "/img/tacos_1_viande.png", price: { seul: 8.5, menu: 9 } },
    { name: "Tacos 2 viandes", img: "/img/tacos_2_viandes.png", price: { seul: 10.5, menu: 11 } },
    { name: "Tacos 3 viandes", img: "/img/tacos_3_viandes.png", price: { seul: 12.5, menu: 13 } },
    { name: "Tacos 4 viandes", img: "/img/tacos_4_viandes.png", price: { seul: 14.5, menu: 15 } },
  ],
  SANDWICH: [
    { name: "Kebab", img: "/img/kebab_pain.png", price: { seul: 9, menu: 10 } },
    { name: "Kefta", img: "/img/kefta_pain.png", price: { seul: 9, menu: 10 } },
    { name: "Tenders", img: "/img/tenders_galette.png", price: { seul: 9, menu: 10 } },
    { name: "Chicken Chica", img: "/img/chicken_chica_pain.png", price: { seul: 9, menu: 10 } },
    { name: "Poulet", img: "/img/poulet_pain.png", price: { seul: 9, menu: 10 } },
    { name: "Falafel", img: "/img/falafel_galette.png", price: { seul: 9, menu: 10 } },
    { name: "Western", img: "/img/western_pain.png", price: { seul: 10, menu: 11 } },
    { name: "Américain", img: "/img/americain_pain.png", price: { seul: 10, menu: 11 } },
    { name: "Golden", img: "/img/golden_pain.png", price: { seul: 11, menu: 12 } },
  ],
  ASSIETTE: [
    { name: "Assiette 1 viande", img: "/img/assiette_1_viande.png", price: { seul: 10.5, menu: 11 } },
    { name: "Assiette 2 viande", img: "/img/assiette_2_viandes.png", price: { seul: 12.5, menu: 13 } },
    { name: "Assiette 3 viandes", img: "/img/assiette_3_viandes.png", price: { seul: 14.5, menu: 15 } },
  ],
  CROUSTY: [
    { name: "Sauce sucré", img: "/img/crousty_sucre.png", price: { seul: 0, menu: 10 } },
    { name: "Sauce épicé", img: "/img/crousty_epice.png", price: { seul: 0, menu: 10 } },
  ],
  "MENU ENFANT": [
    { name: "6 Nuggets", img: "/img/menu_enfant_nugget.png", price: { seul: 0, menu: 7 } },
    { name: "Cheeseburger", img: "/img/menu_enfant_cheeseburger.png", price: { seul: 0, menu: 7 } },
  ],
  DESSERT: [
    { name: "Tiramisu", img: "/img/tiramisu.png", price: 3 },
    { name: "Tarte au Daim", img: "/img/tarte_daim.png", price: 3 },
    { name: "Tarte au Citron", img: "/img/tarte_citron.png", price: 3 },
    { name: "Panini Nutella", img: "/img/panini_nutella.png", price: 4.5 },
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
    { name: "Panini Steack Haché", img: "/img/panini_steak_hache.png", price: { seul: 7, menu: 8 } },
    { name: "Panini Poulet", img: "/img/panini_poulet.png", price: { seul: 7, menu: 8 } },
    { name: "Panini Kefta", img: "/img/panini_kefta.png", price: { seul: 7, menu: 8 } },
    { name: "Panini Kebab", img: "/img/panini_kebab.png", price: { seul: 7, menu: 8 } },
    { name: "Panini Nutella", img: "/img/panini_nutella.png", price: 4.5 },
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
    { name: "Petite", img: "/img/petite_frite.png", price: 2 },
    { name: "Moyenne", img: "/img/moyenne_frite.png", price: 3 },
    { name: "Grande", img: "/img/grande_frite.png", price: 4 },
  ]
};

export default function BorneCommande() {
  const [orderType, setOrderType]         = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customizingItem, setCustomizingItem]   = useState(null);
  const [selectedItems, setSelectedItems]       = useState([]);
  const [ticketCode, setTicketCode]             = useState(null);

  // déclenché quand on clique sur un produit → lance le flow de custom
  const handleCustomize = (item) => setCustomizingItem(item);

  // terminé : j’ajoute item + answers dans le panier
  const handleCompleteCustomize = (answers) => {
    setSelectedItems([
      ...selectedItems,
      { ...customizingItem, customization: answers }
    ]);
    setCustomizingItem(null);
  };

  // back dans le flow ou retour à la liste
  const handleBackToList = () => setCustomizingItem(null);

  const handleRemoveItem = (i) =>
    setSelectedItems(selectedItems.filter((_, idx) => idx !== i));

  const handleCancelAll = () => {
    setOrderType(null);
    setSelectedCategory(null);
    setCustomizingItem(null);
    setSelectedItems([]);
    setTicketCode(null);
  };

  const handleValidate = () => {
    const id = `GT-${Date.now()}`;
    setTicketCode(id);
    fetch("http://localhost:4000/print", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketCode: id, items: selectedItems, orderType })
    }).catch(console.error);
  };

  // 1) écran final QRCode
  if (ticketCode) {
    return (
      <div className="w-screen h-screen bg-white flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold mb-4">Merci pour votre commande !</h1>
        {/* QRCode de qrcode.react */}
        {ticketCode && (
          <QRCode value={ticketCode} size={180} />
        )}        <p className="mt-4 font-mono text-xl">{ticketCode}</p>
        <button
          onClick={handleCancelAll}
          className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-xl text-lg"
        >
          Nouvelle commande
        </button>
      </div>
    );
  }

  // 2) choix SUR PLACE / À EMPORTER
  if (!orderType) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-4">
        <img src="/img/logo.png" alt="Logo" className="mb-12 w-64" />
        <button
          onClick={() => setOrderType("Sur place")}
          className="mb-6 w-full max-w-md py-5 bg-green-800 text-white text-3xl font-bold rounded-3xl"
        >SUR PLACE</button>
        <button
          onClick={() => setOrderType("À emporter")}
          className="w-full max-w-md py-5 bg-orange-800 text-white text-3xl font-bold rounded-3xl"
        >À EMPORTER</button>
      </div>
    );
  }

// 3) flow de personnalisation en cours
if (customizingItem) {
  // on récupère le flow par défaut depuis la config
  const rawFlow = categoryFlows[selectedCategory];

  // si pas de flow (p.ex. MENU ENFANT, DESSERT, CAFÉ, FRITE), on ajoute l'item tel quel
  if (!rawFlow) {
    handleCompleteCustomize({});
    return null;
  }

  // on adapte dynamiquement le flow :
  // - viandes   → maxSelection = nombre de viandes (= chiffre dans le nom)
  // - sauces    → optional = true
  // - crudités  → optional = true
  const flow = rawFlow.map((step) => {
    // 1) viandes dynamiques
    if (
      step.stepId === "viandes" &&
      (selectedCategory === "TACOS" || selectedCategory === "ASSIETTE")
    ) {
      const count = parseInt(customizingItem.name.match(/\d+/)?.[0] || "0", 10);
      return { ...step, maxSelection: count };
    }
    // 2) rendre sauces et crudités facultatives
    if (step.stepId === "sauces" || step.stepId === "crudites") {
      return { ...step, optional: true };
    }
    return step;
  });

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col p-6">
      {/* bouton de retour à la liste des produits */}
      <button
        onClick={handleBackToList}
        className="mb-4 text-white underline text-lg"
      >
        ← Retour aux {selectedCategory.toLowerCase()}
      </button>
      {/* StepFlow qui occupe tout l’espace restant */}
      <div className="flex-1">
        <StepFlow
          flow={flow}
          onBack={handleBackToList}
          onComplete={handleCompleteCustomize}
        />
      </div>
    </div>
  );
}

  // 4) écran principal : catégories / produits / panier
  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col">
      <header className="text-center py-6 border-b border-white">
        <h1 className="text-5xl font-extrabold text-[#FFD700] uppercase">Golden Tacos</h1>
        <h2 className="text-2xl mt-2 uppercase">{orderType}</h2>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* catégories */}
        <aside className="w-1/4 bg-black border-r border-white p-4 overflow-y-auto space-y-2">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full py-2 px-4 rounded-xl text-left text-lg font-medium ${
                selectedCategory===cat?"bg-yellow-400 text-black":"bg-white text-black"
              }`}
            >{cat}</button>
          ))}
        </aside>
        {/* grille produits */}
        <main className="flex-1 bg-black p-4 grid grid-cols-2 gap-4 overflow-y-auto">
          {selectedCategory && dummyMenuItems[selectedCategory]?.map((item) => (
            <button
              key={item.name}
              onClick={() => handleCustomize(item)}
              className="bg-white text-black rounded-2xl shadow p-4 flex flex-col items-center hover:bg-yellow-300"
            >
              <img src={item.img} alt={item.name}
                   className="w-40 h-40 object-cover mb-2 rounded-xl" />
              <div className="text-center font-bold">{item.name}</div>
              {typeof item.price === "object" ? (
                <div className="flex justify-between w-full px-2 text-sm">
                  {item.price.seul!=null && (
                    <div><div className="font-bold">SEUL</div><div>{item.price.seul.toFixed(2)}€</div></div>
                  )}
                  {item.price.menu!=null && (
                    <div><div className="font-bold">MENU</div><div>{item.price.menu.toFixed(2)}€</div></div>
                  )}
                </div>
              ) : (
                <div className="text-sm">{item.price.toFixed(2)}€</div>
              )}
            </button>
          ))}
        </main>
        {/* panier */}
        {/* panier */}
<aside className="w-1/4 bg-black text-white border-l border-white p-4 overflow-y-auto flex flex-col">
  <h2 className="text-xl font-bold mb-4">Commande</h2>

  {selectedItems.length === 0 ? (
    <p className="text-gray-400 flex-1">Aucun article sélectionné</p>
  ) : (
    <div className="flex-1 flex flex-col">
      <ul className="space-y-2">
        {selectedItems.map((it, i) => (
          <li
            key={i}
            className="bg-white text-black px-3 py-2 rounded-xl shadow flex justify-between items-center"
          >
            <span>{it.name}</span>
            <button
              onClick={() => handleRemoveItem(i)}
              className="text-red-500 text-sm font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* total à la fin */}
      <div className="mt-auto pt-4 border-t border-gray-700 text-right text-lg font-bold">
        Total :{" "}
        {selectedItems
          .reduce((sum, item) => {
            // détermination du tarif principal (seul / menu)
            const formule = item.customization.formule?.[0] || "seul";
            const basePrice =
              typeof item.price === "object"
                ? item.price[formule]
                : item.price;
            // +1€ par supplément sélectionné
            const suppCount = item.customization.supplements?.length || 0;
            return sum + basePrice + suppCount * 1;
          }, 0)
          .toFixed(2)}€
      </div>
    </div>
  )}
</aside>

      </div>
      {/* footer */}
      <footer className="bg-black border-t border-white p-4 flex justify-between">
        <button
          onClick={handleCancelAll}
          className="bg-red-600 text-white py-2 px-6 rounded-xl text-lg"
        >Annuler la commande</button>
        <button
          onClick={handleValidate}
          className="bg-green-700 text-white py-2 px-6 rounded-xl text-lg"
        >Valider la commande</button>
      </footer>
    </div>
  );
}
