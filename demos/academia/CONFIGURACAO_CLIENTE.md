# Guia de Configuração para o Cliente (`CONFIGURACAO_CLIENTE.md`)

Todos os dados comerciais da landing page **PULSO FIT** estão centralizados no arquivo **`assets/js/config.js`** (carregado antes de `assets/js/main.js`), facilitando a personalização rápida sem precisar procurar valores espalhados pelo código.

---

## 1. Passo a Passo para Substituir os Dados de Demonstração

Abra o arquivo `assets/js/config.js` em qualquer editor de texto e atualize os seguintes blocos:

### A. Marca e Aviso de Demonstração (`brand`)
- `brand.name`: Nome oficial da sua academia ou estúdio.
- `brand.tagline`: Slogan curto exibido nos títulos.
- Quando colocar o site em produção real com dados verdadeiros, você pode remover ou ocultar a barra `<aside class="demo-banner">` no `index.html` e definir `isDemo: false`.

### B. Telefone, WhatsApp, E-mail e Endereço (`contact`)
- `contact.whatsappNumber`: Número completo apenas com dígitos (DDI `55` + DDD + número, ex.: `"5511988887777"`). Este número recebe os pedidos de aula experimental e consultas de planos.
- `contact.whatsappDisplay` e `contact.phoneDisplay`: Texto formatado exibido na seção de Contato.
- `contact.email`: Endereço de e-mail oficial que receberá solicitações via `mailto:`.
- `contact.addressLine1`, `contact.addressLine2` e `contact.googleMapsQuery`: Endereço físico real e link do Google Maps.
- `contact.openingHours`: Lista de horários reais de abertura do estúdio.

### C. Modalidades (`modalities`)
- Edite descrições, intensidade, duração média e perfil de público indicado para cada modalidade.

### D. Grade Semanal de Aulas (`schedule`)
- Cada item da lista `schedule` representa uma aula na grade filtrável:
  - `day`: `"segunda"`, `"terca"`, `"quarta"`, `"quinta"`, `"sexta"` ou `"sabado"`.
  - `modality`: `"musculacao"`, `"funcional"`, `"bike"` ou `"mobilidade"`.
  - `time`: Horário no formato `"HH:MM"`.
  - `title`, `instructor`, `spots`, `duration`, `level`.

### E. Planos e Periodicidade (`plans`)
- Em `plans.items`, ajuste o valor mensal equivalente (`monthlyEquivalent`) de cada plano para os ciclos `mensal`, `trimestral` e `anual`.
- O script `assets/js/main.js` calcula automaticamente o valor total do ciclo (multiplicando por 1, 3 ou 12 meses) e a economia transparente em relação ao plano mensal.

### F. Equipe (`team`) e Instalações (`facilities`)
- Substitua os nomes ilustrativos pelos profissionais reais da sua equipe.
- **Importante:** Caso deseje exibir número de registro profissional (CREF), inclua **somente registros reais e verificáveis** dos profissionais contratados.

---

## 2. Liberação para Indexação no Google (SEO de Produção)

Por segurança ética e técnica, o projeto vem configurado com `noindex, nofollow` para evitar que buscadores indexem um negócio fictício de demonstração. Após inserir os dados reais do cliente:

1. No arquivo **`index.html`**:
   - Altere `<meta name="robots" content="noindex, nofollow" />` para `<meta name="robots" content="index, follow" />`.
   - Atualize a tag `<link rel="canonical" ...>` e as tags `og:url` / `og:image` com o domínio real.
   - Atualize o bloco `<script type="application/ld+json">` com o nome, telefone e endereço reais.
2. No arquivo **`robots.txt`**:
   - Troque `Disallow: /` por `Allow: /` e ajuste a linha `Sitemap:`.
3. No arquivo **`sitemap.xml`**:
   - Substitua `https://usuario.github.io/academia/` pela URL final de produção.
