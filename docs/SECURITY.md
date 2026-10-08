# Auditoria de dependências — 8 de outubro de 2026

Fonte: `npm audit --json` executado no GitHub Actions para o commit `0ae30e69c7dc8b518edd5b6420457bd3760424ae`. O lockfile recuperado do artefato dessa execução foi incluído para tornar as instalações reproduzíveis.

| Gravidade | Pacotes afetados |
| --- | ---: |
| Crítica | 0 |
| Alta | 5 |
| Moderada | 0 |
| Baixa | 0 |
| Informativa | 0 |

## Pendência sem correção compatível publicada

Os cinco pacotes são `braces`, `micromatch`, `fast-glob`, `@next/eslint-plugin-next` e `eslint-config-next`. Representam uma vulnerabilidade raiz e sua propagação pela cadeia de dependências, não cinco falhas independentes.

A falha de recursão excessiva pode esgotar a pilha ao processar padrões profundamente aninhados. O relatório npm classifica o aviso como alto (CVSS v3: 7,5). Fonte oficial: [GHSA-vfj7-8cjw-p6xm / CVE-2026-93687](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), afetando `braces <=3.0.3`, sem versão corrigida informada na consulta.

No lockfile, todos os cinco pacotes pertencem às dependências de desenvolvimento da ferramenta de lint. A aplicação não recebe padrões de glob de visitantes para processar por essa cadeia. Isso limita a exposição, mas não elimina a vulnerabilidade da ferramenta. Não processe padrões externos não confiáveis no lint.

O npm sugere rebaixar `eslint-config-next` para 14.2.35. Essa mudança de versão principal diverge do Next.js 16 da aplicação e não foi aplicada. Não foram usadas versões corretivas fictícias, overrides incompatíveis ou `npm audit fix --force`.

O CI registra o relatório completo, verifica a auditoria de produção separadamente e permite somente esse aviso conhecido em pacotes exclusivamente de desenvolvimento. Novos avisos moderados, altos ou críticos fazem a etapa de auditoria falhar. Esta exceção deve ser removida quando houver uma atualização compatível corrigida.

## Verificação

```sh
npm ci
node scripts/audit-report.mjs
npm audit --omit=dev --audit-level=moderate
```

Os números são uma fotografia da auditoria, não uma garantia permanente. Consulte o relatório do CI mais recente antes da publicação.
