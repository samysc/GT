// src/AppCaisse.js
import { useState } from "react";
import QrReader from "react-qr-scanner";

export default function AppCaisse() {
  const [ticketCode, setTicketCode] = useState("");
  const [order, setOrder]           = useState(null);
  const [status, setStatus]         = useState("idle"); // idle | loading | error | ready
  const [bipNumber, setBipNumber]   = useState(null);

  // 1) scan ou saisie du ticket
  const fetchOrder = async (code) => {
    setStatus("loading");
    try {
      const res = await fetch(`http://localhost:4000/order/${code}`);
      if (!res.ok) throw new Error("Commande introuvable");
      const data = await res.json();
      setOrder(data);
      setStatus("ready");
    } catch {
      setOrder(null);
      setStatus("error");
    }
  };

  // 2) confirmer le paiement
  const confirmPayment = async () => {
    const bip = Math.floor(100 + Math.random() * 900);
    setBipNumber(bip);
    await fetch("http://localhost:4000/confirm-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketCode, bipNumber: bip }),
    });
  };

  // 3) envoyer en cuisine
  const sendToKitchen = async () => {
    await fetch("http://localhost:4000/print-kitchen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketCode, items: order.items, bipNumber }),
    });
    alert("Commande envoyée en cuisine !");
    reset();
  };

  // 4) supprimer la commande
  const deleteOrder = async () => {
    if (!window.confirm("Supprimer cette commande ?")) return;
    await fetch(`http://localhost:4000/order/${ticketCode}`, { method: "DELETE" });
    reset();
  };

  const reset = () => {
    setTicketCode("");
    setOrder(null);
    setStatus("idle");
    setBipNumber(null);
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col">
      <header className="py-4 border-b border-white text-center">
        <img src="/img/logo.png" alt="Logo" className="mx-auto h-12 mb-2" />
        <h1 className="text-2xl font-bold">Caisse – Gestion des commandes</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {status === "idle" && !order && (
          <div className="space-y-4 text-center">
            <p className="text-lg">Scannez un QR code ou saisissez le ticket :</p>
            <div className="mx-auto w-64 h-64 bg-white rounded-lg overflow-hidden">
              <QrReader
                onResult={(result, error) => {
                  if (result) {
                    const code = result?.text;
                    setTicketCode(code);
                    fetchOrder(code);
                  }
                }}
                constraints={{ facingMode: "environment" }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="GT-1654032123456"
                value={ticketCode}
                onChange={e => setTicketCode(e.target.value)}
                className="px-4 py-2 rounded-lg text-black"
              />
              <button
                onClick={() => fetchOrder(ticketCode)}
                className="ml-2 px-4 py-2 bg-green-600 rounded-lg"
              >
                Chercher
              </button>
            </div>
          </div>
        )}

        {status === "loading" && <p className="text-xl">Chargement…</p>}

        {status === "error" && (
          <div className="text-red-400">
            <p>Commande introuvable.</p>
            <button
              onClick={reset}
              className="mt-4 px-4 py-2 bg-gray-700 rounded-lg"
            >
              Réessayer
            </button>
          </div>
        )}

        {status === "ready" && order && (
          <div className="w-full max-w-xl bg-white text-black rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold">Ticket : {order.ticketCode}</h2>
            <p>Type : {order.orderType}</p>
            <h3 className="font-semibold">Articles :</h3>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {order.items.map((it, i) => (
                <li key={i} className="border p-2 rounded-lg">
                  <div className="font-bold">{it.name}</div>
                  {Object.entries(it.customization).map(([step, values]) => (
                    <p key={step} className="text-sm">
                      <span className="underline">{step}</span> : {values.join(", ")}
                    </p>
                  ))}
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-4 space-x-2">
              {!bipNumber ? (
                <button
                  onClick={confirmPayment}
                  className="flex-1 py-2 bg-green-700 text-white rounded-lg"
                >
                  Confirmer le paiement
                </button>
              ) : (
                <div className="flex-1 p-2 bg-yellow-300 rounded-lg text-center">
                  Bip n° <span className="font-bold">{bipNumber}</span>
                </div>
              )}

              <button
                onClick={sendToKitchen}
                disabled={!bipNumber}
                className="flex-1 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-50"
              >
                Envoyer en cuisine
              </button>

              <button
                onClick={deleteOrder}
                className="flex-1 py-2 bg-red-700 text-white rounded-lg"
              >
                Supprimer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
