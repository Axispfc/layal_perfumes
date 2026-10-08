import { spawnSync } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
const result = spawnSync('npm', ['audit', '--json'], {encoding:'utf8',maxBuffer:10*1024*1024});
if (result.error) throw result.error;
let report;
try { report = JSON.parse(result.stdout); } catch { throw new Error(`Audit did not return JSON: ${result.stderr}`); }
writeFileSync('audit-report.json', JSON.stringify(report,null,2));
if (report.error) throw new Error(JSON.stringify(report.error));
console.log(JSON.stringify({counts:report.metadata?.vulnerabilities,packages:report.vulnerabilities},null,2));

// Temporary, documented exception for an unpatched development-only advisory.
const lock = JSON.parse(readFileSync('package-lock.json','utf8'));
const serious = new Set(['moderate','high','critical']);
for (const vulnerability of Object.values(report.vulnerabilities ?? {})) {
 if (!serious.has(vulnerability.severity)) continue;
 const devOnly = vulnerability.nodes.length > 0 && vulnerability.nodes.every(path => lock.packages[path]?.dev === true);
 const advisories = vulnerability.via.filter(item => typeof item === 'object');
 const knownOnly = advisories.every(item => item.url === 'https://github.com/advisories/GHSA-vfj7-8cjw-p6xm');
 if (!devOnly || !knownOnly) throw new Error(`Unaccepted vulnerability: ${vulnerability.name}`);
}
console.log('Known development-only advisory remains; see docs/SECURITY.md. Production audit runs separately.');
