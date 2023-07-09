interface Quiz {
  quizname: string; // max lenght is 25
  questions: Question[]; // min length is 2
}

interface Question {
  question: string; // min lenght is 5
  options: Option[]; // max is 4 options
  explanation: string; // the max is 500 characters
  time: 0 | 15 | 30 | 45 | 60; //
}

interface Option {
  option: string; // max length is 100
  correct: boolean;
}

// Array of Quizzes

const quizzes: Quiz[] = [
  {
    "quizname": "Concours d’accès en 1ère année du Cycle Ingénieur de l’ENSA de Safi",
    "questions": [
      {
        "question": "Un protocole de communication est :",
        "options": [
          {
            "option": "A - une autoroute de l’information",
            "correct": false
          },
          {
            "option": "B - une technologie de traitement de l’information",
            "correct": false
          },
          {
            "option": "C - un ensemble de règles et de structures",
            "correct": true
          },
          {
            "option": "D - des règles",
            "correct": false
          }
        ],
        "explanation": "Un protocole de communication est un ensemble de règles et de structures qui permettent l'échange d'informations entre deux ou plusieurs entités dans un système informatique ou réseau.",
        "time": 0
      },
      {
        "question": "Un programme source devient exécutable après avoir été traité par un module appelé :",
        "options": [
          {
            "option": "A - un exécuteur",
            "correct": false
          },
          {
            "option": "B - un compilateur",
            "correct": true
          },
          {
            "option": "C - un traducteur",
            "correct": false
          },
          {
            "option": "D - un interpréteur",
            "correct": false
          }
        ],
        "explanation": "Un programme source devient exécutable après avoir été traité par un compilateur, qui se charge de traduire le code source dans un langage de programmation vers un code exécutable compréhensible par la machine.",
        "time": 0
      },
      {
        "question": "Quel est le langage le plus proche de la machine ?",
        "options": [
          {
            "option": "A - le Pascal",
            "correct": false
          },
          {
            "option": "B - le C",
            "correct": false
          },
          {
            "option": "C - l’Assembleur",
            "correct": true
          },
          {
            "option": "D - JAVA",
            "correct": false
          }
        ],
        "explanation": "Le langage le plus proche de la machine est l’Assembleur, qui utilise un code mnémonique pour représenter les instructions comprises directement par le processeur.",
        "time": 0
      },
      {
        "question": "En algèbre de boole, le ou exclusif donne les résultats suivants :",
        "options": [
          {
            "option": "A - 1 + 1 = 0",
            "correct": true
          },
          {
            "option": "B - 1 + 1 = 1",
            "correct": false
          },
          {
            "option": "C - 0 + 1 = 0",
            "correct": false
          },
          {
            "option": "D - 0 + 0 = 1",
            "correct": false
          }
        ],
        "explanation": "En algèbre de Boole, le ou exclusif (XOR) donne le résultat 1 lorsque les deux entrées sont différentes, sinon le résultat est 0. Donc, 1 XOR 1 = 0.",
        "time": 0
      },
      {
        "question": "Le chipset de la carte mère est :",
        "options": [
          {
            "option": "A. le support accueillant le processeur",
            "correct": false
          },
          {
            "option": "B. Le support accueillant la barrette de mémoire (RAM)",
            "correct": false
          },
          {
            "option": "C. Un jeu de caractère définissant si le clavier est AZERTY ou un QUERTY",
            "correct": false
          },
          {
            "option": "D. Un jeu de composants permettant les échanges entre les divers éléments d’un ordinateur",
            "correct": true
          }
        ],
        "explanation": "Le chipset de la carte mère est un jeu de composants permettant les échanges entre les divers éléments d’un ordinateur, tels que le processeur, la mémoire, les périphériques, etc.",
        "time": 0
      },
      {
        "question": "Laquelle ou lesquelles de ces normes n’appartiennent pas à la couche accès réseau :",
        "options": [
          {
            "option": "A. 802.11b",
            "correct": false
          },
          {
            "option": "B. 802.2",
            "correct": false
          },
          {
            "option": "C. icmp",
            "correct": true
          },
          {
            "option": "D. 803.11",
            "correct": false
          }
        ],
        "explanation": "Le protocole icmp (Internet Control Message Protocol) n'appartient pas à la couche accès réseau, mais plutôt à la couche Internet du modèle OSI. Les autres normes, 802.11b et 803.11, sont des normes de réseau local sans fil (WiFi), et 802.2 est une norme d'accès au support pour les réseaux locaux câblés.",
        "time": 0
      },
      {
        "question": "Quel type de fichier doit-on choisir pour créer un modèle?",
        "options": [
          {
            "option": "A. Document Word",
            "correct": false
          },
          {
            "option": "B. Texte RTF",
            "correct": false
          },
          {
            "option": "C. Texte seulement",
            "correct": false
          },
          {
            "option": "D. Modèle de document",
            "correct": true
          }
        ],
        "explanation": "Pour créer un modèle, il est recommandé de choisir l'option D. Modèle de document. Cette option permet de définir un modèle préformaté avec des sections prédéfinies et des espaces réservés pour insérer des informations spécifiques.",
        "time": 0
      },
      {
        "question": "Le code ASCII peut être assimilé à un tableau de correspondance entre :",
        "options": [
          {
            "option": "A. une valeur et son adresse",
            "correct": false
          },
          {
            "option": "B. un caractère et sa valeur numérique",
            "correct": true
          },
          {
            "option": "C. un nombre et son inverse",
            "correct": false
          },
          {
            "option": "D. une adresse mémoire et un contenu mémoire",
            "correct": false
          }
        ],
        "explanation": "Le code ASCII (American Standard Code for Information Interchange) est un système de codage qui associe un caractère à une valeur numérique. Ainsi, il permet de représenter les caractères en utilisant des nombres entiers.",
        "time": 0
      },
      {
        "question": "L'addition 0011 + 1001 en binaire donne :",
        "options": [
          {
            "option": "A. 1100",
            "correct": false
          },
          {
            "option": "B. 011 1001",
            "correct": false
          },
          {
            "option": "C. 1110",
            "correct": true
          },
          {
            "option": "D. 1110",
            "correct": false
          }
        ],
        "explanation": "L'addition binaire 0011 + 1001 donne le résultat 10100, qui est représenté en binaire sous la forme 1110.",
        "time": 0
      },
      {
        "question": "SCSI est :",
        "options": [
          {
            "option": "A. une interface de connexion",
            "correct": true
          },
          {
            "option": "B. un système d’exploitation",
            "correct": false
          },
          {
            "option": "C. un langage de programmation",
            "correct": false
          },
          {
            "option": "D. un élément de la carte mère",
            "correct": false
          }
        ],
        "explanation": "SCSI (Small Computer System Interface) est une interface de connexion utilisée pour la communication entre des périphériques de stockage, tels que les disques durs, les lecteurs de CD/DVD, etc., et un ordinateur.",
        "time": 0
      },
      {
        "question": "Nom du protocole sécurisé utilisé sur internet :",
        "options": [
          {
            "option": "A. HTTP",
            "correct": false
          },
          {
            "option": "B. SMTP",
            "correct": false
          },
          {
            "option": "C. SHTP",
            "correct": false
          },
          {
            "option": "D. HTTPS",
            "correct": true
          }
        ],
        "explanation": "Le protocole sécurisé utilisé sur internet est HTTPS (Hypertext Transfer Protocol Secure). Il s'agit d'une version sécurisée du protocole HTTP utilisé pour la communication sécurisée entre un navigateur web et un serveur web.",
        "time": 0
      },
      {
        "question": "Le http se connecte généralement sur le port :",
        "options": [
          {
            "option": "A. 21",
            "correct": false
          },
          {
            "option": "B. 22",
            "correct": false
          },
          {
            "option": "C. 80",
            "correct": true
          },
          {
            "option": "D. 88",
            "correct": false
          }
        ],
        "explanation": "Le protocole HTTP (Hypertext Transfer Protocol) se connecte généralement sur le port 80. Ce port est utilisé pour les communications HTTP par défaut.",
        "time": 0
      },
      {
        "question": "A quel endroit d'une page HTML doit-on faire référence à une feuille de style (css) externe ?",
        "options": [
          {
            "option": "A. avant la balise html",
            "correct": false
          },
          {
            "option": "B. juste après la balise html",
            "correct": false
          },
          {
            "option": "C. dans l'en-tête ( head )",
            "correct": true
          },
          {
            "option": "D. dans le corps du document ( body )",
            "correct": false
          }
        ],
        "explanation": "Pour faire référence à une feuille de style (CSS) externe, il est recommandé de le faire dans l'en-tête (head) du document HTML. Cela permet de charger la feuille de style avant l'affichage du contenu de la page.",
        "time": 0
      },
      {
        "question": "Quel est le code HTML utilisé pour appliquer une feuille de style à une page ?",
        "options": [
          {
            "option": "A. stylesheet style.css /stylesheet",
            "correct": false
          },
          {
            "option": "B. link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\"",
            "correct": true
          },
          {
            "option": "C. style src=\"style.css\"",
            "correct": false
          },
          {
            "option": "D. stylesheet style.css /stylesheet",
            "correct": false
          }
        ],
        "explanation": "Pour appliquer une feuille de style à une page HTML, le code HTML utilisé est l'option B. link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\". Cela permet de lier le fichier CSS externe spécifié dans l'attribut href avec la page HTML.",
        "time": 0
      },
      {
        "question": "Sous UNIX, la commande « ls » permet de :",
        "options": [
          {
            "option": "A. changer de répertoire",
            "correct": false
          },
          {
            "option": "B. créer un nouveau répertoire",
            "correct": false
          },
          {
            "option": "C. lister le contenu d'un répertoire",
            "correct": true
          },
          {
            "option": "D. déplacer un fichier",
            "correct": false
          }
        ],
        "explanation": "Sous UNIX, la commande \"ls\" permet de lister le contenu d'un répertoire. Elle affiche les fichiers et les répertoires présents dans le répertoire spécifié.",
        "time": 0
      },
      {
        "question": "UML est :",
        "options": [
          {
            "option": "A. La partie « données » de la méthode MERISE",
            "correct": false
          },
          {
            "option": "B. un standard de communication",
            "correct": false
          },
          {
            "option": "C. une méthode de modélisation",
            "correct": true
          },
          {
            "option": "D. un langage de modélisation",
            "correct": false
          }
        ],
        "explanation": "UML (Unified Modeling Language) est une méthode de modélisation utilisée pour représenter graphiquement les différentes perspectives d'un système logiciel. Il fournit un langage standard pour la description et la communication des modèles conceptuels, structurels et comportementaux.",
        "time": 0
      },
      {
        "question": "« IP » (Internet Protocole) décrit :",
        "options": [
          {
            "option": "A - une messagerie électronique",
            "correct": false
          },
          {
            "option": "B - un transfert de fichier",
            "correct": false
          },
          {
            "option": "C - un protocole de communication",
            "correct": true
          },
          {
            "option": "D - le réseau Ethernet",
            "correct": false
          }
        ],
        "explanation": "« IP » (Internet Protocol) est un protocole de communication utilisé pour le routage des paquets de données sur les réseaux IP. Il permet l'adressage, le routage et le fragmentage des données lors de leur transmission entre les différentes machines d'un réseau.",
        "time": 0
      },
      {
        "question": "Qui n’est pas une clé candidate :",
        "options": [
          {
            "option": "A. Clé primaire",
            "correct": false
          },
          {
            "option": "B. Clé secondaire",
            "correct": true
          },
          {
            "option": "C. Clé étrangère",
            "correct": false
          },
          {
            "option": "D. Aucune réponse",
            "correct": false
          }
        ],
        "explanation": "Une clé secondaire n'est pas une terminologie couramment utilisée en base de données. Les clés candidates d'une table sont les clés potentielles qui peuvent être utilisées comme clé primaire. Les clés primaires et les clés étrangères sont des concepts couramment utilisés en base de données relationnelle.",
        "time": 0
      },
      {
        "question": "Combien de couches d’abstraction existe-t-il dans MERISE :",
        "options": [
          {
            "option": "A. 3 (1. Niveau conceptuel / 2. Niveau logique ou organisationnel / 3. Niveau physique)",
            "correct": true
          },
          {
            "option": "B. 4",
            "correct": false
          },
          {
            "option": "C. 5",
            "correct": false
          },
          {
            "option": "D. Aucune réponse",
            "correct": false
          }
        ],
        "explanation": "Dans MERISE, il existe 3 couches d'abstraction qui sont : 1. Niveau conceptuel (modèle conceptuel des données), 2. Niveau logique ou organisationnel (modèle organisationnel des données) et 3. Niveau physique (modèle physique des données). Ces couches représentent différentes perspectives et niveaux de détails dans la modélisation des données.",
        "time": 0
      },
      {
        "question": "Un diagramme d'activité contient :",
        "options": [
          {
            "option": "A. les utilisateurs du système",
            "correct": false
          },
          {
            "option": "B. les activités",
            "correct": true
          },
          {
            "option": "C. les deux dernières à la fois",
            "correct": false
          },
          {
            "option": "D. Aucune réponse",
            "correct": false
          }
        ],
        "explanation": "Un diagramme d'activité est utilisé pour modéliser le flux de contrôle et de données dans un système. Il contient principalement les activités qui représentent les actions ou les étapes du processus, ainsi que les transitions qui indiquent la séquence et les conditions entre les activités.",
        "time": 0
      }
    ]
  },
]

