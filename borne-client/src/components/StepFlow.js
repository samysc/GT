import React, { useState } from "react";

export default function StepFlow({ flow, onBack, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers]   = useState({});
  const step = flow[stepIndex];
  const selected = answers[step.stepId] || [];

  const toggleOption = (value) => {
    const curr = answers[step.stepId] || [];

    // cas spécial viandes : autoriser répétitions jusqu'à maxSelection
    if (step.stepId === "viandes" && step.maxSelection) {
      const countValue = curr.filter((v) => v === value).length;
      let next;
      if (countValue > 0) {
        next = [...curr];
        next.splice(curr.indexOf(value), 1);
      } else if (curr.length < step.maxSelection) {
        next = [...curr, value];
      } else {
        return;
      }
      setAnswers({ ...answers, [step.stepId]: next });
      return;
    }

    // single non-optionnel classique
    if (step.type === "single") {
      // si optional et déjà sélectionné, on désélectionne
      const next =
        step.optional && curr[0] === value
          ? []
          : [value];
      setAnswers({ ...answers, [step.stepId]: next });
      return;
    }

    // multi classique
    let next;
    if (curr.includes(value)) {
      next = curr.filter((v) => v !== value);
    } else {
      next = [...curr, value];
    }
    if (step.maxSelection && next.length > step.maxSelection) return;
    setAnswers({ ...answers, [step.stepId]: next });
  };

  const handleNext = () => {
    const resp = answers[step.stepId];
    if (!step.optional && (!resp || resp.length === 0)) return;
    if (stepIndex + 1 < flow.length) {
      setStepIndex(stepIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (stepIndex === 0) return onBack();
    setStepIndex(stepIndex - 1);
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <h2 className="text-3xl font-bold mb-6">{step.title}</h2>

      <div className="grid grid-cols-2 gap-6 flex-1 overflow-auto">
        {step.options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              className={`
                relative p-4 rounded-xl shadow flex flex-col items-center transition-transform
                ${isSelected ? "bg-yellow-400" : "bg-white"} 
                hover:scale-105
              `}
            >
              {/* Label au-dessus */}
              <div className="absolute top-4 w-full text-center text-2xl font-extrabold text-black">
                {opt.label}
              </div>

              {/* Image */}
              {opt.img && (
                <img
                  src={opt.img}
                  alt={opt.label}
                  className="w-24 h-24 mt-16 mb-2 rounded-lg object-cover"
                />
              )}

              {/* Note pour menus */}
              {step.stepId === "formule" &&
                opt.value === "menu" &&
                step.noteForMenu && (
                  <div className="mt-6 text-sm text-gray-600">
                    {step.noteForMenu}
                  </div>
              )}
            </button>
          );
        })}
      </div>

      {/* navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg"
        >
          {stepIndex === 0 ? "↩ Annuler" : "← Précédent"}
        </button>
        <button
          onClick={handleNext}
          disabled={!step.optional && selected.length === 0}
          className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg disabled:opacity-50"
        >
          {stepIndex + 1 < flow.length ? "Suivant →" : "Valider cette étape"}
        </button>
      </div>
    </div>
  );
}
