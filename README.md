# Projeto Podcast Platform

## Descrição do Projeto

O Podcast Platform é uma plataforma SaaS de ponta que permite aos usuários criar, descobrir e aproveitar podcasts com recursos avançados como conversão de texto para áudio com múltiplas vozes de IA, geração de imagens de miniaturas de podcasts e reprodução contínua.

## Principais Funcionalidades

- **Autenticação Robusta:** Sistema seguro e confiável de login e registro de usuários.

- **Página Inicial Moderna:** Exibe podcasts em destaque com um player fixo para audição contínua.

- **Página de Descoberta de Podcasts:** Página dedicada para os usuários explorarem novos e populares podcasts.

- **Busca Totalmente Funcional:** Permite que os usuários encontrem podcasts facilmente usando vários critérios de busca.

- **Página de Criação de Podcast:** Permite a criação de podcasts com o "upload" de aúdio e imagem além de uma conversão de texto para áudio e geração de imagens por IA.

- **Funcionalidade de Múltiplas Vozes de IA:** Suporta múltiplas vozes geradas por IA para criação dinâmica de podcasts.

- **Página de Perfil:** Visualize todos os podcasts criados com opções para deletá-los.

- **Página de Detalhes do Podcast:** Exibe informações detalhadas sobre cada podcast, incluindo detalhes do criador, número de ouvintes e transcrição.

- **Player de Podcast:** Apresenta controles de retroceder/avançar, além de funcionalidade de silenciar/desativar som para uma experiência de audição contínua.

- **Design Responsivo:** Totalmente funcional e visualmente atraente em todos os dispositivos e tamanhos de tela.

## Dependências

O projeto utiliza diversas dependências para garantir seu funcionamento suave:

- `@clerk/nextjs`: ^5.2.4,
- `@hookform/resolvers`: ^3.9.0,
- `@radix-ui/react-dialog`: ^1.1.1,
- `@radix-ui/react-dropdown-menu`: ^2.1.1,
- `@radix-ui/react-label`: ^2.1.0,
- `@radix-ui/react-progress`: ^1.1.0,
- `@radix-ui/react-select`: ^2.1.1,
- `@radix-ui/react-slot`: ^1.1.0,
- `@radix-ui/react-toast`: ^1.2.1,
- `@xixixao/uploadstuff`: ^0.0.5,
- `class-variance-authority`: ^0.7.0,
- `clsx`: ^2.1.1,
- `convex`: ^1.13.0,
- `embla-carousel-autoplay`: ^8.1.7,
- `embla-carousel-react`: ^8.1.7,
- `lucide-react`: ^0.408.0,
- `next`: 14.2.5,
- `openai`: ^4.52.7,
- `react`: ^18,
- `react-dom`: ^18,
- `react-hook-form`: ^7.52.1,
- `svix`: ^1.25.0,
- `tailwind-merge`: ^2.4.0,
- `tailwindcss-animate`: ^1.0.7,
- `uuid`: ^10.0.0,
- `zod`: ^3.23.8,
- `@types/node`: ^20,
- `@types/react`: ^18,
- `@types/react-dom`: ^18,
- `@types/uuid`: ^10.0.0,
- `eslint`: ^8,
- `eslint-config-next`: 14.2.5,
- `postcss`: ^8,
- `tailwindcss`: ^3.4.1,
- `typescript`: ^5

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
3. Instale as dependências do projeto utilizando o seguinte comando:

```bash
npm install
# ou
yarn install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes chaves e seus respectivos valores:

```env
CONVEX_DEPLOYMENT=seu_valor_aqui
NEXT_PUBLIC_CONVEX_URL=seu_valor_aqui
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=seu_valor_aqui
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_SECRET_KEY=seu_valor_aqui
CLERK_WEBHOOK_SECRET=seu_valor_aqui
OPENAI_API_KEY=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

5. Inicie o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse a aplicação em `http://localhost:3000` e explore as funcionalidades completas do Podcast Platform e adapte-as conforme suas necessidades específicas.
