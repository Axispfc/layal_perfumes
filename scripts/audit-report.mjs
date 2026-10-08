import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const result = spawnSync('npm', ['audit', '--json'], {encoding:'utf8',maxBuffer:10*1024*1024});
if (result.error) throw result.error;
let report;
try { report = JSON.parse(result.stdout); } catch { throw new Error(`Audit did not return JSON: ${result.stderr}`); }
writeFileSync('audit-report.json', JSON.stringify(report,null,2));
if (report.error) throw new Error(JSON.stringify(report.error));
console.log(JSON.stringify({counts:report.metadata?.vulnerabilities,packages:report.vulnerabilities},null,2));
