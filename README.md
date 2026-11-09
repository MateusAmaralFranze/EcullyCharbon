# Ecully Charbon — site

Site institucional e cardápio digital do **Ecully Charbon** (Perdizes, São Paulo).

Reconstrução completa do site em Wix com foco em performance, tipografia editorial,
fotografia em tela cheia e animações de rolagem.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS 4** (design tokens em `app/globals.css`)
- **GSAP 3 + ScrollTrigger** (reveals, parallax, seção pinada com rolagem horizontal)
- **Lenis** (smooth scroll integrado ao ticker do GSAP)
- **next/font** (Montserrat + Inter Tight, self-hosted no build)
- Sem CMS, sem banco de dados, sem dependências externas em runtime

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm run start
```

Checagem de tipos:

```bash
npm run lint
```

## Estrutura

```
app/
  layout.tsx            metadata, fontes, JSON-LD do restaurante
  page.tsx              home
  cardapio/page.tsx     cardápio (conteúdo nativo, busca, impressão)
  contato/page.tsx      contato + formulário de reserva → WhatsApp
  globals.css           tokens, tipografia, botões, impressão, reduced motion
  icon.png              favicon (monograma C)
  opengraph-image.jpg   imagem de compartilhamento
components/
  layout/               Header (overlay mobile), Footer, Preloader
  providers/            SmoothScroll (Lenis + ScrollTrigger + âncoras)
  sections/             seções da home
  menu/                 experiência do cardápio
  contact/              formulário de reserva
  ui/                   Reveal, LineReveal, ParallaxImage, Marquee, Magnetic
lib/
  site.ts               endereço, telefone, WhatsApp, horários, links
  menu.ts               cardápio completo (comidas e bebidas)
scripts/
  process-assets.mjs    otimização das fotos e logo
  brand.mjs             monograma e ícones
  qa.mjs                QA desktop/mobile (Playwright)
  qa-deep.mjs           QA profundo: pin, âncoras, axe, formulário
public/
  images/               fotos em WebP
  brand/                logo clara/escura/compacta e monogramas
```

## Editando conteúdo

- **Cardápio**: `lib/menu.ts`. Preços são números; a formatação para
  `R$ 0,00` é automática. Itens com `featured: true` aparecem nas sugestões
  e na home. `image`/`imageAlt` são opcionais.
- **Telefone, WhatsApp, endereço, horários e links**: `lib/site.ts`.
- **Textos da home**: cada seção tem seu componente em `components/sections/`.
- **Fotos**: substitua os arquivos em `public/images/` mantendo os nomes, ou
  rode `npm run assets` depois de trocar as originais em `assets/source/`.

> Observação: o WhatsApp usa o número fixo `(11) 3871-1993`
> (`551138711993`). Se esse número não tiver WhatsApp, troque `site.whatsapp`
> em `lib/site.ts`.

## Acessibilidade e qualidade

- Contraste validado com axe (0 violações AA nas três páginas).
- Navegação por teclado, foco visível, skip link, foco preso no menu mobile.
- `prefers-reduced-motion` desliga animações e marquees.
- Cardápio com versão de impressão (botão "Imprimir").
- QA automatizado:

```bash
node scripts/qa-deep.mjs   # requer Chrome instalado
```

Os scripts de QA usam `playwright-core` + o Chrome do sistema. Eles apontam
para `http://localhost:3000`; rode o site antes.

## Deploy na Vercel

1. Crie um repositório Git e envie o projeto.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. Configuração detectada automaticamente (Next.js). Não há variáveis de
   ambiente obrigatórias.
4. Deploy. O preview fica em algo como
   `https://charbon-xxxx.vercel.app`.

Alternativa por CLI:

```bash
npx vercel        # preview
npx vercel --prod # produção
```

## Migrando o domínio `charbon.com.br`

Hoje o domínio está no Wix. O site novo pode ficar no ar em `*.vercel.app`
enquanto a migração é feita, sem derrubar o site atual.

### 1. Descobrir quem controla o domínio

Para domínios `.com.br`, o registro é feito no **Registro.br**. Verifique no
[registro.br](https://registro.br) quem é o titular e o contato do responsável.
Se o domínio foi registrado por uma agência, é preciso obter o acesso (ou pedir
a transferência do titular) antes de mexer no DNS.

### 2. Adicionar o domínio na Vercel

No projeto da Vercel → **Settings → Domains**, adicione:

- `charbon.com.br`
- `www.charbon.com.br`

A Vercel exibirá os registros DNS necessários. Os valores usuais são:

| Tipo  | Nome | Valor                  |
| ----- | ---- | ---------------------- |
| A     | `@`  | `76.76.21.21`          |
| CNAME | `www`| `cname.vercel-dns.com` |

> Use sempre os valores que a Vercel mostrar, pois podem mudar.

### 3. Apontar o DNS

No painel do registro atual (Wix/Registro.br):

1. Faça backup dos registros atuais (A, CNAME, MX, TXT).
2. Remova o A de `@` que aponta para o Wix e crie o A da Vercel.
3. Troque o CNAME de `www` pelo da Vercel.
4. **Mantenha os registros MX/TXT** se houver e-mail no domínio
   (ex.: Google Workspace).
5. Aguarde a propagação (de minutos a algumas horas).

### 4. Checklist pós-migração

- [ ] `https://charbon.com.br` abre o site novo com HTTPS válido
- [ ] `https://www.charbon.com.br` redireciona para o domínio principal
- [ ] e-mails do domínio continuam funcionando
- [ ] links antigos do Wix (`/menu`, `/contact`, etc.) redirecionam
- [ ] Google Search Console: reenviar `sitemap.xml`
- [ ] Google Meu Negócio: atualizar o link do site
- [ ] Instagram/Facebook/iFood: atualizar o link na bio
- [ ] manter a hospedagem antiga por ~30 dias como fallback

### Cancelamento do Wix

Só cancele o plano do Wix depois de confirmar que o domínio e os e-mails estão
funcionando no novo destino. Se o domínio foi registrado pelo Wix, não cancele
antes de garantir o controle do registro no Registro.br.

## Pós-lançamento (sugestões)

- Substituir as fotos genéricas por fotografia profissional atual.
- Revisar os textos de apresentação com a equipe do restaurante.
- Integrar reservas com uma plataforma (OpenTable, GetIn) se o volume crescer.
- Adicionar Google Analytics/Plausible e acompanhar cliques no WhatsApp.
