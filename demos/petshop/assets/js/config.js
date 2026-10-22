/**
 * PATA & PROSA | Pet Shop e Banho & Tosa
 * Arquivo Central de Configuração (assets/js/config.js)
 *
 * Todos os dados de contato, preços estimados, serviços, pacotes,
 * galeria antes/depois, depoimentos e perguntas frequentes são
 * exemplificativos/demonstrativos e podem ser editados neste único arquivo.
 */

window.PATA_PROSA_CONFIG = {
  modoDemonstracao: true,
  avisoDemonstracao:
    "Ambiente de Demonstração: Marca, preços estimados, endereço, contatos e relatos exibidos nesta página são exemplos ilustrativos configuráveis. Não realizamos atendimento clínico ou veterinário.",

  marca: {
    nome: "Pata & Prosa",
    subtitulo: "Pet Shop de Bairro & Estética Afetiva",
    slogan: "Banho e tosa com hora marcada, baixo ruído e respeito ao tempo do seu pet.",
    descricaoCurta:
      "Cuidado de higiene e estética para cães e gatos em ambiente tranquilo, com toalhas individuais esterilizadas e linha dermocosmética hipoalergênica.",
    anoFundacaoIlustrativo: 2021,
    cnpjIlustrativo: "00.000.000/0001-00 (Exemplo Demonstrativo - Substituir)"
  },

  cores: {
    verdeSalviaEscuro: "#4A6B5D",
    verdeSalviaMedio: "#688B7B",
    cremeClaro: "#FAF6F0",
    cremeSecundario: "#F2ECE1",
    coralDestaque: "#E06D53",
    coralEscuro: "#C8553D"
  },

  urls: {
    siteCanonica: "https://SEU-USUARIO.github.io/pet-shop/",
    instagramExemplo: "https://instagram.com/",
    googleMapsBusca: "https://www.google.com/maps"
  },

  contato: {
    whatsappNumero: "5511999990000", // Substituir pelo número real com DDI + DDD
    whatsappExibicao: "(11) 99999-0000 (Exemplo)",
    telefoneFixoExibicao: "(11) 3000-0000 (Exemplo)",
    email: "contato@pataeprosa.exemplo.com.br",
    mensagemPadraoWhatsApp:
      "Olá, equipe da Pata & Prosa! Vi o site e gostaria de consultar disponibilidade de horário para banho e tosa."
  },

  localizacao: {
    identificacaoDemo: "Endereço Ilustrativo Demonstrativo (Configurável)",
    logradouro: "Rua das Magnólias, 240 — Loja B (Endereço de Exemplo)",
    bairro: "Vila Jardim",
    cidadeUf: "São Paulo — SP",
    cep: "00000-000",
    referencia: "A duas quadras da Praça das Árvores • Vaga exclusiva de embarque rápido na porta.",
    horarios: [
      { dias: "Terça a Sexta", horario: "08h30 às 18h30 (com hora marcada)" },
      { dias: "Sábados", horario: "08h30 às 17h00 (com hora marcada)" },
      { dias: "Domingos, Segundas e Feriados", horario: "Fechado para descanso e higienização" }
    ],
    orientacoesChegada: [
      "Traga seu cão sempre na guia e coleira ou peitoral ajustado.",
      "Para felinos, o transporte em caixa rígida ventilada é indispensável para segurança.",
      "Chegue com 5 minutos de antecedência para a avaliação da pelagem junto ao banhista."
    ]
  },

  portes: [
    {
      id: "pequeno",
      rotulo: "Cão Porte Pequeno",
      detalhe: "Até 8 kg (ex.: Shih Tzu, Yorkshire, Maltês, Pinscher, Poodle Toy)",
      especie: "caes"
    },
    {
      id: "medio",
      rotulo: "Cão Porte Médio",
      detalhe: "De 8 a 18 kg (ex.: Cocker, Beagle, Buldogue Francês, Schnauzer, SRD médio)",
      especie: "caes"
    },
    {
      id: "grande",
      rotulo: "Cão Porte Grande",
      detalhe: "De 18 a 35 kg (ex.: Golden Retriever, Labrador, Border Collie, Pastor)",
      especie: "caes"
    },
    {
      id: "gigante",
      rotulo: "Cão Porte Gigante",
      detalhe: "Acima de 35 kg (ex.: Bernese, São Bernardo, Terra Nova, Fila)",
      especie: "caes"
    },
    {
      id: "gato_curto",
      rotulo: "Gato Pelo Curto",
      detalhe: "Felinos de pelagem curta — atendimento em sala exclusiva silenciosa",
      especie: "gatos"
    },
    {
      id: "gato_longo",
      rotulo: "Gato Pelo Longo",
      detalhe: "Felinos de pelagem longa (ex.: Persa, Maine Coon, Angorá, Ragdoll)",
      especie: "gatos"
    }
  ],

  servicos: [
    {
      id: "banho_completo",
      titulo: "Banho Completo & Escovação",
      categoria: "caes",
      categoriasFiltro: ["caes", "gatos"],
      badge: "Mais procurado",
      tempoEstimado: "1h15 a 2h00",
      imagem: "assets/img/servico-banho.svg",
      alt: "Ilustração de cão tomando banho morno com espuma suave na Pata e Prosa",
      resumo:
        "Dupla lavagem com xampu neutro hipoalergênico, condicionamento protetor, limpeza delicada de ouvidos, corte de unhas e secagem com ruído reduzido.",
      inclui: [
        "Xampu e condicionador biodegradáveis hipoalergênicos",
        "Toalha individual esterilizada em lavanderia térmica",
        "Corte de unhas e higienização auricular externa",
        "Escovação completa da pelagem e perfume suave opcional"
      ]
    },
    {
      id: "tosa_higienica",
      titulo: "Banho + Tosa Higiênica",
      categoria: "caes",
      categoriasFiltro: ["caes", "gatos"],
      badge: "Bem-estar diário",
      tempoEstimado: "1h30 a 2h15",
      imagem: "assets/img/servico-tosa-higienica.svg",
      alt: "Ilustração de patinha aparada com cuidado na tosa higiênica",
      resumo:
        "Inclui o banho completo somado ao aparo delicado nos coxins (almofadinhas das patas), região íntima, barriguinha e contorno dos olhos.",
      inclui: [
        "Todos os itens do Banho Completo & Escovação",
        "Aparo seguro entre as almofadinhas das patas (evita escorregões)",
        "Higiene da região abdominal e perianal com lâmina fria",
        "Limpeza e liberação dos pelos ao redor dos olhos"
      ]
    },
    {
      id: "tosa_raca",
      titulo: "Banho + Tosa por Raça / Na Tesoura",
      categoria: "caes",
      categoriasFiltro: ["caes"],
      badge: "Acabamento artesanal",
      tempoEstimado: "2h00 a 3h00",
      imagem: "assets/img/servico-tosa-raca.svg",
      alt: "Ilustração de cãozinho com tosa bebê feita na tesoura",
      resumo:
        "Modelagem personalizada na tesoura ou máquina adaptada à rotina da família: tosa bebê, tosa ursinho ou padrão da raça, sempre priorizando o conforto térmico.",
      inclui: [
        "Banho Completo + Tosa Higiênica inclusos",
        "Acabamento na tesoura para caimento natural da pelagem",
        "Pausas de descanso para pets idosos ou filhotes",
        "Check-in prévio com o tutor sobre o comprimento desejado"
      ]
    },
    {
      id: "hidratacao_dermo",
      titulo: "Banho + Hidratação Botânica",
      categoria: "caes",
      categoriasFiltro: ["caes", "gatos"],
      badge: "Brilho e maciez",
      tempoEstimado: "1h30 a 2h30",
      imagem: "assets/img/servico-hidratacao.svg",
      alt: "Ilustração de frasco de sérum botânico para hidratação da pelagem",
      resumo:
        "Nutrição profunda com máscaras de argan, aveia coloidal ou manteiga de karité para repor lipídios, reduzir nós e devolver a maciez aos fios ressecados.",
      inclui: [
        "Banho Completo incluso + máscara nutritiva de 10 minutos",
        "Fórmula com aveia coloidal calmante para peles sensíveis",
        "Redução de estática, frizz e formação de nós na semana",
        "Escovação final com sérum termoprotetor sem silicone pesado"
      ]
    },
    {
      id: "cuidados_gatos",
      titulo: "Cuidados Exclusivos para Gatos",
      categoria: "gatos",
      categoriasFiltro: ["gatos"],
      badge: "Sala exclusiva felina",
      tempoEstimado: "1h00 a 1h45",
      imagem: "assets/img/servico-gatos.svg",
      alt: "Ilustração de gato calmo recebendo escovação em ambiente silencioso",
      resumo:
        "Horários reservados sem presença de cães na sala, difusor de feromônio sintético relaxante, remoção de subpelo morto e banho morno ou higienização a seco.",
      inclui: [
        "Ambiente isolado acusticamente e livre de odores caninos",
        "Escovação profunda de subpelo (reduz bolas de pelo)",
        "Opção de banho morno calmo ou banho a seco especializado",
        "Corte de pontas de unhas e limpeza delicada de orelhas"
      ]
    },
    {
      id: "pacote_mensal",
      titulo: "Pacotes Mensais & Quinzenais",
      categoria: "pacotes",
      categoriasFiltro: ["pacotes", "caes", "gatos"],
      badge: "Economia até 18%",
      tempoEstimado: "Horário fixo garantido",
      imagem: "assets/img/servico-pacotes.svg",
      alt: "Ilustração de calendário de pacotes recorrentes de banho e higiene",
      resumo:
        "Mantenha a higiene em dia com dia e horário fixos na agenda, tosa higiênica inclusa e hidratação cortesia uma vez por mês.",
      inclui: [
        "Planos Quinzenais (2 banhos/mês) ou Mensais (4 banhos/mês)",
        "1 Tosa Higiênica e 1 Hidratação de Aveia inclusas no ciclo",
        "Mesmo banhista de referência para criar vínculo com o pet",
        "Valores reduzidos em relação ao banho avulso"
      ]
    }
  ],

  // Matriz de preços estimados demonstrativos (em R$) por porte e serviço principal
  matrizOrcamento: {
    pequeno: {
      banho_completo: 65,
      tosa_higienica: 85,
      tosa_raca: 125,
      hidratacao_dermo: 95,
      cuidados_gatos: 85,
      pacote_mensal: 220
    },
    medio: {
      banho_completo: 85,
      tosa_higienica: 110,
      tosa_raca: 155,
      hidratacao_dermo: 120,
      cuidados_gatos: 100,
      pacote_mensal: 290
    },
    grande: {
      banho_completo: 120,
      tosa_higienica: 150,
      tosa_raca: 210,
      hidratacao_dermo: 165,
      cuidados_gatos: 130,
      pacote_mensal: 410
    },
    gigante: {
      banho_completo: 160,
      tosa_higienica: 195,
      tosa_raca: 265,
      hidratacao_dermo: 215,
      cuidados_gatos: 160,
      pacote_mensal: 540
    },
    gato_curto: {
      banho_completo: 80,
      tosa_higienica: 98,
      tosa_raca: 130,
      hidratacao_dermo: 110,
      cuidados_gatos: 85,
      pacote_mensal: 150
    },
    gato_longo: {
      banho_completo: 105,
      tosa_higienica: 128,
      tosa_raca: 165,
      hidratacao_dermo: 140,
      cuidados_gatos: 115,
      pacote_mensal: 198
    }
  },

  adicionaisOrcamento: [
    {
      id: "desembolo_suave",
      nome: "Desembolo cuidadoso de nós leves (até 20 min)",
      valor: 25
    },
    {
      id: "escovacao_dental",
      nome: "Higienização bucal cosmética (com dedeira/creme pet)",
      valor: 18
    },
    {
      id: "mascara_aveia",
      nome: "Upgrade Máscara Calmante de Aveia Coloidal",
      valor: 28
    },
    {
      id: "remocao_subpelo",
      nome: "Cardagem extra para remoção de subpelo solto",
      valor: 32
    }
  ],

  pacotesTabela: [
    {
      id: "quinzenal_essencial",
      nome: "Plano Quinzenal Prosa Boa",
      frequencia: "2 visitas por mês (a cada 15 dias)",
      destaque: false,
      descricao: "Ideal para pets que vivem em apartamento e precisam de manutenção regular de higiene e escovação.",
      beneficios: [
        "2 Banhos Completos com linha hipoalergênica",
        "1 Tosa Higiênica inclusa no ciclo mensal",
        "Corte de unhas e limpeza de ouvidos em todas as visitas",
        "Horário fixo quinzenal reservado"
      ],
      precosPorPorte: {
        pequeno: "R$ 124/mês",
        medio: "R$ 162/mês",
        grande: "R$ 228/mês",
        gigante: "R$ 304/mês",
        gatos: "R$ 155/mês (Pelo Curto) / R$ 198/mês (Longo)"
      }
    },
    {
      id: "mensal_cuidado_integral",
      nome: "Plano Semanal Pata de Veludo",
      frequencia: "4 visitas por mês (1x por semana)",
      destaque: true,
      badge: "Melhor custo-benefício",
      descricao: "Recomendado para pelagens longas ou densas que exigem escovação semanal para evitar nós.",
      beneficios: [
        "4 Banhos Completos no ciclo de 30 dias",
        "1 Tosa Higiênica + 1 Hidratação Botânica de Aveia inclusas",
        "Higienização bucal cosmética em todas as visitas",
        "Desconto de 15% na Tosa na Tesoura quando desejar"
      ],
      precosPorPorte: {
        pequeno: "R$ 220/mês",
        medio: "R$ 290/mês",
        grande: "R$ 410/mês",
        gigante: "R$ 540/mês",
        gatos: "Sob consulta conforme avaliação da pelagem"
      }
    },
    {
      id: "spa_renovacao",
      nome: "Combo Dia de Spa & Tosa na Tesoura",
      frequencia: "Sessão avulsa completa (recomendado a cada 45 dias)",
      destaque: false,
      descricao: "Renovação completa da pelagem com banho relaxante, hidratação nutritiva e tosa artesanal.",
      beneficios: [
        "Banho Completo + Máscara Nutritiva de Argan",
        "Tosa por Raça ou Estilo Bebê na Tesoura",
        "Tosa Higiênica, corte de unhas e limpeza auricular",
        "Pausa para água fresca e descanso tranquilo"
      ],
      precosPorPorte: {
        pequeno: "R$ 145 (sessão)",
        medio: "R$ 178 (sessão)",
        grande: "R$ 235 (sessão)",
        gigante: "R$ 290 (sessão)",
        gatos: "R$ 148 (Sessão Felina Completa)"
      }
    }
  ],

  galeriaAntesDepois: [
    {
      id: "galeria-1",
      titulo: "Golden Retriever — Desembolo e Hidratação de Argan",
      especie: "Cão Porte Grande",
      servicoRealizado: "Banho Completo + Cardagem de Subpelo + Máscara de Argan",
      tempoAtendimento: "2h15 com pausa para água",
      imagem: "assets/img/galeria-1.svg",
      alt: "Ilustração demonstrativa antes e depois de Golden Retriever com pelagem alinhada e brilhante",
      descricaoAntes: "Pelagem opaca após passeios no parque, com subpelo retido e pequenos nós atrás das orelhas.",
      descricaoDepois: "Fios soltos, escovados com desembaraçador sem dor, brilho natural e toque macio.",
      avisoIlustrativo: "Imagem ilustrativa demonstrativa — substitua pelas fotos reais autorizadas pelos tutores."
    },
    {
      id: "galeria-2",
      titulo: "Shih Tzu — Tosa Bebê na Tesoura e Olhos Livres",
      especie: "Cão Porte Pequeno",
      servicoRealizado: "Banho + Tosa na Tesoura (Estilo Bebê) + Tosa Higiênica",
      tempoAtendimento: "2h00 em bancada antiderrapante",
      imagem: "assets/img/galeria-2.svg",
      alt: "Ilustração demonstrativa antes e depois de Shih Tzu com tosa bebê na tesoura",
      descricaoAntes: "Pelagem longa cobrindo a visão e acumulando umidade nos bigodes e patinhas.",
      descricaoDepois: "Rostinho arredondado na tesoura, olhos livres, almofadinhas aparadas e lacinho confortável.",
      avisoIlustrativo: "Imagem ilustrativa demonstrativa — substitua pelas fotos reais autorizadas pelos tutores."
    },
    {
      id: "galeria-3",
      titulo: "Poodle Toy — Modelagem Ursinho e Hidratação",
      especie: "Cão Porte Pequeno",
      servicoRealizado: "Banho + Hidratação de Aveia + Tosa Ursinho na Tesoura",
      tempoAtendimento: "2h10 com secagem morna suave",
      imagem: "assets/img/galeria-3.svg",
      alt: "Ilustração demonstrativa antes e depois de Poodle Toy com tosa estilo ursinho",
      descricaoAntes: "Cachos assimétricos e ressecados, precisando de nutrição e contorno uniforme.",
      descricaoDepois: "Pelagem fofa, simétrica e perfumada suavemente com essência botânica sem álcool.",
      avisoIlustrativo: "Imagem ilustrativa demonstrativa — substitua pelas fotos reais autorizadas pelos tutores."
    },
    {
      id: "galeria-4",
      titulo: "Gato de Pelo Longo — Remoção de Subpelo sem Estresse",
      especie: "Gato Pelo Longo",
      servicoRealizado: "Atendimento Exclusivo Felino + Escovação de Subpelo",
      tempoAtendimento: "1h10 em sala silenciosa",
      imagem: "assets/img/galeria-4.svg",
      alt: "Ilustração demonstrativa antes e depois de gato de pelo longo escovado com calma",
      descricaoAntes: "Acúmulo de subpelo na época de troca, gerando desconforto e formação de bolas de pelo.",
      descricaoDepois: "Pelagem leve, desembaraçada com escova macia em sala silenciosa sem presença de cães.",
      avisoIlustrativo: "Imagem ilustrativa demonstrativa — substitua pelas fotos reais autorizadas pelos tutores."
    }
  ],

  depoimentos: [
    {
      id: "dep-1",
      nomeTutor: "Mariana V. (Depoimento Demonstrativo)",
      petInfo: "Tutora do Bento (Golden Retriever, 4 anos)",
      texto:
        "O Bento sempre tinha receio do barulho do soprador em outros lugares. Na Pata & Prosa o atendimento com hora marcada fez toda a diferença: ele entra abanando o rabo e volta com o pelo super macio.",
      servico: "Plano Quinzenal Prosa Boa",
      nota: "Exemplo ilustrativo de avaliação"
    },
    {
      id: "dep-2",
      nomeTutor: "Ricardo & Helena (Depoimento Demonstrativo)",
      petInfo: "Tutores da Amora (Shih Tzu, 7 anos)",
      texto:
        "Adoramos a transparência do check-in da pelagem antes do banho. Eles explicam exatamente o que vão fazer na tesoura e avisam no WhatsApp assim que ela está pronta, sem ficar horas esperando em gaiola.",
      servico: "Banho + Tosa na Tesoura",
      nota: "Exemplo ilustrativo de avaliação"
    },
    {
      id: "dep-3",
      nomeTutor: "Camila S. (Depoimento Demonstrativo)",
      petInfo: "Tutora do Nino (Gato Persa, 3 anos)",
      texto:
        "Ter um horário exclusivo só para gatos, sem latidos por perto, foi essencial para o Nino. A escovação de subpelo reduziu muito os pelos pela casa e ele voltou super calmo.",
      servico: "Cuidados Exclusivos para Gatos",
      nota: "Exemplo ilustrativo de avaliação"
    }
  ],

  faq: [
    {
      pergunta: "Como funciona o atendimento com hora marcada? Meu pet fica preso em gaiolas?",
      resposta:
        "Trabalhamos com agenda programada para reduzir ao máximo o tempo de permanência no estúdio. Assim que seu pet chega, fazemos o check-in da pelagem e iniciamos o cuidado. Enquanto aguarda você buscar (após nosso aviso no WhatsApp), ele descansa em espaços amplos, higienizados e tranquilos, com água fresca."
    },
    {
      pergunta: "Vocês realizam consultas veterinárias, vacinas ou aplicação de medicamentos?",
      resposta:
        "Não. A Pata & Prosa é dedicada exclusivamente a serviços de higiene, estética afetiva (banho, tosa, escovação e hidratação cosmética) e produtos de pet shop. Não realizamos consultas clínicas, vacinação, cirurgias, sedação ou tratamentos dermatológicos medicamentosos. Caso notemos qualquer alteração na pele ou ouvido durante o banho, avisamos o tutor imediatamente para que procure seu médico-veterinário de confiança."
    },
    {
      pergunta: "Como funciona o atendimento para gatos?",
      resposta:
        "Reservamos janelas de horário exclusivas para felinos, sem nenhum cão no ambiente de banho. Utilizamos manejo gentil, toalhas macias, música ambiente baixa e secagem com ruído reduzido. O gato deve obrigatoriamente chegar em caixa de transporte segura."
    },
    {
      pergunta: "Por que o valor do simulador é uma estimativa?",
      resposta:
        "Cada pet tem uma densidade de pelagem única! O valor simulado no site serve como referência transparente por porte e serviço. Na recepção, avaliamos presencialmente se há nós acentuados (que exijam desembolo extra) ou necessidade de cuidados específicos, sempre combinando o valor final com você antes de começar."
    },
    {
      pergunta: "Quais produtos vocês utilizam no banho? Posso levar o xampu do meu pet?",
      resposta:
        "Utilizamos apenas linha profissional biodegradável e hipoalergênica, com pH balanceado para cães e gatos e fragrâncias suaves sem álcool agressivo. Caso seu médico-veterinário tenha prescrito um xampu específico de uso contínuo, você pode trazê-lo identificado que aplicamos seguindo a orientação de pausa."
    },
    {
      pergunta: "O envio do formulário no site já confirma o agendamento automaticamente?",
      resposta:
        "Não. O formulário funciona como um pré-agendamento rápido: ele organiza os dados do seu pet e abre a conversa no nosso WhatsApp (ou e-mail) já preenchida. Nossa equipe verifica a disponibilidade na agenda e responde confirmando o horário exato."
    }
  ]
};
