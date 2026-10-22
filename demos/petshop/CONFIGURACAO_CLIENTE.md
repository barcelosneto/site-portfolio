# Guia de Configuração para o Cliente (`CONFIGURACAO_CLIENTE.md`)

Toda a personalização comercial da landing page **Pata & Prosa** foi centralizada no arquivo [`assets/js/config.js`](./assets/js/config.js) para que você não precise procurar preços ou telefones espalhados no HTML.

---

## 1. Como Alterar Telefone, WhatsApp e E-mail

Abra o arquivo `assets/js/config.js` e localize o bloco `contato`:

```javascript
contato: {
  whatsappNumero: "5511999990000", // Digite apenas números: DDI (55) + DDD + Número
  whatsappExibicao: "(11) 99999-0000",
  telefoneFixoExibicao: "(11) 3000-0000",
  email: "contato@seudominio.com.br",
  mensagemPadraoWhatsApp:
    "Olá, equipe da Pata & Prosa! Vi o site e gostaria de consultar disponibilidade de horário para banho e tosa."
},
```

> **Dica:** Ao salvar essa alteração, o botão flutuante de WhatsApp, o rodapé, a seção de localização, o botão do simulador e o formulário de pré-agendamento passam automaticamente a usar o novo número e e-mail.

---

## 2. Como Atualizar Endereço e Horários de Atendimento

No mesmo arquivo `assets/js/config.js`, edite o objeto `localizacao`:

```javascript
localizacao: {
  identificacaoDemo: "Unidade Vila Jardim",
  logradouro: "Rua Exemplo Real, 123",
  bairro: "Seu Bairro",
  cidadeUf: "Sua Cidade — UF",
  cep: "00000-000",
  // ...
}
```

---

## 3. Como Ajustar os Preços do Simulador de Orçamento

Os valores do simulador ficam nos blocos `matrizOrcamento` (valores base por espécie/porte e serviço) e `adicionaisOrcamento` (itens opcionais) em `assets/js/config.js`:

```javascript
matrizOrcamento: {
  pequeno: {
    banho_completo: 65,
    tosa_higienica: 85,
    tosa_raca: 125,
    hidratacao_dermo: 95,
    cuidados_gatos: 85,
    pacote_mensal: 220
  },
  // medio, grande, gigante, gato_curto, gato_longo...
}
```

Basta alterar os números (em Reais) que os cards de serviço e o simulador serão atualizados automaticamente.

---

## 4. Como Substituir as Imagens Ilustrativas da Galeria Antes/Depois

1. Salve as fotos reais (com autorização escrita dos tutores) na pasta `assets/img/` em formato `.webp` ou `.jpg` (recomendado `640x420px`).
2. Em `assets/js/config.js`, localize a lista `galeriaAntesDepois` e atualize a propriedade `imagem`, o `titulo`, a `descricaoAntes`, a `descricaoDepois` e o texto `avisoIlustrativo`.

---

## 5. Como Remover a Faixa de "Demonstração"

Quando todos os dados reais da loja estiverem revisados:
1. Em `assets/js/config.js`, altere `modoDemonstracao: false`.
2. Em `index.html`, remova ou comente o bloco `<aside class="demo-banner">...</aside>` e atualize o CNPJ e avisos no rodapé (`<footer class="site-footer">`).
