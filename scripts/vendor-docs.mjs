// Implements the vendor contract in rac-core's ADR-101: sparse-checkout each
// source repo's docs/ at build time, never commit the result.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(root, 'vendor.config.json'), 'utf8'));
const vendorDir = join(root, '.vendor');
const contentDir = join(root, 'src', 'content');

for (const { slug, repo, ref, path } of manifest) {
  const checkoutDir = join(vendorDir, slug);
  const targetDir = join(contentDir, slug);

  console.log(`Vendoring ${repo}#${ref}:${path} -> src/content/${slug}`);

  rmSync(checkoutDir, { recursive: true, force: true });
  mkdirSync(checkoutDir, { recursive: true });

  const git = (args) => execFileSync('git', args, { cwd: checkoutDir, stdio: 'inherit' });

  git(['init', '-q']);
  git(['remote', 'add', 'origin', repo]);
  git(['sparse-checkout', 'set', '--no-cone', path]);
  git(['fetch', '--depth', '1', 'origin', ref]);
  git(['checkout', 'FETCH_HEAD']);

  const sourceDir = join(checkoutDir, path);
  if (!existsSync(sourceDir)) {
    throw new Error(`Vendor source ${repo}#${ref} has no ${path}/ directory`);
  }

  rmSync(targetDir, { recursive: true, force: true });
  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
}
