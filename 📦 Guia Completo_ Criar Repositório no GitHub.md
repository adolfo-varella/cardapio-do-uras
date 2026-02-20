# 📦 Guia Completo: Criar Repositório no GitHub

Este guia passo a passo mostra como criar um repositório no GitHub e fazer upload do projeto Doçuras da Angel.

## ✅ Pré-requisitos

- Conta no [GitHub](https://github.com) (crie uma se não tiver)
- Git instalado no seu computador ([git-scm.com](https://git-scm.com))
- Terminal/CMD aberto

## 🚀 Passo 1: Criar Repositório no GitHub

### Via Website (Mais Fácil)

1. Acesse [github.com/new](https://github.com/new)
2. Preencha os dados:
   - **Repository name:** `docuras-da-angel-app`
   - **Description:** `Cardápio online de confeitaria com React Native + Expo`
   - **Visibility:** Escolha **Private** (privado) ou **Public** (público)
   - **Initialize with:** Deixe em branco (vamos fazer isso localmente)

3. Clique em **"Create repository"**

### Via Terminal (Git CLI)

```bash
# Se você tem GitHub CLI instalado
gh repo create docuras-da-angel-app \
  --description "Cardápio online de confeitaria com React Native + Expo" \
  --private \
  --source=. \
  --remote=origin \
  --push
```

## 🔑 Passo 2: Configurar Git Localmente

Abra o terminal na pasta do projeto:

```bash
cd ~/docuras-da-angel-app
```

### Configurar Identidade Git (primeira vez apenas)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

## 📤 Passo 3: Inicializar Git e Fazer Upload

Execute os comandos na ordem:

```bash
# 1. Inicializar repositório local
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Criar primeiro commit
git commit -m "Initial commit: Doçuras da Angel App v1.0"

# 4. Renomear branch para main (padrão do GitHub)
git branch -M main

# 5. Adicionar repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/docuras-da-angel-app.git

# 6. Fazer upload dos arquivos
git push -u origin main
```

**Exemplo completo:**
```bash
git init
git add .
git commit -m "Initial commit: Doçuras da Angel App v1.0"
git branch -M main
git remote add origin https://github.com/angel-confeitaria/docuras-da-angel-app.git
git push -u origin main
```

## 🔐 Passo 4: Autenticação (se solicitado)

Se o Git pedir autenticação:

### Opção A: Token de Acesso Pessoal (Recomendado)

1. Vá para [github.com/settings/tokens](https://github.com/settings/tokens)
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Configure:
   - **Token name:** `docuras-angel-app`
   - **Expiration:** 90 days
   - **Select scopes:** Marque `repo` (acesso completo a repositórios)
4. Clique em **"Generate token"**
5. **Copie o token** (você não verá novamente!)
6. Na solicitação do Git, use:
   - **Username:** seu usuário do GitHub
   - **Password:** Cole o token

### Opção B: SSH (Avançado)

```bash
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu.email@example.com"

# Adicionar chave ao SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copiar chave pública
cat ~/.ssh/id_ed25519.pub

# Adicionar em github.com/settings/ssh
# Depois usar: git remote set-url origin git@github.com:SEU_USUARIO/docuras-da-angel-app.git
```

## ✨ Passo 5: Verificar Upload

```bash
# Ver status
git status

# Ver histórico
git log

# Ver repositório remoto
git remote -v
```

Acesse `https://github.com/SEU_USUARIO/docuras-da-angel-app` para confirmar!

## 📝 Passo 6: Adicionar Arquivos Importantes

Certifique-se de que estes arquivos estão no repositório:

```
✅ README_GITHUB.md      (instruções de instalação)
✅ index.html            (página de boas-vindas)
✅ .gitignore            (arquivos a ignorar)
✅ package.json          (dependências)
✅ app.config.ts         (configuração Expo)
✅ app/                  (código do app)
✅ server/               (código do backend)
✅ drizzle/              (migrações do banco)
```

## 🔄 Passo 7: Fazer Atualizações Futuras

Depois de fazer mudanças no código:

```bash
# Ver o que mudou
git status

# Adicionar mudanças
git add .

# Criar commit
git commit -m "Descrição da mudança"

# Fazer upload
git push
```

## 📋 Exemplo Completo de Workflow

```bash
# Clonar o repositório em outro computador
git clone https://github.com/SEU_USUARIO/docuras-da-angel-app.git
cd docuras-da-angel-app

# Instalar dependências
pnpm install

# Rodar o projeto
pnpm dev

# Fazer mudanças e atualizar
git add .
git commit -m "Adicionar nova feature"
git push
```

## 🚨 Problemas Comuns

### Erro: "fatal: not a git repository"
**Solução:**
```bash
git init
git remote add origin https://github.com/SEU_USUARIO/docuras-da-angel-app.git
```

### Erro: "fatal: 'origin' does not appear to be a 'git' repository"
**Solução:**
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/docuras-da-angel-app.git
```

### Erro: "Permission denied (publickey)"
**Solução:** Use HTTPS em vez de SSH:
```bash
git remote set-url origin https://github.com/SEU_USUARIO/docuras-da-angel-app.git
```

### Erro: "The remote repository does not exist"
**Solução:** Crie o repositório no GitHub primeiro (Passo 1)

## 📚 Recursos Úteis

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [GitHub CLI](https://cli.github.com)
- [SSH Keys Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Git configurado localmente
- [ ] Arquivos enviados para GitHub
- [ ] README.md visível no repositório
- [ ] Arquivo .gitignore presente
- [ ] Nenhuma senha ou token no código
- [ ] Arquivo .env não foi enviado (segurança!)

---

**Pronto!** 🎉 Seu repositório está online e pronto para colaboração!

Para mais ajuda, acesse: [github.com/help](https://github.com/help)
