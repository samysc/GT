// src/components/StepFlow.js
import React, { useState } from "react";

export default function StepFlow({ flow, onBack, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers]   = useState({});
  const step = flow[stepIndex];

  const toggleOption = (value) => {
    const curr = answers[step.stepId] || [];
    let next;
    if (step.type === "single") {
      next = [value];
    } else {
      // multi
      if (curr.includes(value)) {
        next = curr.filter((v) => v !== value);
      } else {
        next = [...curr, value];
      }
      // appliquer maxSelection
      if (step.maxSelection && next.length > step.maxSelection) return;
    }
    setAnswers({ ...answers, [step.stepId]: next });
  };

  const handleNext = () => {
    // on ne passe pas à l’étape suivante si aucune réponse (pour les required)
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

  const selected = answers[step.stepId] || [];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
      <div className="grid grid-cols-2 gap-4 flex-1 overflow-auto">
        {step.options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              className={`p-4 rounded-xl shadow flex flex-col items-center 
                          ${isSelected ? "bg-yellow-400" : "bg-white"} 
                          hover:scale-105 transition`}
            >
              {opt.img && (
                <img src={opt.img} alt={opt.label} className="w-24 h-24 mb-2 rounded-lg" />
              )}
              <span className="font-semibold">{opt.label}</span>
              {step.stepId === "formule" && opt.value === "menu" && step.noteForMenu && (
                <small className="mt-1 text-sm text-gray-600">{step.noteForMenu}</small>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
        >
          {stepIndex === 0 ? "↩ Annuler" : "← Précédent"}
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
          disabled={!step.optional && selected.length === 0}
        >
          {stepIndex + 1 < flow.length ? "Suivant →" : "Valider cette étape"}
        </button>
      </div>
    </div>
  );
}
