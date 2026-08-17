import { BLOG_SEED } from '../data/blogSeed';

/* ATENÇÃO: sem backend, os posts vivem no localStorage do navegador que
   edita. Quem publica vê as mudanças; visitantes veem apenas a semente.
   Para valer para todo mundo é preciso banco + API — ver README do blog. */
const KEY = 'mv-blog-posts-v1';
export const BLOG_CHANGED = 'mv-blog-changed';

const canStore = () => {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
};

export function loadPosts() {
  if (!canStore()) return BLOG_SEED;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      window.localStorage.setItem(KEY, JSON.stringify(BLOG_SEED));
      return BLOG_SEED;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : BLOG_SEED;
  } catch {
    return BLOG_SEED;
  }
}

export function savePosts(posts) {
  if (!canStore()) return { ok: false, error: 'Este navegador não permite salvar.' };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event(BLOG_CHANGED));
    return { ok: true };
  } catch (e) {
    /* QuotaExceededError: quase sempre foto grande demais em base64 */
    const quota = e?.name === 'QuotaExceededError' || e?.code === 22;
    return {
      ok: false,
      error: quota
        ? 'Espaço do navegador esgotado. Use fotos menores ou remova posts antigos.'
        : 'Não foi possível salvar as alterações.',
    };
  }
}

/* Só os publicados, do mais recente para o mais antigo */
export function listPublished() {
  return loadPosts()
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function findBySlug(slug) {
  return loadPosts().find((p) => p.slug === slug) || null;
}

export function slugify(text) {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
}

/* Garante slug único mesmo com títulos repetidos */
export function uniqueSlug(base, posts, ignoreId) {
  const root = slugify(base) || 'post';
  let slug = root;
  let n = 2;
  while (posts.some((p) => p.slug === slug && p.id !== ignoreId)) {
    slug = `${root}-${n}`;
    n += 1;
  }
  return slug;
}

export function upsertPost(post) {
  const posts = loadPosts();
  const i = posts.findIndex((p) => p.id === post.id);
  const next = i >= 0 ? posts.map((p) => (p.id === post.id ? post : p)) : [post, ...posts];
  const result = savePosts(next);
  return result.ok ? { ...result, posts: next } : result;
}

export function removePost(id) {
  const next = loadPosts().filter((p) => p.id !== id);
  const result = savePosts(next);
  return result.ok ? { ...result, posts: next } : result;
}

export function resetPosts() {
  const result = savePosts(BLOG_SEED);
  return result.ok ? { ...result, posts: BLOG_SEED } : result;
}

export function emptyPost() {
  return {
    id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    cover: '',
    images: [],
    author: 'Mattos',
    date: new Date().toISOString().slice(0, 10),
    published: true,
  };
}

/* Redimensiona no canvas antes de virar base64 — foto de celular crua
   estoura o localStorage em um ou dois posts */
export function fileToImage(file, maxSide = 1400, quality = 0.78) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Arquivo não é uma imagem.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Falha ao abrir a imagem.'));
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
