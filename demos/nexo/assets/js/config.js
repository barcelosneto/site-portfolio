/**
 * NEXO ACADEMY — Arquivo Central de Configuração (assets/js/config.js)
 * =====================================================================
 * AVISO DE DEMONSTRAÇÃO:
 * Todos os dados de marca, contatos, preços, turmas e instrutores neste arquivo
 * são exemplos fictícios para fins de demonstração de layout e funcionalidade.
 * Substitua pelos dados reais da instituição antes de publicar em produção.
 */

window.NEXO_CONFIG = {
  isDemo: true,
  brand: {
    name: "Nexo Academy",
    tagline: "Cursos Livres de Tecnologia, Dados e Inteligência Artificial",
    legalNote: "Cursos livres de capacitação e atualização profissional (Lei nº 9.394/96). Não conferem grau acadêmico superior nem exigem reconhecimento pelo MEC.",
    demoBannerText: "AMBIENTE DE DEMONSTRAÇÃO: Marca, valores de investimento, datas de turmas, contatos e perfis docentes exibidos nesta página são exemplos ilustrativos para validação comercial."
  },
  theme: {
    petrolBlue: "#081C2E",
    violet: "#7C3AED",
    cyan: "#06B6D4"
  },
  contact: {
    whatsappNumber: "5511999990000", // Número fictício de demonstração
    whatsappDisplay: "+55 (11) 99999-0000 (Demo)",
    email: "contato@nexoacademy.exemplo.com.br",
    address: "Av. Paulista, 1000 — Conj. 1204 (Endereço Demonstrativo), Bela Vista, São Paulo/SP",
    hours: "Segunda a Sexta, das 09h às 20h | Sábados, das 09h às 13h",
    siteUrl: "https://usuario.github.io/cursos-tecnologia/"
  },
  courses: [
    {
      id: "python-dados-automacao",
      title: "Python para Dados e Automação de Rotinas",
      category: "Python",
      level: "Iniciante",
      modality: "Ao vivo online",
      workload: "48 horas",
      durationWeeks: "8 semanas",
      demoPrice: "R$ 1.290,00 (valor demonstrativo)",
      demoInstallments: "ou 6x de R$ 215,00 sem juros (exemplo)",
      badge: "Alta procura",
      image: "assets/img/curso-python-dados.svg",
      imageAlt: "Ilustração de código Python com biblioteca Pandas e pipeline de dados",
      shortDescription: "Domine lógica de programação em Python, manipulação de grandes bases com Pandas e scripts que eliminam tarefas repetitivas em planilhas e relatórios.",
      prerequisites: "Conhecimentos básicos de informática e familiaridade com planilhas eletrônicas. Não exige experiência prévia em programação.",
      tools: ["Python 3.12", "Pandas", "Jupyter Lab", "OpenPyXL", "VS Code", "Git Básico"],
      portfolioProject: "Pipeline automatizado que consolida 50 arquivos de vendas regionais, higieniza inconsistências e gera relatório executivo em Excel e PDF.",
      syllabus: [
        {
          module: "Módulo 1 — Fundamentos de Python Aplicado (12h)",
          topics: "Tipos de dados, estruturas condicionais, laços de repetição, funções modulares, tratamento de erros e leitura de arquivos CSV/JSON."
        },
        {
          module: "Módulo 2 — Análise e Limpeza de Dados com Pandas (14h)",
          topics: "DataFrames, séries temporais, tratamento de valores ausentes, cruzamento de tabelas (merge/join), agregações e tabelas dinâmicas via código."
        },
        {
          module: "Módulo 3 — Automação de Planilhas e Relatórios (12h)",
          topics: "Integração Python + Excel com OpenPyXL, formatação automática de relatórios, leitura de pastas em lote e disparo de resumos operacionais."
        },
        {
          module: "Módulo 4 — Projeto Guiado de Portfólio e Versionamento (10h)",
          topics: "Arquitetura de projeto reproduzível, documentação técnica no GitHub e revisão individual de código pelos instrutores."
        }
      ]
    },
    {
      id: "excel-avancado-modelagem",
      title: "Excel Avançado, Power Query e Modelagem Executiva",
      category: "Excel",
      level: "Intermediário",
      modality: "Híbrido",
      workload: "36 horas",
      durationWeeks: "6 semanas",
      demoPrice: "R$ 980,00 (valor demonstrativo)",
      demoInstallments: "ou 6x de R$ 163,33 sem juros (exemplo)",
      badge: "Essencial Corporativo",
      image: "assets/img/curso-excel-modelagem.svg",
      imageAlt: "Ilustração de planilha executiva no Excel com fórmulas avançadas e indicadores",
      shortDescription: "Construa modelos financeiros auditáveis, automatize importações de dados com Power Query e domine funções matriciais dinâmicas sem depender de gambiarras.",
      prerequisites: "Domínio de operações básicas no Excel (soma, média, formatação simples e criação de gráficos elementares).",
      tools: ["Microsoft Excel 365", "Power Query (Linguagem M)", "Matrizes Dinâmicas", "Tabelas Dinâmicas", "VBA Essencial"],
      portfolioProject: "Simulador de DRE e Fluxo de Caixa com múltiplos cenários macroeconômicos, atualizado automaticamente via Power Query.",
      syllabus: [
        {
          module: "Módulo 1 — Funções Modernas e Matrizes Dinâmicas (10h)",
          topics: "PROCX, ÍNDICE+CORRESP avançado, FILTRO, CLASSIFICAR, ÚNICO, LET, LAMBDA e estruturação de tabelas corporativas."
        },
        {
          module: "Módulo 2 — ETL e Automação com Power Query (10h)",
          topics: "Conexão com múltiplas fontes (pastas, CSV, web), transformação de colunas, unpivot, mesclagem de consultas e atualização em um clique."
        },
        {
          module: "Módulo 3 — Modelagem de Negócios e Simulação de Cenários (8h)",
          topics: "Boas práticas de modelagem financeira, validação de dados, atingir meta, tabela de dados, auditoria de fórmulas e proteção executiva."
        },
        {
          module: "Módulo 4 — Dashboards em Excel e Macros Enxutas (8h)",
          topics: "Design de painéis gerenciais limpos, controles de formulário, gravação e edição pontual de macros em VBA para rotinas recorrentes."
        }
      ]
    },
    {
      id: "powerbi-storytelling-dados",
      title: "Power BI, DAX e Storytelling com Dados",
      category: "Power BI",
      level: "Intermediário",
      modality: "Ao vivo online",
      workload: "44 horas",
      durationWeeks: "7 semanas",
      demoPrice: "R$ 1.190,00 (valor demonstrativo)",
      demoInstallments: "ou 6x de R$ 198,33 sem juros (exemplo)",
      badge: "Foco em Portfólio",
      image: "assets/img/curso-powerbi-storytelling.svg",
      imageAlt: "Ilustração de painel executivo no Power BI com gráficos e linguagem DAX",
      shortDescription: "Vá além de gráficos soltos: aprenda modelagem dimensional Star Schema, medidas complexas em DAX e narrativa visual para apoiar tomadas de decisão.",
      prerequisites: "Noções de lógica de planilhas (Excel ou Google Sheets) e familiaridade com indicadores básicos de negócios.",
      tools: ["Power BI Desktop", "Power Query", "Linguagem DAX", "Power BI Service", "Figma para Layouts BI"],
      portfolioProject: "Painel Executivo de Performance Comercial e Logística com análise de coorte, YoY, metas dinâmicas e navegação por indicadores.",
      syllabus: [
        {
          module: "Módulo 1 — ETL no Power Query e Modelagem Star Schema (12h)",
          topics: "Tabelas fato e dimensão, cardinalidade, direção de filtro, tabela calendário profissional e higienização de bases."
        },
        {
          module: "Módulo 2 — Dominando a Linguagem DAX (14h)",
          topics: "Contexto de linha e contexto de filtro, CALCULATE, FILTER, ALL, funções iteradoras (SUMX, AVERAGEX) e inteligência de tempo (YTD, YoY, MoM)."
        },
        {
          module: "Módulo 3 — Visualização de Dados e UI/UX para BI (10h)",
          topics: "Hierarquia visual, escolha correta de gráficos, tooltips personalizados, drill-through, indicadores (bookmarks) e acessibilidade cromática."
        },
        {
          module: "Módulo 4 — Publicação, Governança e Portfólio (8h)",
          topics: "Workspaces no Power BI Service, segurança em nível de linha (RLS), agendamento de atualização e apresentação executiva do projeto."
        }
      ]
    },
    {
      id: "ia-aplicada-prompt-engineering",
      title: "Inteligência Artificial Aplicada & Prompt Engineering",
      category: "IA",
      level: "Iniciante",
      modality: "Ao vivo online",
      workload: "32 horas",
      durationWeeks: "5 semanas",
      demoPrice: "R$ 1.090,00 (valor demonstrativo)",
      demoInstallments: "ou 6x de R$ 181,66 sem juros (exemplo)",
      badge: "Tendência Prática",
      image: "assets/img/curso-ia-aplicada.svg",
      imageAlt: "Ilustração de arquitetura de Prompt Engineering e fluxo de Inteligência Artificial",
      shortDescription: "Utilize modelos de linguagem (LLMs) com método técnico: estruture prompts reproduzíveis, crie fluxos de análise de documentos e integre IA com responsabilidade e segurança.",
      prerequisites: "Não exige programação. Recomendado para analistas, gestores, estudantes e profissionais que desejam aplicar IA no trabalho real.",
      tools: ["Modelos LLM (OpenAI / Claude / Gemini)", "Prompt Templates", "JSON Schema", "Automação No-Code/Low-Code", "Python Assistido por IA"],
      portfolioProject: "Sistema de triagem e sumarização estruturada de relatórios operacionais e chamados técnicos com validação de qualidade e mitigação de alucinações.",
      syllabus: [
        {
          module: "Módulo 1 — Fundamentos de LLMs e Engenharia de Prompt (8h)",
          topics: "Como funcionam tokens, janela de contexto, temperatura, Zero-Shot, Few-Shot, Chain-of-Thought e estruturação de instruções claras."
        },
        {
          module: "Módulo 2 — IA para Análise de Dados, Textos e Planilhas (8h)",
          topics: "Extração de dados não estruturados para tabelas/JSON, geração e revisão de fórmulas Excel/SQL/DAX e síntese executiva de documentos."
        },
        {
          module: "Módulo 3 — Automação de Fluxos de Trabalho e Agentes (8h)",
          topics: "Encadeamento de prompts, bases de conhecimento (conceitos práticos de RAG), padronização de saídas e avaliação de consistência."
        },
        {
          module: "Módulo 4 — Governança, Privacidade (LGPD) e Projeto Final (8h)",
          topics: "Boas práticas de segurança da informação, anonimização de dados sensíveis antes do uso em IA e entrega do projeto aplicado."
        }
      ]
    },
    {
      id: "sql-modelagem-analitica-python",
      title: "SQL Analítico e Integração com Python para BI",
      category: "Python",
      level: "Intermediário",
      modality: "Ao vivo online",
      workload: "40 horas",
      durationWeeks: "6 semanas",
      demoPrice: "R$ 1.240,00 (valor demonstrativo)",
      demoInstallments: "ou 6x de R$ 206,66 sem juros (exemplo)",
      badge: "Carreira Dados",
      image: "assets/img/curso-sql-analytics.svg",
      imageAlt: "Ilustração de consultas SQL avançadas integradas com scripts em Python",
      shortDescription: "Extraia dados diretamente de bancos relacionais com consultas SQL performáticas, Window Functions, CTEs e conecte seus resultados ao Python e Power BI.",
      prerequisites: "Lógica básica de dados ou conhecimento inicial em Excel/Python.",
      tools: ["PostgreSQL", "SQLite", "DBeaver", "Python SQLAlchemy", "Pandas"],
      portfolioProject: "Análise de Retenção (Cohort) e Lifetime Value (LTV) de clientes extraída via SQL e automatizada em notebook Python.",
      syllabus: [
        {
          module: "Módulo 1 — Consultas Relacionais e Joins Complexos (10h)",
          topics: "Modelagem relacional, filtros compostos, agregações, INNER/LEFT/FULL JOIN e tratamento de valores nulos."
        },
        {
          module: "Módulo 2 — Subqueries, CTEs e Window Functions (12h)",
          topics: "WITH clauses legíveis, ROW_NUMBER, RANK, LAG, LEAD e médias móveis diretamente no banco de dados."
        },
        {
          module: "Módulo 3 — Integração SQL + Python + Power BI (10h)",
          topics: "Conexão segura via SQLAlchemy, parametrização de queries e alimentação de painéis analíticos."
        },
        {
          module: "Módulo 4 — Projeto de Análise de Negócios Ponta a Ponta (8h)",
          topics: "Construção de repositório técnico documentado respondendo a 10 perguntas estratégicas de negócio."
        }
      ]
    },
    {
      id: "automacao-inteligente-python-ia",
      title: "Automação de Processos com Python e APIs de IA",
      category: "IA",
      level: "Avançado",
      modality: "Presencial executivo",
      workload: "42 horas",
      durationWeeks: "7 semanas",
      demoPrice: "R$ 1.490,00 (valor demonstrativo)",
      demoInstallments: "ou 6x de R$ 248,33 sem juros (exemplo)",
      badge: "Imersão Avançada",
      image: "assets/img/curso-automacao-ia.svg",
      imageAlt: "Ilustração de integração entre scripts Python, planilhas e APIs de Inteligência Artificial",
      shortDescription: "Projete integrações em Python que consomem APIs REST e modelos de IA para classificar dados, auditar documentos e alimentar sistemas corporativos.",
      prerequisites: "Conhecimento básico ou intermediário em Python (variáveis, funções, listas e dicionários).",
      tools: ["Python 3.12", "Requests / HTTPX", "Pydantic", "APIs de LLMs", "Git & Ambientes Virtuais"],
      portfolioProject: "Orquestrador em Python que lê planilhas e documentos brutos, valida esquemas de dados com Pydantic e gera pareceres estruturados via API.",
      syllabus: [
        {
          module: "Módulo 1 — Consumo de APIs REST e Validação de Dados (10h)",
          topics: "Requisições HTTP, autenticação segura por variáveis de ambiente, tratamento de timeouts e validação com Pydantic."
        },
        {
          module: "Módulo 2 — Integração Programática com Modelos de IA (12h)",
          topics: "Chamadas estruturadas via SDK/API, controle de custos por token, saída estruturada em JSON e logs de auditoria."
        },
        {
          module: "Módulo 3 — Pipelines Locais e Agendamento de Rotinas (10h)",
          topics: "Processamento em lote, integração com arquivos Excel/CSV e criação de interfaces simples de linha de comando (CLI)."
        },
        {
          module: "Módulo 4 — Projeto de Engenharia de Automação (10h)",
          topics: "Desenvolvimento, testes e documentação de um pipeline completo aplicável ao contexto profissional do aluno."
        }
      ]
    }
  ],
  tracks: [
    {
      id: "trilha-analista-dados",
      name: "Trilha Analista de Dados & Business Intelligence",
      subtitle: "Para quem deseja sair das planilhas manuais e dominar a construção de indicadores, consultas e painéis executivos.",
      totalHours: "120 horas somadas",
      targetProfile: "Estudantes e profissionais de Administração, Finanças, Logística, Comercial e Marketing em transição ou evolução técnica.",
      steps: [
        {
          stepId: "ad-1",
          order: "Etapa 01",
          title: "Excel Avançado, Power Query e Modelagem Executiva",
          hours: "36h",
          outcome: "Domínio de base tabular, limpeza de dados com Power Query e construção de modelos financeiros auditáveis."
        },
        {
          stepId: "ad-2",
          order: "Etapa 02",
          title: "Power BI, DAX e Storytelling com Dados",
          hours: "44h",
          outcome: "Modelagem Star Schema, cálculos de inteligência de tempo em DAX e publicação de dashboards gerenciais."
        },
        {
          stepId: "ad-3",
          order: "Etapa 03",
          title: "SQL Analítico e Integração com Python para BI",
          hours: "40h",
          outcome: "Autonomia para consultar bancos relacionais com CTEs/Window Functions e cruzar bases volumosas com Python."
        }
      ]
    },
    {
      id: "trilha-automacao-ia",
      name: "Trilha Automação Corporativa com Python & IA",
      subtitle: "Para quem busca eliminar trabalho operacional repetitivo combinando scripts em Python e engenharia de prompt estruturada.",
      totalHours: "122 horas somadas",
      targetProfile: "Analistas de Operações, TI, Produto, Atendimento, Jurídico e profissionais que lidam com alto volume de documentos e dados.",
      steps: [
        {
          stepId: "ai-1",
          order: "Etapa 01",
          title: "Inteligência Artificial Aplicada & Prompt Engineering",
          hours: "32h",
          outcome: "Criação de prompts padronizados, extração de informações e uso ético/seguro de LLMs no ambiente corporativo."
        },
        {
          stepId: "ai-2",
          order: "Etapa 02",
          title: "Python para Dados e Automação de Rotinas",
          hours: "48h",
          outcome: "Construção de scripts em Python e Pandas para processar planilhas, relatórios e arquivos em poucos segundos."
        },
        {
          stepId: "ai-3",
          order: "Etapa 03",
          title: "Automação de Processos com Python e APIs de IA",
          hours: "42h",
          outcome: "Integração de código Python com APIs REST e modelos de IA com validação estruturada de dados."
        }
      ]
    }
  ],
  cohorts: [
    {
      code: "TURMA-PY-01 (Demo)",
      courseId: "python-dados-automacao",
      courseName: "Python para Dados e Automação de Rotinas",
      modality: "Ao vivo online",
      schedule: "Terças e Quintas, das 19h30 às 22h30",
      startDate: "10/11/2026 (Data de exemplo)",
      status: "Inscrições abertas",
      spotsLabel: "Turma reduzida (máx. 22 alunos)"
    },
    {
      code: "TURMA-EX-02 (Demo)",
      courseId: "excel-avancado-modelagem",
      courseName: "Excel Avançado, Power Query e Modelagem Executiva",
      modality: "Híbrido (SP + Online)",
      schedule: "Sábados, das 09h00 às 15h00",
      startDate: "14/11/2026 (Data de exemplo)",
      status: "Inscrições abertas",
      spotsLabel: "Últimas vagas demonstrativas"
    },
    {
      code: "TURMA-BI-03 (Demo)",
      courseId: "powerbi-storytelling-dados",
      courseName: "Power BI, DAX e Storytelling com Dados",
      modality: "Ao vivo online",
      schedule: "Segundas e Quartas, das 19h30 às 22h30",
      startDate: "16/11/2026 (Data de exemplo)",
      status: "Inscrições abertas",
      spotsLabel: "Turma reduzida (máx. 22 alunos)"
    },
    {
      code: "TURMA-IA-04 (Demo)",
      courseId: "ia-aplicada-prompt-engineering",
      courseName: "Inteligência Artificial Aplicada & Prompt Engineering",
      modality: "Ao vivo online",
      schedule: "Terças e Quintas, das 19h00 às 22h00",
      startDate: "24/11/2026 (Data de exemplo)",
      status: "Inscrições abertas",
      spotsLabel: "Início próximo (exemplo)"
    },
    {
      code: "TURMA-SQL-05 (Demo)",
      courseId: "sql-modelagem-analitica-python",
      courseName: "SQL Analítico e Integração com Python para BI",
      modality: "Ao vivo online",
      schedule: "Segundas e Quartas, das 19h30 às 22h30",
      startDate: "02/12/2026 (Data de exemplo)",
      status: "Lista de interesse",
      spotsLabel: "Pré-reserva aberta"
    },
    {
      code: "TURMA-AUT-06 (Demo)",
      courseId: "automacao-inteligente-python-ia",
      courseName: "Automação de Processos com Python e APIs de IA",
      modality: "Presencial executivo",
      schedule: "Sábados, das 09h00 às 16h00",
      startDate: "05/12/2026 (Data de exemplo)",
      status: "Lista de interesse",
      spotsLabel: "Turma executiva presencial"
    }
  ],
  projects: [
    {
      title: "Consolidador Automatizado de Operações em Python",
      category: "Python & Pandas",
      courseRef: "Python para Dados e Automação de Rotinas",
      image: "assets/img/projeto-pipeline-python.svg",
      imageAlt: "Tela ilustrativa do projeto de pipeline de dados em Python",
      description: "Script completo que lê dezenas de planilhas regionais com formatos heterogêneos, padroniza colunas, audita divergências de cadastro e exporta um banco consolidado limpo em segundos.",
      deliverables: ["Código documentado em repositório Git", "Relatório automático em Excel formatado", "Log de auditoria de inconsistências"]
    },
    {
      title: "Painel Executivo de DRE, Margem e Metas no Power BI",
      category: "Power BI & Excel",
      courseRef: "Power BI, DAX e Storytelling com Dados",
      image: "assets/img/projeto-dashboard-executivo.svg",
      imageAlt: "Tela ilustrativa do dashboard financeiro e comercial no Power BI",
      description: "Construção de modelo Star Schema partindo de bases transacionais brutas, com medidas DAX de análise horizontal/vertical, variação YoY e simulação de impacto de descontos na margem líquida.",
      deliverables: ["Arquivo .pbix estruturado", "Dicionário de medidas DAX", "Guia de storytelling para apresentação"]
    },
    {
      title: "Classificador e Sumarizador de Demandas com IA",
      category: "IA & Engenharia de Prompt",
      courseRef: "Inteligência Artificial Aplicada & Prompt Engineering",
      image: "assets/img/projeto-assistente-ia.svg",
      imageAlt: "Tela ilustrativa do fluxo de triagem de chamados com Inteligência Artificial",
      description: "Fluxo estruturado com templates de prompt e validação JSON Schema para categorizar solicitações de clientes por urgência, setor responsável e resumo executivo, respeitando diretrizes de privacidade.",
      deliverables: ["Biblioteca de prompts testados", "Esquema JSON de saída padronizada", "Checklist de validação humana e LGPD"]
    }
  ],
  instructors: [
    {
      name: "Lucas Andrade (Perfil Demonstrativo)",
      role: "Instrutor de Python & Engenharia de Dados",
      bio: "Perfil fictício de exemplo: Especialista em automação de dados e arquitetura analítica com atuação em projetos de varejo e finanças. Focado em ensinar programação limpa para quem está começando.",
      tags: ["Python", "Pandas", "SQL", "Automação"],
      avatar: "assets/img/instrutor-1.svg"
    },
    {
      name: "Mariana Vasconcelos (Perfil Demonstrativo)",
      role: "Instrutora de Power BI & Data Storytelling",
      bio: "Perfil fictício de exemplo: Consultora de Business Intelligence com experiência na estruturação de indicadores executivos, modelagem dimensional Star Schema e design de painéis de alta legibilidade.",
      tags: ["Power BI", "DAX", "Star Schema", "Storytelling"],
      avatar: "assets/img/instrutor-2.svg"
    },
    {
      name: "Rafael Albuquerque (Perfil Demonstrativo)",
      role: "Instrutor de Excel Avançado & Modelagem Financeira",
      bio: "Perfil fictício de exemplo: Analista de planejamento financeiro (FP&A) com foco em automação via Power Query, construção de DREs dinâmicos e eliminação de retrabalho operacional em planilhas.",
      tags: ["Excel 365", "Power Query", "Modelagem", "VBA"],
      avatar: "assets/img/instrutor-3.svg"
    },
    {
      name: "Helena Duarte (Perfil Demonstrativo)",
      role: "Instrutora de IA Aplicada & Prompt Engineering",
      bio: "Perfil fictício de exemplo: Pesquisadora e consultora em adoção corporativa de Inteligência Artificial Generativa, desenho de fluxos assistidos por LLMs e boas práticas de governança de dados.",
      tags: ["Prompt Engineering", "LLMs", "Automação IA", "Governança"],
      avatar: "assets/img/instrutor-4.svg"
    }
  ],
  faqs: [
    {
      question: "Preciso saber programar antes de entrar nos cursos iniciais?",
      answer: "Não. Os cursos de nível Iniciante (como Python para Dados e Automação e IA Aplicada & Prompt Engineering) partem do absoluto zero, explicando passo a passo a lógica e as ferramentas necessárias. Para cursos Intermediários ou Avançados, os pré-requisitos estão detalhados de forma transparente na ementa de cada formação."
    },
    {
      question: "Os cursos garantem emprego ou salário específico após a conclusão?",
      answer: "Não fazemos promessas irreais de emprego garantido ou ganhos financeiros fixos, pois a colocação profissional depende da dedicação individual, contexto de mercado e trajetória de cada aluno. Nosso compromisso real é fornecer formação técnica rigorosa, projetos práticos aplicáveis e orientação para que você construa um portfólio verificável."
    },
    {
      question: "Como funcionam as aulas ao vivo online e o suporte a dúvidas?",
      answer: "Nas turmas ao vivo online, os encontros acontecem em tempo real com compartilhamento de tela, resolução de exercícios passo a passo e interação direta com o instrutor. Todas as bases de dados, scripts e materiais de apoio ficam organizados para prática."
    },
    {
      question: "Qual é a natureza do certificado emitido?",
      answer: "Nossos treinamentos enquadram-se na modalidade de Cursos Livres de Capacitação e Atualização Profissional (conforme a Lei nº 9.394/96). Ao concluir os projetos práticos e atingir a frequência mínima, o aluno recebe um Certificado de Conclusão de Curso Livre com discriminação da carga horária e conteúdo programático, válido para horas complementares, currículo e processos seletivos corporativos (não se trata de graduação ou pós-graduação reconhecida pelo MEC)."
    },
    {
      question: "Como funciona a inscrição através desta página?",
      answer: "Esta página não realiza cobrança automática nem exige cartão de crédito. Ao preencher o formulário de interesse com seu curso e turma preferidos, você escolhe enviar seus dados diretamente para nosso atendimento via WhatsApp ou E-mail para receber o programa detalhado, tirar dúvidas técnicas e alinhar as condições de matrícula."
    },
    {
      question: "Posso contratar turmas fechadas (in-company) para a equipe da minha empresa?",
      answer: "Sim! Todos os cursos de Python, Excel, Power BI e Inteligência Artificial podem ter seus estudos de caso adaptados para as bases de dados e desafios reais da sua organização. Utilize o formulário de interesse selecionando a opção corporativa ou mencione sua necessidade na mensagem."
    }
  ]
};
