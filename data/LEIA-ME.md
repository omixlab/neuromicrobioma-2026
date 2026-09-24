# Como atualizar palestrantes e programação

O site lê dois arquivos desta pasta. Basta editá-los (inclusive direto pelo GitHub) e fazer o commit: o GitHub Pages publica em alguns minutos.

| Arquivo | Conteúdo |
|---|---|
| `palestrantes.json` | Lista de palestrantes (nome, instituição, foto, mini currículo) |
| `programacao.json` | Dias e atividades (palestras, mesas, pitch, pôsteres, intervalos…) |

Enquanto `"publicado": false`, a seção mostra "em breve". Troque para `true` quando o conteúdo estiver pronto.

## palestrantes.json

```json
{
  "id": "maria-silva",
  "nome": "Dra. Maria Silva",
  "instituicao": "Universidade Federal de Pelotas",
  "pais": "Brasil",
  "foto": "assets/palestrantes/maria-silva.jpg",
  "bio": "Mini currículo em duas ou três frases.",
  "link": "https://lattes.cnpq.br/..."
}
```

- `id`: identificador único, sem espaços ou acentos. É usado na programação.
- `foto`: caminho de uma imagem em `assets/palestrantes/` ou um endereço `https://…`. Use fotos quadradas (ex.: 400×400 px). Se ficar vazio ou o arquivo não existir, o site mostra as iniciais.
- O GitHub Pages diferencia maiúsculas de minúsculas: `Maria.JPG` ≠ `maria.jpg`.
- `link` (opcional): Lattes, site ou perfil acadêmico.
- O título da palestra **não** vai aqui: ele vem da programação e aparece automaticamente no card do palestrante.

## programacao.json

```json
{
  "data": "2026-11-17",
  "atividades": [
    {
      "inicio": "09:30",
      "fim": "10:30",
      "tipo": "palestra",
      "titulo": "Título da palestra",
      "palestrantes": ["maria-silva"],
      "descricao": "Opcional",
      "local": "Opcional"
    }
  ]
}
```

- `data` no formato `AAAA-MM-DD`. O dia da semana é calculado automaticamente.
- `tipo`: `palestra`, `mesa-redonda`, `pitch`, `poster`, `abertura`, `encerramento`, `intervalo`, `credenciamento` ou `outro`.
- `palestrantes`: lista de `id`s do `palestrantes.json` (pode ter mais de um, ou ficar de fora).

## Dicas

- Valide o JSON antes do commit (ex.: https://jsonlint.com). Uma vírgula sobrando faz a seção voltar para "em breve".
- Para ver localmente, abra um servidor na pasta do projeto: `python3 -m http.server` e acesse http://localhost:8000. Abrir o `index.html` direto (file://) não carrega os JSON.