describe('template spec', () => {
  it('First test', () => {
    cy.visit('http://127.0.0.1:3000/') 
    cy.findByText(/log in/i).click()
    cy.findByRole('textbox').type("younesse")
    cy.findByPlaceholderText(/password/i).type("123456")
    cy.findByRole('button', { name: /login/i }).click()
    cy.wait(1000);
    for (let i = 0; i < quizzes.length; i++) {
      cy.findByText(/new quiz/i).click()
      cy.wait(1000);
      cy.wait(1000);
      cy.get('#formBasicEmail').type(quizzes[i].quizname)
      cy.wait(1000);
      cy.wait(1000);
      cy.get('button[type="submit"]').contains(/next/i).click();
      cy.wait(1000);
      cy.wait(1000);
      const questions = quizzes[i].questions;
      cy.wait(1000);
      for (let j = 0; j < questions.length; j++) {
        const question = questions[j];
        cy.wait(1000);
        cy.get('#formBasicEmail').type(`${question.question}{enter}`);
        cy.wait(2000);

        if(question.time > 0){
          cy.get('.MuiInputBase-root > #time').click()
          cy.get(`[data-value="${question.time}"]`).click()
        }
        const options = question.options;
        for (let k = 0; k < options.length; k++) {
          cy.findByPlaceholderText(/add option/i).type(`${options[k].option}{enter}`);
          if (options[k].correct) {
            cy.wait(2000);
            cy.findByText(options[k].option).click();
          }
        }
        cy.wait(1000);
        cy.get('.relative > .w-full').type(question.explanation);
        cy.wait(1000); 
        cy.findByRole('button', { name: /next/i }).click();
      }
     
      cy.wait(1000);
      cy.wait(1000);
      cy.findByText("Save").click();
      cy.wait(1000);
      cy.wait(1000);
      cy.wait(1000);
    }
  })
})
