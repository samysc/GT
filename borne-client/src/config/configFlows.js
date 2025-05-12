// src/config/configFlows.js

// 1) Options réutilisables (déjà présentes)
export const meatsOptions = [
    { value: "Poulet", label: "Poulet", img: "/img/viande_poulet.png" },
    { value: "Steak Haché", label: "Steak Haché", img: "/img/viande_steak.png" },
    { value: "Kefta", label: "Kefta", img: "/img/viande_kefta.png" },
    { value: "Kebab", label: "Kebab", img: "/img/viande_kebab.png" },
    { value: "Tenders", label: "Tenders", img: "/img/viande_tenders.png" },
    { value: "Cordon Bleu", label: "Cordon Bleu", img: "/img/viande_cordon_bleu.png" },
    { value: "Nuggets", label: "Nuggets", img: "/img/viande_nuggets.png" },
    { value: "Falafel", label: "Falafel", img: "/img/viande_falafel.png" },
  ];
  
  export const supplementsOptions = [
    { value: "Cheddar", label: "Cheddar +1€", img: "/img/supp_cheddar.png" },
    { value: "Feta", label: "Feta +1€", img: "/img/supp_feta.png" },
    { value: "Chèvre Miel", label: "Chèvre Miel +1€", img: "/img/supp_chevre_miel.png" },
    { value: "Raclette", label: "Raclette +1€", img: "/img/supp_raclette.png" },
    { value: "Boursin", label: "Boursin +1€", img: "/img/supp_boursin.png" },
    { value: "Kiri", label: "Kiri +1€", img: "/img/supp_kiri.png" },
    { value: "Galette de PDT", label: "Galette de PDT +1€", img: "/img/supp_pdt.png" },
    { value: "Bacon de Dinde", label: "Bacon de Dinde +1€", img: "/img/supp_bacon.png" },
    { value: "Œuf", label: "Œuf +1€", img: "/img/supp_oeuf.png" },
  ];
  
  export const saucesOptions = [
    { value: "Ketchup", label: "Ketchup", img: "/img/sauce_ketchup.png" },
    { value: "Mayonnaise", label: "Mayonnaise", img: "/img/sauce_mayo.png" },
    { value: "Blanche", label: "Sauce Blanche", img: "/img/sauce_blanche.png" },
    { value: "Barbecue", label: "Barbecue", img: "/img/sauce_bbq.png" },
    { value: "Samouraï", label: "Samouraï", img: "/img/sauce_samourai.png" },
    { value: "Algérienne", label: "Algérienne", img: "/img/sauce_algerienne.png" },
    { value: "Biggy Burger", label: "Biggy Burger", img: "/img/sauce_biggy.png" },
    { value: "Chili Thai", label: "Chili Thai", img: "/img/sauce_chili.png" },
    { value: "Moutarde", label: "Moutarde", img: "/img/sauce_moutarde.png" },
    { value: "Poivre", label: "Poivre", img: "/img/sauce_poivre.png" },
    { value: "Curry", label: "Curry", img: "/img/sauce_curry.png" },
    { value: "Harissa", label: "Harissa", img: "/img/sauce_harissa.png" },
    { value: "Brazil", label: "Brazil", img: "/img/sauce_brazil.png" },
    { value: "Andalouse", label: "Andalouse", img: "/img/sauce_andalouse.png" },
  ];

  export const cruditesOptions = [
    { value: "salade", label: "Salade", img: "/img/crudite_salade.png" },
    { value: "tomate", label: "Tomate", img: "/img/crudite_tomate.png" },
    { value: "oignon", label: "Oignon", img: "/img/crudite_oignon.png" },
  ];
  
  export const painOptions = [
    { value: "pain_maison", label: "Pain Maison", img: "/img/pain_maison.png" },
    { value: "galette",     label: "Pain Galette", img: "/img/pain_galette.png" },
  ];
  
  
  // 2) Flows par catégorie
  export const categoryFlows = {
    TACOS: [
      {
        stepId: "formule",
        title: "Choisissez votre formule",
        type: "single",
        options: [
          { value: "seul", label: "Seul" },
          { value: "menu", label: "Menu" },
        ],
        noteForMenu: "+1 Boisson (à choisir en caisse)",
      },
      {
        stepId: "viandes",
        title: "Sélectionnez vos viandes",
        type: "multi",
        maxSelection: null,
        options: meatsOptions,
      },
      {
        stepId: "supplements",
        title: "Suppléments (facultatif)",
        type: "multi",
        maxSelection: null,
        options: supplementsOptions,
        optional: true,
      },
      {
        stepId: "sauces",
        title: "Veuillez choisir 2 sauces maximum",
        type: "multi",
        maxSelection: 2,
        options: saucesOptions,
      },
    ],
  
    SANDWICH: [
      {
        stepId: "formule",
        title: "Choisissez votre formule",
        type: "single",
        options: [
          { value: "seul", label: "Seul" },
          { value: "menu", label: "Menu" },
        ],
        noteForMenu: "+1 Boisson + 1 Frite",
      },
      {
        stepId: "pain",
        title: "Pain Maison ou Galette",
        type: "single",
        options: [
          { value: "pain_maison", label: "Pain Maison", img: "/img/pain_maison.png" },
          { value: "galette", label: "Pain Galette", img: "/img/pain_galette.png" },
        ],
      },
      {
        stepId: "crudites",
        title: "Sélection des crudités",
        type: "multi",
        maxSelection: null,
        options: [
          { value: "salade", label: "Salade", img: "/img/crudite_salade.png" },
          { value: "tomate", label: "Tomate", img: "/img/crudite_tomate.png" },
          { value: "oignon", label: "Oignon", img: "/img/crudite_oignon.png" },
        ],
      },
      {
        stepId: "supplements",
        title: "Suppléments (facultatif)",
        type: "multi",
        maxSelection: null,
        options: supplementsOptions,
        optional: true,
      },
      {
        stepId: "sauces",
        title: "Veuillez choisir 2 sauces maximum",
        type: "multi",
        maxSelection: 2,
        options: saucesOptions,
      },
    ],
  
    BURGER: [
      {
        stepId: "formule",
        title: "Choisissez votre formule",
        type: "single",
        options: [
          { value: "seul", label: "Seul" },
          { value: "menu", label: "Menu" },
        ],
        noteForMenu: "+1 Boisson + 1 Frite",
      },
      {
        stepId: "crudites",
        title: "Sélection des crudités",
        type: "multi",
        maxSelection: null,
        options: [
          { value: "salade", label: "Salade", img: "/img/crudite_salade.png" },
          { value: "tomate", label: "Tomate", img: "/img/crudite_tomate.png" },
          { value: "oignon", label: "Oignon", img: "/img/crudite_oignon.png" },
        ],
      },
      {
        stepId: "supplements",
        title: "Suppléments (facultatif)",
        type: "multi",
        maxSelection: null,
        options: supplementsOptions,
        optional: true,
      },
      {
        stepId: "sauces",
        title: "Veuillez choisir 2 sauces maximum",
        type: "multi",
        maxSelection: 2,
        options: saucesOptions,
      },
    ],
  
    ASSIETTE: [
      {
        stepId: "formule",
        title: "Choisissez votre formule",
        type: "single",
        options: [
          { value: "seul", label: "Seul" },
          { value: "menu", label: "Menu" },
        ],
        noteForMenu: "+1 Boisson (à choisir en caisse)",
      },
      {
        stepId: "viandes",
        title: "Sélectionnez vos viandes",
        type: "multi",
        maxSelection: null,
        options: meatsOptions,
      },
      {
        stepId: "crudites",
        title: "Sélection des crudités",
        type: "multi",
        maxSelection: null,
        options: [
          { value: "salade", label: "Salade", img: "/img/crudite_salade.png" },
          { value: "tomate", label: "Tomate", img: "/img/crudite_tomate.png" },
          { value: "oignon", label: "Oignon", img: "/img/crudite_oignon.png" },
        ],
      },
      {
        stepId: "supplements",
        title: "Suppléments (facultatif)",
        type: "multi",
        maxSelection: null,
        options: supplementsOptions,
        optional: true,
      },
      {
        stepId: "sauces",
        title: "Veuillez choisir 2 sauces maximum",
        type: "multi",
        maxSelection: 2,
        options: saucesOptions,
      },
      {
        stepId: "pain",
        title: "Pain maison (optionnel)",
        type: "single",
        options: [
          { value: "pain_maison", label: "Pain Maison", img: "/img/pain_maison.png" },
        ],
        optional: true,
      },
    ],

    CROUSTY: [
        {
          stepId: "formule",
          title: "Choisissez votre formule",
          type: "single",
          options: [
            { value: "seul", label: "Seul" },
            { value: "menu", label: "Menu" },
          ],
          noteForMenu: "+1 Boisson (à choisir en caisse)",
        },
      ],
    

    PANINI: [
        {
          stepId: "formule",
          title: "Choisissez votre formule",
          type: "single",
          options: [
            { value: "seul", label: "Seul" },
            { value: "menu", label: "Menu" },
          ],
          noteForMenu: "+1 Boisson + 1 Frite",
        },
        {
          stepId: "supplements",
          title: "Suppléments (facultatif)",
          type: "multi",
          maxSelection: null,
          options: supplementsOptions,
          optional: true,
        },
        {
          stepId: "sauces",
          title: "Veuillez choisir 2 sauces maximum",
          type: "multi",
          maxSelection: 2,
          options: saucesOptions,
        },
      ],

      HUMMER: [
        {
          stepId: "formule",
          title: "Choisissez votre formule",
          type: "single",
          options: [
            { value: "seul", label: "Seul" },
            { value: "menu", label: "Menu" },
          ],
          noteForMenu: "+1 Boisson + 1 Frite",
        },
        {
          stepId: "crudites",
          title: "Sélection des crudités",
          type: "multi",
          maxSelection: null,
          options: cruditesOptions,
        },
        {
          stepId: "supplements",
          title: "Suppléments (facultatif)",
          type: "multi",
          maxSelection: null,
          options: supplementsOptions,
          optional: true,
        },
        {
          stepId: "sauces",
          title: "Veuillez choisir 2 sauces maximum",
          type: "multi",
          maxSelection: 2,
          options: saucesOptions,
        },
      ],
  };
  