/**
 * PULSO FIT | Academia e Treinamento
 * Arquivo central de configuração do cliente (assets/js/config.js)
 * Carregado antes de assets/js/main.js
 *
 * IMPORTANTE: Todos os dados abaixo são FICTÍCIOS DE DEMONSTRAÇÃO COMERCIAL.
 * Substitua pelos dados reais da sua academia antes de publicar em produção.
 */
window.PULSO_CONFIG = {
  isDemo: true,
  brand: {
    name: "PULSO FIT",
    tagline: "Academia Boutique & Treinamento Orientado",
    shortDescription:
      "Ambiente sem superlotação, acompanhamento próximo e rotina consistente para adultos de todas as idades.",
    demoWarning:
      "AMBIENTE DE DEMONSTRAÇÃO COMERCIAL: Marca, endereço, telefone, horários, preços, números operacionais e perfis de equipe são exemplos fictícios para apresentação de layout e funcionalidades."
  },
  colors: {
    graphiteDark: "#111315",
    graphiteSurface: "#1A1D21",
    whiteLight: "#F8FAFC",
    electricLime: "#C8FF00",
    electricLimeHover: "#B4F000"
  },
  contact: {
    whatsappNumber: "5511999990000", // Número fictício demonstrativo (substituir pelo real com DDI + DDD)
    whatsappDisplay: "(11) 99999-0000 (Demo)",
    phoneDisplay: "(11) 3000-0000 (Demo)",
    email: "contato.demo@pulsofit.exemplo.br",
    addressLine1: "Av. Exemplo Paulista, 1450 — Conjunto Térreo (Endereço Fictício)",
    addressLine2: "Bela Vista, São Paulo — SP • CEP 01310-000",
    openingHours: [
      "Segunda a Sexta: 06h00 às 22h00",
      "Sábados: 08h00 às 14h00",
      "Domingos e Feriados: 09h00 às 13h00 (Aulas Especiais)"
    ],
    googleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Avenida+Paulista+Sao+Paulo"
  },
  seo: {
    canonicalUrl: "https://usuario.github.io/academia/",
    ogImage: "assets/img/og-pulso-fit.svg"
  },
  heroStats: [
    {
      value: "Máx. 14",
      label: "Alunos por horário nas turmas coletivas",
      note: "Exemplo operacional demonstrativo"
    },
    {
      value: "45 a 55 min",
      label: "Sessões objetivas planejadas para sua rotina",
      note: "Duração média de referência"
    },
    {
      value: "20 a 70+ anos",
      label: "Diversidade etária em ambiente acolhedor",
      note: "Perfil ilustrativo de público"
    }
  ],
  modalities: [
    {
      id: "musculacao",
      name: "Musculação Orientada",
      badge: "Força & Base",
      intensity: "Adaptável (Leve a Intensa)",
      duration: "50 min",
      audience: "Iniciantes, intermediários, adultos 50+ e retorno aos treinos",
      description:
        "Treinamento de força em equipamentos ergonômicos e pesos livres com número controlado de alunos por faixa horária e ajuste técnico constante dos instrutores de sala.",
      highlights: [
        "Organização de rotina sem fila em aparelhos",
        "Atenção à postura, cadência e execução segura",
        "Progressão respeitando o histórico individual"
      ],
      image: "assets/img/modalidade-musculacao.svg",
      imageAlt: "Ilustração de sala de musculação orientada com rack de agachamento, banco ajustável e halteres"
    },
    {
      id: "funcional",
      name: "Treinamento Funcional",
      badge: "Dinâmico & Coletivo",
      intensity: "Moderada a Alta (Escalável)",
      duration: "45 min",
      audience: "Adultos que buscam dinamismo, agilidade e resistência geral",
      description:
        "Sessões dinâmicas em pista amortecida utilizando kettlebells, corda naval, caixas e peso corporal para desenvolver coordenação, estabilidade e fôlego para o dia a dia.",
      highlights: [
        "Turmas reduzidas de até 12 participantes",
        "Opções de adaptação de impacto em cada estação",
        "Ambiente colaborativo sem clima de competição hostil"
      ],
      image: "assets/img/modalidade-funcional.svg",
      imageAlt: "Ilustração de zona de treinamento funcional com pista sintética, kettlebells e corda naval"
    },
    {
      id: "bike",
      name: "Bike Indoor",
      badge: "Cardio & Ritmo",
      intensity: "Moderada a Intensa (Carga individual)",
      duration: "45 min",
      audience: "Todos os níveis; excelente opção cardiovascular de baixo impacto articular",
      description:
        "Pedal estacionário guiado por música e cadência em sala climatizada, onde cada aluno controla sua própria resistência mecânica de acordo com a disposição do dia.",
      highlights: [
        "Regulagem prévia de selim e guidão com auxílio do instrutor",
        "Trilha sonora energética e iluminação confortável",
        "Controle individual de carga do início ao fim"
      ],
      image: "assets/img/modalidade-bike.svg",
      imageAlt: "Ilustração de estúdio de bike indoor com bicicleta estacionária e indicador de cadência"
    },
    {
      id: "mobilidade",
      name: "Mobilidade & Core",
      badge: "Postura & Fluidez",
      intensity: "Leve a Moderada",
      duration: "45 min",
      audience: "Quem trabalha muitas horas sentado, iniciantes e complemento de força",
      description:
        "Prática focada em liberdade articular (quadril, coluna torácica e ombros), fortalecimento profundo do centro do corpo (core) e consciência respiratória.",
      highlights: [
        "Ideal para reduzir rigidez de rotina de escritório",
        "Excelente preparação ou recuperação entre treinos de força",
        "Ritmo calmo, guiado passo a passo"
      ],
      image: "assets/img/modalidade-mobilidade.svg",
      imageAlt: "Ilustração de aula de mobilidade e core com tatames, rolo de liberação e bola de estabilidade"
    }
  ],
  schedule: [
    // Segunda-feira
    { id: "seg-0630", day: "segunda", dayLabel: "Segunda", time: "06:30", modality: "musculacao", modalityLabel: "Musculação Orientada", title: "Força & Rotina Matinal", instructor: "Marina Costa (Demo)", spots: "Até 10 alunos/horário", duration: "50 min", level: "Todos os níveis" },
    { id: "seg-0730", day: "segunda", dayLabel: "Segunda", time: "07:30", modality: "funcional", modalityLabel: "Treinamento Funcional", title: "Funcional Despertar", instructor: "Lucas Kenji (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Iniciante / Interm." },
    { id: "seg-0900", day: "segunda", dayLabel: "Segunda", time: "09:00", modality: "mobilidade", modalityLabel: "Mobilidade & Core", title: "Mobilidade Articular & Postura", instructor: "Roberto Vasconcelos (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Aberto (Destaque 50+)" },
    { id: "seg-1215", day: "segunda", dayLabel: "Segunda", time: "12:15", modality: "funcional", modalityLabel: "Treinamento Funcional", title: "Funcional Express Almoço", instructor: "Lucas Kenji (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Todos os níveis" },
    { id: "seg-1800", day: "segunda", dayLabel: "Segunda", time: "18:00", modality: "musculacao", modalityLabel: "Musculação Orientada", title: "Musculação Orientada Noite", instructor: "Marina Costa (Demo)", spots: "Até 10 alunos/horário", duration: "50 min", level: "Todos os níveis" },
    { id: "seg-1915", day: "segunda", dayLabel: "Segunda", time: "19:15", modality: "bike", modalityLabel: "Bike Indoor", title: "Pulso Ride — Ritmo & Energia", instructor: "Lucas Kenji (Demo)", spots: "14 bikes", duration: "45 min", level: "Carga individual" },
    // Terça-feira
    { id: "ter-0630", day: "terca", dayLabel: "Terça", time: "06:30", modality: "bike", modalityLabel: "Bike Indoor", title: "Morning Ride Cadência", instructor: "Lucas Kenji (Demo)", spots: "14 bikes", duration: "45 min", level: "Todos os níveis" },
    { id: "ter-0800", day: "terca", dayLabel: "Terça", time: "08:00", modality: "musculacao", modalityLabel: "Musculação Orientada", title: "Força & Longevidade Ativa", instructor: "Roberto Vasconcelos (Demo)", spots: "Até 10 alunos/horário", duration: "50 min", level: "Iniciante / 50+" },
    { id: "ter-1215", day: "terca", dayLabel: "Terça", time: "12:15", modality: "mobilidade", modalityLabel: "Mobilidade & Core", title: "Pausa Ativa: Coluna & Quadril", instructor: "Roberto Vasconcelos (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Todos os níveis" },
    { id: "ter-1830", day: "terca", dayLabel: "Terça", time: "18:30", modality: "funcional", modalityLabel: "Treinamento Funcional", title: "Circuito Funcional Estúdio", instructor: "Marina Costa (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Iniciante / Interm." },
    { id: "ter-1930", day: "terca", dayLabel: "Terça", time: "19:30", modality: "musculacao", modalityLabel: "Musculação Orientada", title: "Musculação Orientada Fim do Dia", instructor: "Marina Costa (Demo)", spots: "Até 10 alunos/horário", duration: "50 min", level: "Todos os níveis" },
    // Quarta-feira
    { id: "qua-0630", day: "quarta", dayLabel: "Quarta", time: "06:30", modality: "musculacao", modalityLabel: "Musculação Orientada", title: "Força & Rotina Matinal", instructor: "Marina Costa (Demo)", spots: "Até 10 alunos/horário", duration: "50 min", level: "Todos os níveis" },
    { id: "qua-0730", day: "quarta", dayLabel: "Quarta", time: "07:30", modality: "funcional", modalityLabel: "Treinamento Funcional", title: "Funcional Estabilidade & Core", instructor: "Lucas Kenji (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Todos os níveis" },
    { id: "qua-0900", day: "quarta", dayLabel: "Quarta", time: "09:00", modality: "mobilidade", modalityLabel: "Mobilidade & Core", title: "Mobilidade & Respiração Guiada", instructor: "Roberto Vasconcelos (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Aberto (Destaque 50+)" },
    { id: "qua-1800", day: "quarta", dayLabel: "Quarta", time: "18:00", modality: "bike", modalityLabel: "Bike Indoor", title: "Sunset Ride — Subidas & Ritmo", instructor: "Lucas Kenji (Demo)", spots: "14 bikes", duration: "45 min", level: "Carga individual" },
    { id: "qua-1900", day: "quarta", dayLabel: "Quarta", time: "19:00", modality: "funcional", modalityLabel: "Treinamento Funcional", title: "Funcional Energia Coletiva", instructor: "Lucas Kenji (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Iniciante / Interm." },
    // Quinta-feira
    { id: "qui-0700", day: "quinta", dayLabel: "Quinta", time: "07:00", modality: "bike", modalityLabel: "Bike Indoor", title: "Bike Indoor Endurance", instructor: "Lucas Kenji (Demo)", spots: "14 bikes", duration: "45 min", level: "Todos os níveis" },
    { id: "qui-0800", day: "quinta", dayLabel: "Quinta", time: "08:00", modality: "musculacao", modalityLabel: "Musculação Orientada", title: "Força & Longevidade Ativa", instructor: "Roberto Vasconcelos (Demo)", spots: "Até 10 alunos/horário", duration: "50 min", level: "Iniciante / 50+" },
    { id: "qui-1215", day: "quinta", dayLabel: "Quinta", time: "12:15", modality: "mobilidade", modalityLabel: "Mobilidade & Core", title: "Core & Descompressão Postural", instructor: "Roberto Vasconcelos (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Todos os níveis" },
    { id: "qui-1830", day: "quinta", dayLabel: "Quinta", time: "18:30", modality: "musculacao", modalityLabel: "Musculação Orientada", title: "Musculação Técnica Guiada", instructor: "Marina Costa (Demo)", spots: "Até 10 alunos/horário", duration: "50 min", level: "Todos os níveis" },
    { id: "qui-1930", day: "quinta", dayLabel: "Quinta", time: "19:30", modality: "funcional", modalityLabel: "Treinamento Funcional", title: "Funcional Força & Movimento", instructor: "Marina Costa (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Todos os níveis" },
    // Sexta-feira
    { id: "sex-0630", day: "sexta", dayLabel: "Sexta", time: "06:30", modality: "musculacao", modalityLabel: "Musculação Orientada", title: "Força & Consistência Semanal", instructor: "Marina Costa (Demo)", spots: "Até 10 alunos/horário", duration: "50 min", level: "Todos os níveis" },
    { id: "sex-0730", day: "sexta", dayLabel: "Sexta", time: "07:30", modality: "funcional", modalityLabel: "Treinamento Funcional", title: "Funcional Sexta Ativa", instructor: "Lucas Kenji (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Todos os níveis" },
    { id: "sex-0900", day: "sexta", dayLabel: "Sexta", time: "09:00", modality: "mobilidade", modalityLabel: "Mobilidade & Core", title: "Mobilidade Global de Sexta", instructor: "Roberto Vasconcelos (Demo)", spots: "Máx. 12 vagas", duration: "45 min", level: "Todos os níveis" },
    { id: "sex-1800", day: "sexta", dayLabel: "Sexta", time: "18:00", modality: "bike", modalityLabel: "Bike Indoor", title: "Friday Night Ride", instructor: "Lucas Kenji (Demo)", spots: "14 bikes", duration: "45 min", level: "Carga individual" },
    // Sábado
    { id: "sab-0830", day: "sabado", dayLabel: "Sábado", time: "08:30", modality: "musculacao", modalityLabel: "Musculação Orientada", title: "Sábado de Força sem Pressa", instructor: "Marina Costa (Demo)", spots: "Até 10 alunos/horário", duration: "55 min", level: "Todos os níveis" },
    { id: "sab-0930", day: "sabado", dayLabel: "Sábado", time: "09:30", modality: "funcional", modalityLabel: "Treinamento Funcional", title: "Funcional Coletivo de Sábado", instructor: "Lucas Kenji (Demo)", spots: "Máx. 14 vagas", duration: "50 min", level: "Todos os níveis" },
    { id: "sab-1030", day: "sabado", dayLabel: "Sábado", time: "10:30", modality: "bike", modalityLabel: "Bike Indoor", title: "Weekend Pulso Ride", instructor: "Lucas Kenji (Demo)", spots: "14 bikes", duration: "45 min", level: "Todos os níveis" },
    { id: "sab-1130", day: "sabado", dayLabel: "Sábado", time: "11:30", modality: "mobilidade", modalityLabel: "Mobilidade & Core", title: "Mobilidade & Alongamento Consciente", instructor: "Roberto Vasconcelos (Demo)", spots: "Máx. 14 vagas", duration: "45 min", level: "Todos os níveis" }
  ],
  plans: {
    cycles: {
      mensal: {
        id: "mensal",
        label: "Mensal",
        months: 1,
        discountBadge: "Renovação mês a mês",
        description: "Flexibilidade total sem fidelidade de longo prazo (valores fictícios de exemplo)."
      },
      trimestral: {
        id: "trimestral",
        label: "Trimestral",
        months: 3,
        discountBadge: "Economia de ~10% (Demo)",
        description: "Ideal para consolidar o hábito de treino com valor mensal reduzido (valores fictícios de exemplo)."
      },
      anual: {
        id: "anual",
        label: "Anual",
        months: 12,
        discountBadge: "Economia de ~20% (Demo)",
        description: "Melhor relação custo-benefício para quem prioriza consistência o ano inteiro (valores fictícios de exemplo)."
      }
    },
    items: [
      {
        id: "essencial",
        name: "Plano Essencial",
        subtitle: "Foco em uma modalidade principal até 3x por semana",
        featured: false,
        badge: "Início Consistente",
        pricing: {
          mensal: { monthlyEquivalent: 289 },
          trimestral: { monthlyEquivalent: 259 },
          anual: { monthlyEquivalent: 229 }
        },
        features: [
          "Escolha entre Musculação Orientada OU 1 modalidade coletiva",
          "Acesso até 3 vezes por semana com agendamento de horário",
          "Conversa inicial de acolhimento para conhecer sua rotina",
          "Acesso completo aos vestiários individuais e armários rotativos",
          "Sem taxa de matrícula ou manutenção (exemplo demonstrativo)"
        ]
      },
      {
        id: "pulso-total",
        name: "Plano Pulso Total",
        subtitle: "Acesso livre combinando Musculação + Aulas Coletivas",
        featured: true,
        badge: "Mais Escolhido (Demo)",
        pricing: {
          mensal: { monthlyEquivalent: 389 },
          trimestral: { monthlyEquivalent: 349 },
          anual: { monthlyEquivalent: 309 }
        },
        features: [
          "Acesso livre: Musculação Orientada, Funcional, Bike Indoor e Mobilidade",
          "Frequência livre de Segunda a Sábado mediante reserva de turma",
          "Revisão periódica da organização da sua rotina de treinos",
          "2 convites mensais para levar um acompanhante em aula experimental",
          "Serviço de toalha de treino incluso na recepção"
        ]
      },
      {
        id: "black-studio",
        name: "Plano Black Studio",
        subtitle: "Experiência boutique completa com comodidades extras",
        featured: false,
        badge: "Comodidade Máxima",
        pricing: {
          mensal: { monthlyEquivalent: 499 },
          trimestral: { monthlyEquivalent: 449 },
          anual: { monthlyEquivalent: 399 }
        },
        features: [
          "Acesso irrestrito a todas as modalidades e horários da grade",
          "Prioridade de reserva na abertura semanal da agenda de Bike e Funcional",
          "Armário privativo fixo no vestiário + kit de toalhas de banho e rosto",
          "Pausa de contrato de até 30 dias no ciclo anual para viagens",
          "4 convites mensais para convidados mediante agendamento prévio"
        ]
      }
    ]
  },
  team: [
    {
      name: "Marina Costa",
      role: "Coordenação de Sala & Musculação Orientada (Perfil Ilustrativo)",
      bio: "Focada em acolher adultos iniciantes e organizar rotinas de força sustentáveis, priorizando execução limpa e conforto articular.",
      tags: ["Musculação Orientada", "Acolhimento de Iniciantes", "Rotina Sustentável"],
      image: "assets/img/equipe-1.svg",
      imageAlt: "Retrato ilustrativo de Marina Costa, perfil fictício de demonstração"
    },
    {
      name: "Roberto Vasconcelos",
      role: "Especialista em Mobilidade & Longevidade Ativa (Perfil Ilustrativo)",
      bio: "Dedica-se à liberdade de movimento, estabilidade do core e adaptação de exercícios para adultos 50+, 60+ e profissionais sedentários.",
      tags: ["Mobilidade & Core", "Público 50+ e 60+", "Consciência Postural"],
      image: "assets/img/equipe-2.svg",
      imageAlt: "Retrato ilustrativo de Roberto Vasconcelos, perfil fictício de demonstração"
    },
    {
      name: "Lucas Kenji",
      role: "Instrutor de Funcional & Bike Indoor (Perfil Ilustrativo)",
      bio: "Conduz aulas coletivas dinâmicas com energia positiva, oferecendo variações claras de ritmo e impacto para que cada aluno evolua no próprio tempo.",
      tags: ["Bike Indoor", "Treinamento Funcional", "Ritmo Escalável"],
      image: "assets/img/equipe-3.svg",
      imageAlt: "Retrato ilustrativo de Lucas Kenji, perfil fictício de demonstração"
    }
  ],
  facilities: [
    {
      title: "Sala de Força & Peso Livre",
      tag: "Sem filas nos horários de pico",
      description:
        "Equipamentos biomecânicos selecionados, racks de agachamento, bancos ajustáveis e pares completos de halteres com amplo espaço de circulação.",
      image: "assets/img/instalacao-forca.svg",
      imageAlt: "Ilustração da Sala de Força e Peso Livre da Pulso Fit"
    },
    {
      title: "Estúdio Climatizado de Bike Indoor",
      tag: "Acústica planejada & 14 bikes",
      description:
        "Sala dedicada com renovação constante de ar, iluminação indireta que não cansa a vista e bicicletas com ajuste milimétrico de postura.",
      image: "assets/img/instalacao-bike-studio.svg",
      imageAlt: "Ilustração do Estúdio Climatizado de Bike Indoor"
    },
    {
      title: "Zona Funcional & Mobilidade",
      tag: "Piso de absorção de impacto",
      description:
        "Pista sintética amortecida, tatames de alta densidade, kettlebells, fitas de suspensão e acessórios para trabalho de core e estabilidade.",
      image: "assets/img/instalacao-funcional.svg",
      imageAlt: "Ilustração da Zona Funcional e Mobilidade"
    },
    {
      title: "Vestiários Individuais & Lounge",
      tag: "Pronto para ir direto ao trabalho",
      description:
        "Cabines de banho privativas, bancadas iluminadas, secadores, armários seguros e lounge com café passado e água filtrada gelada.",
      image: "assets/img/instalacao-vestiarios.svg",
      imageAlt: "Ilustração dos Vestiários Individuais e Lounge de Convivência"
    }
  ]
};
