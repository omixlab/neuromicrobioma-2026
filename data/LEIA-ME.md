# Como atualizar palestrantes e programação

O site lê dois arquivos desta pasta. Basta editá-los (inclusive direto pelo GitHub) e fazer o commit: o GitHub Pages publica em alguns minutos.

| Arquivo | Conteúdo |
|---|---|
| `palestrantes.json` | Lista de palestrantes (nome, instituição, foto, mini currículo) |
| `programacao.json` | Dias e atividades (palestras, pitch, pôsteres, intervalos…) |

Enquanto `"publicado": false`, a seção mostra "em breve". Com `true`, o conteúdo aparece no site.

## Português e inglês

O site tem versão em português e em inglês (botões ENG / PT-BR na navbar). Qualquer texto destes arquivos pode ser:

- um texto único, igual nos dois idiomas: `"titulo": "Coffee break"`
- um par de traduções: `"titulo": { "pt": "Solenidade de abertura", "en": "Opening ceremony" }`

Se faltar o `"en"`, o site mostra o texto em português.

## palestrantes.json

```json
{
  "id": "maria-silva",
  "tratamento": { "pt": "Profa. Dra.", "en": "Prof." },
  "nome": "Maria Silva",
  "instituicao": "Universidade Federal de Pelotas (UFPel)",
  "pais": { "pt": "EUA", "en": "USA" },
  "foto": "assets/palestrantes/maria-silva.jpg",
  "bio": { "pt": "Mini currículo.", "en": "Short bio." },
  "link": "https://lattes.cnpq.br/..."
}
```

- `id`: identificador único, sem espaços ou acentos. É usado na programação.
- `tratamento` (opcional): aparece antes do nome.
- `pais` (opcional): use só para palestrantes de fora do Brasil.
- `foto`: caminho de uma imagem em `assets/palestrantes/` ou um endereço `https://…`. Use fotos quadradas (ex.: 400×400 px). Os caminhos já estão preenchidos: basta enviar a foto com o nome indicado. Enquanto o arquivo não existir, o site mostra as iniciais.
- O GitHub Pages diferencia maiúsculas de minúsculas: `Maria.JPG` ≠ `maria.jpg`.
- `bio` e `link` (opcionais): mini currículo e Lattes, site ou perfil acadêmico.
- O título da palestra **não** vai aqui: ele vem da programação e aparece automaticamente no card do palestrante.

## programacao.json

```json
{
  "data": "2026-11-17",
  "tema": { "pt": "Tema do dia", "en": "Theme of the day" },
  "atividades": [
    {
      "inicio": "09:30",
      "fim": "10:30",
      "tipo": "palestra",
      "titulo": { "pt": "Título da palestra", "en": "Talk title" },
      "palestrantes": ["maria-silva"],
      "descricao": "Opcional",
      "local": "Opcional"
    },
    { "inicio": "10:30", "fim": "10:35", "tipo": "discussao" }
  ]
}
```

- `data` no formato `AAAA-MM-DD`. O dia da semana é calculado automaticamente.
- `tema` (opcional): subtítulo do dia.
- `tipo`: `credenciamento`, `abertura`, `palestra`, `discussao`, `mesa-redonda`, `pitch`, `poster`, `intervalo`, `encerramento` ou `outro`.
- `titulo` pode ficar de fora; nesse caso aparece o nome do tipo (ex.: "Discussão"). As discussões aparecem numa linha compacta.
- `palestrantes`: lista de `id`s do `palestrantes.json` (pode ter mais de um, ou ficar de fora).

## Textos fixos da página

Os demais textos estão no `index.html` (português) e em `js/i18n.js` (inglês). Um elemento com `data-i18n="chave"` recebe o texto em inglês da chave de mesmo nome.

## Dicas

- Valide o JSON antes do commit (ex.: https://jsonlint.com). Uma vírgula sobrando faz a seção voltar para "em breve".
- Para ver localmente, abra um servidor na pasta do projeto: `python3 -m http.server` e acesse http://localhost:8000. Abrir o `index.html` direto (file://) não carrega os JSON.
