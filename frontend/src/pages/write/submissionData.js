export const MOCK_SUBMISSIONS = [
  {
    id: 1,
    language: "Spanish",
    level: "Beginner",
    postedAt: "2 min ago",
    title: "Morning Routine",
    excerpt: "Describe the feeling of a quiet morning...",
    text: "Cada mañana me despierto cuando el sol entra por la ventana. El silencio es perfecto, solo escucho los pájaros cantando. Me siento en paz y tranquilo. Tomo café lentamente y pienso en el día. La mañana es mi momento favorito del día porque todo está callado y hermoso. Me gusta sentir la brisa fresca y ver cómo la ciudad se despierta poco a poco.",
    words: 90,
    readingTime: 2,
    userId: "author-1",
    reviews: [
      {
        userId: "reviewer-1",
        correction: "Cada mañana me despierto cuando el sol entra por la ventana. El silencio es perfecto, solo escucho a los pájaros cantando. Me siento en paz y tranquilo. Tomo café lentamente y pienso en el día. La mañana es mi momento favorito del día porque todo está tranquilo y hermoso. Me gusta sentir la brisa fresca y ver cómo la ciudad se despierta poco a poco.",
        notes: "Minor corrections: 'escucho a los pájaros' is more natural. Also 'tranquilo' instead of 'callado' in the second instance for better variety.",
        createdAt: new Date(Date.now() - 60000).toISOString(),
      }
    ]
  },
  {
    id: 2,
    language: "Spanish",
    level: "Advanced",
    postedAt: "15 min ago",
    title: "Economic Theory",
    excerpt: "A deep dive into market fluctuations...",
    text: "La economía de mercado se caracteriza por fluctuaciones cíclicas que reflejan desequilibrios entre la oferta y la demanda. Durante los períodos de expansión, las inversiones aumentan, impulsando el crecimiento económico y la creación de empleos. Sin embargo, esta fase es frecuentemente seguida por correcciones de mercado que pueden resultar en recesión económica. Los economistas clásicos argumentaban que el mercado autorregulado alcanzaría naturalmente el equilibrio, mientras que los keynesianos sostienen que la intervención estatal es necesaria para estabilizar las economías. Este debate sigue siendo central en la política económica contemporánea, especialmente en contextos de crisis financiera global.",
    words: 280,
    readingTime: 4,
    userId: "author-2",
    reviews: [
      {
        userId: "reviewer-2",
        correction: "La economía de mercado se caracteriza por fluctuaciones cíclicas que reflejan desequilibrios entre la oferta y la demanda. Durante los períodos de expansión, las inversiones aumentan, impulsando el crecimiento económico y la creación de empleo. Sin embargo, esta fase es frecuentemente seguida por correcciones de mercado que pueden resultar en una recesión económica. Los economistas clásicos argumentaban que el mercado auto-regulado alcanzaría naturalmente el equilibrio, mientras que los keynesianos sostienen que la intervención estatal es necesaria para estabilizar las economías. Este debate sigue siendo central en la política económica contemporánea, especialmente en contextos de crisis financiera global.",
        notes: "Excellent advanced vocabulary! Small notes: 'empleo' (singular) is more common than 'empleos' here. 'una recesión' with article flows better. Consider 'auto-regulado' vs 'autorregulado'.",
        createdAt: new Date(Date.now() - 120000).toISOString(),
      }
    ]
  },
  {
    id: 3,
    language: "English",
    level: "Beginner",
    postedAt: "18 min ago",
    title: "Travel Blog",
    excerpt: "My recent trip to the mountains...",
    text: "Last summer, I went to the mountains with my family. The view was amazing and the air was very fresh. We hiked for three hours and saw beautiful forests. At the top, we could see the valley below us. It was incredible. We took many photos and felt very happy. The people in the small village were very friendly. I loved the peaceful environment. I want to go back again next year.",
    words: 76,
    readingTime: 2,
    userId: "author-3",
    reviews: [
      {
        userId: "reviewer-3",
        correction: "Last summer, I went to the mountains with my family. The view was amazing and the air was very fresh. We hiked for three hours and saw beautiful forests. At the top, we could see the valley below us. It was incredible. We took many photos and felt very happy. The people in the small village were very friendly. I loved the peaceful environment. I want to go back again next year.",
        notes: "Great start! Try using more varied sentence structures and adjectives to make it more engaging. Consider combining some sentences for better flow.",
        createdAt: new Date(Date.now() - 180000).toISOString(),
      }
    ]
  }
];

