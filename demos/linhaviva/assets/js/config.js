/**
 * LINHA VIVA | Arquitetura e Interiores
 * Arquivo Central de Configuração do Cliente (config.js)
 *
 * IMPORTANTE:
 * Este site está configurado inicialmente em MODO DE DEMONSTRAÇÃO.
 * Antes de publicar para uso comercial real, substitua os dados fictícios abaixo
 * pelos dados oficiais do seu escritório e altere `isDemo: false`.
 */

window.LINHA_VIVA_CONFIG = {
  isDemo: true,
  brand: {
    name: "LINHA VIVA",
    tagline: "Arquitetura e Interiores",
    subtitle: "Arquitetura silenciosa, luz natural e precisão construtiva",
    foundedNote: "Estúdio conceitual demonstrativo — Portfólio de referência editorial",
    legalNotice:
      "AVISO DE DEMONSTRAÇÃO: Marca, projetos conceituais, estimativas, equipe e depoimentos exibidos nesta página são estritamente ilustrativos para demonstração de estrutura, design e funcionalidades. Nenhum projeto é atribuído a profissionais reais ou registros CAU/CREA."
  },
  contact: {
    // Número em formato internacional apenas dígitos (DDI + DDD + Número).
    // Exemplo fictício reservado para demonstração:
    whatsappNumber: "5511999990000",
    whatsappDisplay: "+55 (11) 99999-0000 (Demo)",
    email: "contato@linhaviva-demo.arquitetura.br",
    cityState: "São Paulo — SP | Atendimento Nacional",
    addressDisplay: "Alameda Conceitual, 480 — Conj. 82, Jardins, São Paulo/SP (Endereço fictício de demonstração)",
    officeHours: "Segunda a sexta, das 9h às 18h (Mediante agendamento prévio)",
    instagramUrl: "https://instagram.com/",
    pinterestUrl: "https://pinterest.com/",
    linkedinUrl: "https://linkedin.com/"
  },
  seo: {
    canonicalUrl: "https://usuario.github.io/arquitetura-interiores/",
    noindexInDemo: true
  },
  scopeRules: {
    modalities: {
      completo: {
        label: "Projeto Completo (Estudo + Executivo + Detalhamento)",
        deliverables: [
          "Levantamento métrico e diagnóstico espacial completo",
          "Estudo preliminar com opções de layout e volumetria 3D conceitual",
          "Anteprojeto de materialidade, revestimentos, pedras e paleta cromática",
          "Projeto executivo de alvenaria, pontos elétricos, hidráulicos, forro e luminotécnica",
          "Caderno completo de marcenaria sob medida em escala de detalhamento",
          "Memorial descritivo e quantitativo base para cotação com fornecedores"
        ],
        baseWeeks: { ate70: [6, 9], de70a150: [8, 12], de150a300: [12, 16], acima300: [16, 22] }
      },
      reforma: {
        label: "Reforma & Retrofit (Integração + Interiores + Compatibilização)",
        deliverables: [
          "Diagnóstico técnico de interferências e diretrizes de demolição/construção",
          "Redesenho de circulação, integração de ambientes e estudo de insolação",
          "Projeto executivo civil: paginação de pisos, forros, iluminação e bancadas",
          "Detalhamento de marcenaria fixa, serralheria e elementos especiais",
          "Compatibilização visual de infraestrutura (ar-condicionado, elétrica e automação)",
          "Cronograma físico orientativo de etapas para contratação de equipe de obra"
        ],
        baseWeeks: { ate70: [8, 11], de70a150: [10, 14], de150a300: [14, 18], acima300: [18, 24] }
      },
      consultoria: {
        label: "Consultoria de Ambientes (Layout + Curadoria sem obra civil)",
        deliverables: [
          "Reunião de diagnóstico e leitura de necessidades funcionais do espaço",
          "Planta humanizada de layout com dimensionamento ergonômico de mobiliário",
          "Moodboard de atmosfera, paleta de cores, tecidos, tapetes e texturas",
          "Caderno de curadoria com indicação de mobiliário solto, luminárias e objetos",
          "Orientações pontuais de pintura, cortinas e composição de quadros",
          "1 revisão programada da seleção de itens (não inclui projeto executivo de obra)"
        ],
        baseWeeks: { ate70: [2, 4], de70a150: [3, 5], de150a300: [4, 6], acima300: [5, 8] }
      }
    }
  }
};
