# Guia de Configuração do Cliente — LINHA VIVA | Arquitetura e Interiores

Este guia explica onde e como substituir os dados demonstrativos pelos dados oficiais do escritório de arquitetura antes de lançar a página comercialmente.

---

## 1. Edição Centralizada de Contatos e Marca (`assets/js/config.js`)

Abra o arquivo [`assets/js/config.js`](./assets/js/config.js) e edite o objeto `window.LINHA_VIVA_CONFIG`:

```javascript
window.LINHA_VIVA_CONFIG = {
  isDemo: false, // Altere para false quando publicar oficialmente
  brand: {
    name: "NOME DO SEU ESCRITÓRIO",
    tagline: "Arquitetura e Interiores",
    legalNotice: "© Todos os direitos reservados — Razão Social e Registro CAU/PJ oficial."
  },
  contact: {
    whatsappNumber: "5511988887777", // Apenas números: DDI (55) + DDD + Número
    whatsappDisplay: "+55 (11) 98888-7777",
    email: "contato@seuescritorio.arq.br",
    cityState: "São Paulo — SP | Atendimento Nacional",
    addressDisplay: "Seu endereço comercial completo",
    officeHours: "Segunda a sexta, das 9h às 18h",
    instagramUrl: "https://instagram.com/seuperfil",
    pinterestUrl: "https://pinterest.com/seuperfil",
    linkedinUrl: "https://linkedin.com/company/seuperfil"
  }
  // ...
};
```

> **Como funciona:** Ao carregar a página, o script `main.js` atualiza automaticamente todos os elementos marcados com `data-config="..."` e `data-config-href="..."`, além de direcionar o envio do formulário de briefing para o novo número de WhatsApp e e-mail.

---

## 2. Substituição dos Projetos do Portfólio e Imagens

1. **Fotografias dos Projetos Reais:**
   - Salve as fotografias otimizadas (preferencialmente em formato `.webp` ou `.jpg` com largura entre `1200px` e `1600px`) dentro de `assets/img/`.
   - Atualize os atributos `src` e `alt` nos cards da seção `#portfolio` em [`index.html`](./index.html).
2. **Fichas Técnicas do Lightbox:**
   - No topo de [`assets/js/main.js`](./assets/js/main.js), edite o array `CONCEPT_PROJECTS` com os títulos, metragens, cidades, descrições e especificações reais de cada obra executada ou projeto autoral do escritório.
3. **Comparador Antes & Depois:**
   - Substitua `assets/img/reforma-antes.svg` e `assets/img/reforma-depois.svg` por duas fotos do mesmo ângulo (mesma proporção `960x620` ou `16:10`) de uma obra real de reforma do escritório.

---

## 3. Remoção dos Avisos de Demonstração

Após substituir todos os projetos, textos de equipe (incluindo o registro oficial no CAU) e depoimentos por avaliações reais autorizadas pelos clientes:

1. Em [`index.html`](./index.html), remova o bloco `<aside class="demo-banner">...</aside>` logo abaixo do `<body>`.
2. Na seção `#estudio`, substitua o quadro `.studio__ethics-box` pelos dados reais dos arquitetos titulares e seus respectivos números de registro no CAU.
3. Na seção `#depoimentos`, substitua os 3 cards ilustrativos por depoimentos reais com permissão documentada dos clientes.
4. Ative a indexação em [`index.html`](./index.html) (`content="index, follow"`) e em [`robots.txt`](./robots.txt) (`Allow: /`).
