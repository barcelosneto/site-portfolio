/**
 * ARQUIVO CENTRAL DE CONFIGURAÇÃO DO SITE E PORTFÓLIO
 * ====================================================
 * Edite os valores abaixo antes de publicar seu site em produção.
 * Nenhuma informação pessoal, credencial ou número real foi inventado por padrão.
 *
 * IMPORTANTE SOBRE O GITHUB PAGES:
 * - Se publicar em https://USUARIO.github.io/NOME-DO-REPOSITORIO/, defina:
 *   basePath: "/NOME-DO-REPOSITORIO" (sem barra no final)
 * - Se publicar na raiz de um domínio próprio ou https://USUARIO.github.io/, defina:
 *   basePath: ""
 * O sistema também usa caminhos relativos inteligentes (data-root) para funcionar
 * automaticamente em qualquer subdiretório ou servidor local!
 */

window.SITE_CONFIG = {
  // Identidade Comercial Configurável
  brandName: "Barcelos Neto — Desenvolvimento Web",
  brandShortName: "Barcelos Neto",
  professionalIdentity: "Barcelos Neto — Desenvolvedor Full Stack",
  brandTagline: "Desenvolvedor Full Stack",
  brandSlogan: "Sites profissionais e sistemas web que transformam visitas em oportunidades",
  brandDescription:
    "Desenvolvimento Web & Full Stack: criação de landing pages, sites institucionais, sistemas web com APIs e banco de dados de alta performance, acessíveis e otimizados para conversão.",
  locationLabel: "Atendimento remoto para todo o Brasil",
  businessStatusNote: "Barcelos Neto — Desenvolvedor Full Stack | Configuração central em config/site-config.js",

  // Configuração de URL e Caminho Base (GitHub Pages)
  productionUrl: "https://barcelosneto.github.io/site-portfolio",
  basePath: "/site-portfolio",

  // Canais de Contato
  contact: {
    // E-mail comercial confirmado
    email: "pedrobarcelos1980@gmail.com",
    emailStatusLabel: "pedrobarcelos1980@gmail.com",
    isDemoEmail: false,

    // WhatsApp no formato internacional apenas dígitos (Ex.: "5511999999999")
    // Mantido vazio "" enquanto está "A confirmar": os botões de WhatsApp informam de forma transparente sem usar número falso.
    whatsappNumber: "",
    whatsappStatusLabel: "A confirmar",
    whatsappDefaultMessage:
      "Olá, Barcelos Neto! Visitei seu site e gostaria de solicitar um orçamento para um projeto web.",

    // Horário de atendimento comercial exibido na página de contato
    serviceHours: "Segunda a sexta, das 9h às 18h (horário de Brasília)"
  },

  // Redes Sociais (Apenas URLs confirmadas são ativadas; itens "A confirmar" ficam vazios até definição)
  socialLinks: {
    github: "https://github.com/barcelosneto",
    linkedin: "https://www.linkedin.com/in/barcelosneto", // Perfil profissional
    instagram: "",
    behance: ""
  },

  // Integração Opcional de Formulário Estático (ex.: Formspree, Getform, Basin)
  formIntegration: {
    providerName: "Cliente de E-mail (mailto:) / Cópia de Rascunho",
    endpointUrl: ""
  },

  // Avisos Jurídicos e de Privacidade
  legal: {
    controllerName: "Barcelos Neto — Desenvolvedor Web",
    controllerDocument: "[CPF/CNPJ — A confirmar antes de produção comercial]",
    controllerEmail: "pedrobarcelos1980@gmail.com",
    lastUpdated: "Outubro de 2026",
    analyticsEnabled: false,
    analyticsProvider: "Nenhum rastreador ou cookie analítico de terceiros ativo"
  },

  // Catálogo de Projetos Demonstrativos do Portfólio
  portfolioProjects: [
    {
      id: "demo-restaurante",
      title: "Sabor & Brasa — Gastronomia Contemporânea",
      category: "gastronomia",
      categoryLabel: "Gastronomia & Reservas",
      typeLabel: "Landing Page + Cardápio Interativo",
      badge: "Projeto Demonstrativo",
      thumbnail: "assets/img/restaurante/thumb-restaurante.webp",
      shortDescription:
        "Interface imersiva para restaurante autoral com fotografia gastronômica real, cardápio filtrável por categoria e restrições alimentares, galeria com lightbox acessível, horários e fluxo rápido de contato.",
      problemSolved:
        "Substitui cardápios em PDF difíceis de ler no celular por uma navegação instantânea, legível e voltada para reservas diretas.",
      deliverables: [
        "Cardápio fotográfico interativo com busca e filtros dietéticos instantâneos",
        "Galeria visual em WebP de carregamento otimizado com modal acessível",
        "Chamada para reserva via WhatsApp ou contato e seção de dúvidas frequentes"
      ],
      technologies: ["HTML5 Semântico", "CSS Grid & Custom Properties", "JavaScript ES6+", "WCAG AA"],
      demoPath: "demos/restaurante/index.html",
      previewTheme: "amber",
      featured: true
    },
    {
      id: "demo-clinica",
      title: "Clínica Vitae — Saúde Integrada & Bem-Estar",
      category: "saude",
      categoryLabel: "Saúde & Clínicas",
      typeLabel: "Site Institucional de Especialidades",
      badge: "Projeto Demonstrativo",
      thumbnail: "assets/img/clinica/thumb-clinica.webp",
      shortDescription:
        "Site institucional sereno e acolhedor para clínicas e consultórios, apresentando especialidades, infraestrutura clínica fotografada, orientações de preparo e agendamento transparente.",
      problemSolved:
        "Organiza informações médicas sem jargões confusos, transmite seriedade ética e facilita o primeiro contato do paciente pelo celular.",
      deliverables: [
        "Filtro interativo de especialidades e orientações ao paciente",
        "Apresentação ética de equipe ilustrativa e infraestrutura de atendimento",
        "Avisos claros de conformidade e agendamento assistido via canal direto"
      ],
      technologies: ["HTML5 Semântico", "Design Inclusivo", "JavaScript Modular", "SEO Local"],
      demoPath: "demos/clinica/index.html",
      previewTheme: "teal",
      featured: true
    },
    {
      id: "demo-imobiliaria",
      title: "Horizonte Prime — Consultoria Imobiliária",
      category: "imobiliaria",
      categoryLabel: "Mercado Imobiliário",
      typeLabel: "Catálogo com Filtros & Ficha Técnica",
      badge: "Projeto Demonstrativo",
      thumbnail: "assets/img/imobiliaria/thumb-imobiliaria.webp",
      shortDescription:
        "Plataforma de vitrine imobiliária com fotografia arquitetônica real, filtragem combinada por tipo de imóvel, bairro, faixa de valor e quartos, além de modal completo de especificações e galeria.",
      problemSolved:
        "Permite que compradores encontrem imóveis compatíveis em segundos sem recarregar a página, qualificando o contato comercial.",
      deliverables: [
        "Busca multicritério em tempo real (tipo, bairro, faixa de preço e dormitórios)",
        "Modal de detalhes técnicos do imóvel com galeria fotográfica navegável por teclado",
        "Botão de solicitação de visita contextualizado com o código do imóvel"
      ],
      technologies: ["HTML5", "CSS Moderno", "Filtragem Client-Side", "Acessibilidade Teclado"],
      demoPath: "demos/imobiliaria/index.html",
      previewTheme: "indigo",
      featured: true
    },
    {
      id: "modelo-advocacia",
      title: "Estrutura Executiva — Consultoria Jurídica & Contábil",
      category: "corporativo",
      categoryLabel: "Serviços Corporativos",
      typeLabel: "Arquitetura Institucional B2B",
      badge: "Conceito Arquitetural",
      thumbnail: "assets/img/corporativo/thumb-corporativo.webp",
      shortDescription:
        "Arquitetura enxuta para escritórios de consultoria que precisam apresentar áreas de atuação, governança e formulário de triagem com sobriedade e rapidez.",
      problemSolved:
        "Posiciona serviços intelectuais com clareza e autoridade técnica, evitando layouts poluídos ou excessivamente comerciais.",
      deliverables: [
        "Seções de áreas de atuação com leitura escaneável",
        "Formulário de triagem qualificada por demanda",
        "Otimização extrema de performance e metadados técnicos"
      ],
      technologies: ["HTML5", "CSS3", "SEO Técnico", "Zero Dependências"],
      demoPath: "servicos/index.html#institucional",
      previewTheme: "slate",
      featured: false
    },
    {
      id: "modelo-infoproduto",
      title: "LaunchPad — Página de Alta Conversão para Eventos & Cursos",
      category: "landing-page",
      categoryLabel: "Landing Pages",
      typeLabel: "Página de Captura e Vendas",
      badge: "Conceito Arquitetural",
      thumbnail: "assets/img/launchpad/thumb-launchpad.webp",
      shortDescription:
        "Estrutura focada em campanha de tráfego pago ou orgânico com proposta de valor imediata, programação em módulos, perguntas frequentes e carregamento instantâneo.",
      problemSolved:
        "Reduz a taxa de rejeição em conexões móveis lentas graças ao código puro sem frameworks pesados.",
      deliverables: [
        "Hero section com hierarquia visual orientada à ação",
        "Acordeão de módulos e objeções frequentes",
        "Estrutura pronta para parâmetros UTM e compartilhamento social"
      ],
      technologies: ["HTML5", "CSS3", "Performance Mobile", "Open Graph"],
      demoPath: "servicos/index.html#landing-pages",
      previewTheme: "blue",
      featured: false
    },
    {
      id: "modelo-portfolio-autoral",
      title: "MonoGrid — Portfólio para Arquitetos, Designers e Criativos",
      category: "portfolio",
      categoryLabel: "Portfólios Profissionais",
      typeLabel: "Vitrine Autoral de Projetos",
      badge: "Conceito Arquitetural",
      thumbnail: "assets/img/monogrid/thumb-monogrid.webp",
      shortDescription:
        "Vitrine minimalista com foco em apresentação visual de estudos de caso, ficha técnica de projetos e solicitação direta de proposta.",
      problemSolved:
        "Destaca o trabalho autoral em tela cheia sem distrações, mantendo navegação fluida em qualquer dispositivo.",
      deliverables: [
        "Grade filtrável por tipologia de projeto",
        "Páginas ou modais de estudo de caso detalhado",
        "Modo claro e escuro nativo com transição suave"
      ],
      technologies: ["HTML5", "CSS Grid", "Temas Claro/Escuro", "Fotografia WebP"],
      demoPath: "servicos/index.html#portfolios",
      previewTheme: "cyan",
      featured: false
    },
    {
      id: "demo-petshop",
      title: "Pata & Prosa — Pet Shop & Clínica Veterinária",
      category: "petshop",
      categoryLabel: "Pet Shop & Veterinária",
      typeLabel: "Simulador de Serviços + Agendamento",
      badge: "Demo Interativa Completa",
      thumbnail: "assets/img/petshop/thumb-petshop.webp",
      shortDescription:
        "Interface dinâmica para pet shops e clínicas veterinárias com simulador instantâneo de banho, tosa e vacinas por porte do pet, além de fluxo rápido de pré-agendamento.",
      problemSolved:
        "Resolve a lentidão no atendimento por mensagens ao calcular orçamentos prévios e organizar solicitações com raça, porte e necessidades especiais do animal.",
      deliverables: [
        "Simulador interativo de pacotes de estética animal e consultas",
        "Grade de seleção de horários e pré-agendamento responsivo",
        "Encaminhamento estruturado dos dados do pet para atendimento comercial"
      ],
      technologies: ["HTML5 Semântico", "CSS Grid", "JavaScript Modular", "Acessibilidade"],
      demoPath: "demos/petshop/index.html",
      status: "disponivel",
      previewTheme: "emerald",
      featured: false
    },
    {
      id: "demo-academia",
      title: "Pulso Fit — Academia & Treinamento Personalizado",
      category: "fitness",
      categoryLabel: "Fitness & Academias",
      typeLabel: "Comparador de Planos + Captação de Alunos",
      badge: "Demo Interativa Completa",
      thumbnail: "assets/img/academia/thumb-academia.webp",
      shortDescription:
        "Página de alta conversão para academias e estúdios fitness com grade horária de modalidades (spinning, pilates, cross), comparador de planos e passe livre experimental.",
      problemSolved:
        "Converte visitantes em alunos através de apresentação transparente de valores, sem pegadinhas contratuais, e agendamento instantâneo de aula experimental.",
      deliverables: [
        "Tabela comparativa interativa de planos com chave seletora mensal/anual",
        "Grade horária filtrável por modalidade e nível de intensidade",
        "Formulário enxuto de captação de leads para aula experimental gratuita"
      ],
      technologies: ["HTML5", "CSS Moderno", "Microinterações JS", "Conversão Mobile"],
      demoPath: "demos/academia/index.html",
      status: "disponivel",
      previewTheme: "orange",
      featured: false
    },
    {
      id: "demo-nexo",
      title: "Nexo Academy — Cursos & Treinamentos de Tecnologia",
      category: "educacao",
      categoryLabel: "Educação & Tecnologia",
      typeLabel: "Catálogo de Cursos + Comparador de Trilhas",
      badge: "Demo Interativa Completa",
      thumbnail: "assets/img/nexo/thumb-nexo.webp",
      shortDescription:
        "Plataforma educacional para escolas técnicas e treinamentos corporativos com busca em tempo real sem acentos, detalhamento de ementa e comparador lado a lado.",
      problemSolved:
        "Facilita a decisão de matrícula ao permitir comparar carga horária, tecnologias abordadas e projetos práticos de cada formação com clareza total.",
      deliverables: [
        "Busca e filtros multicritério por nível de experiência e tecnologia",
        "Comparador visual de módulos e certificações de formação",
        "Layout escaneável otimizado para retenção e clareza didática"
      ],
      technologies: ["HTML5", "CSS3 Flex/Grid", "Busca Instantânea Client-Side", "UI Educacional"],
      demoPath: "demos/nexo/index.html",
      status: "disponivel",
      previewTheme: "indigo",
      featured: false
    },
    {
      id: "demo-linhaviva",
      title: "Linha Viva — Arquitetura Contemporânea & Interiores",
      category: "arquitetura",
      categoryLabel: "Arquitetura & Interiores",
      typeLabel: "Vitrine de Obras + Comparador Antes/Depois",
      badge: "Demo Interativa Completa",
      thumbnail: "assets/img/linhaviva/thumb-linhaviva.webp",
      shortDescription:
        "Portfólio visual para escritórios de arquitetura e design de interiores com controle deslizante de comparação antes/depois da reforma e triagem de briefing.",
      problemSolved:
        "Destaca a transformação real realizada nos imóveis e qualifica contatos ao coletar tipo de obra, metragem e estilo desejado no primeiro contato.",
      deliverables: [
        "Slider interativo de comparação visual antes e depois da reforma",
        "Ficha técnica com memorial descritivo de materiais e fornecedores",
        "Questionário inteligente de briefing prévio para orçamento de projeto"
      ],
      technologies: ["HTML5 Semântico", "CSS Grid Avançado", "Slider Interativo", "Design Editorial"],
      demoPath: "demos/linhaviva/index.html",
      status: "disponivel",
      previewTheme: "neutral",
      featured: false
    }
  ]
};
