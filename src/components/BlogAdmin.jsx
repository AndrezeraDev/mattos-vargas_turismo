import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiExternalLink, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import {
  emptyPost,
  fileToImage,
  formatDate,
  loadPosts,
  removePost,
  resetPosts,
  uniqueSlug,
  upsertPost,
} from '../lib/blogStore';
import './BlogAdmin.css';

export default function BlogAdmin() {
  const [posts, setPosts] = useState(() => loadPosts());
  const [draft, setDraft] = useState(null);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const flash = (type, text) => {
    setNotice({ type, text });
    window.setTimeout(() => setNotice(null), 4000);
  };

  const apply = (result, okText) => {
    if (!result.ok) {
      flash('error', result.error);
      return false;
    }
    setPosts(result.posts);
    flash('ok', okText);
    return true;
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) {
      flash('error', 'O post precisa de um título.');
      return;
    }
    const post = {
      ...draft,
      title: draft.title.trim(),
      slug: uniqueSlug(draft.slug || draft.title, posts, draft.id),
    };
    if (apply(upsertPost(post), 'Post salvo.')) setDraft(null);
  };

  const onDelete = (post) => {
    if (!window.confirm(`Remover "${post.title}"? Isso não pode ser desfeito.`)) return;
    apply(removePost(post.id), 'Post removido.');
    if (draft?.id === post.id) setDraft(null);
  };

  const onReset = () => {
    if (!window.confirm('Isso apaga tudo e volta aos 4 posts de exemplo. Continuar?')) return;
    apply(resetPosts(), 'Posts de exemplo restaurados.');
    setDraft(null);
  };

  const onPickImage = async (e, field) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setBusy(true);
    try {
      const encoded = await Promise.all(files.map((f) => fileToImage(f)));
      setDraft((d) =>
        field === 'cover'
          ? { ...d, cover: encoded[0] }
          : { ...d, images: [...(d.images || []), ...encoded] }
      );
    } catch (err) {
      flash('error', err.message);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <main className="admin">
      <div className="wrap-wide">
        <header className="admin-head">
          <div>
            <p className="admin-kicker">Blog · administração</p>
            <h1 className="headline">Gerenciar posts</h1>
          </div>
          <div className="admin-head-actions">
            <Link to="/blog" className="admin-btn ghost">
              <FiExternalLink /> Ver o blog
            </Link>
            <button
              type="button"
              className="admin-btn"
              onClick={() => setDraft(emptyPost())}
            >
              <FiPlus /> Novo post
            </button>
          </div>
        </header>

        <p className="admin-warning">
          <strong>Atenção:</strong> os posts ficam salvos neste navegador. As
          alterações aparecem para você, mas ainda não para os visitantes do
          site — para isso é preciso um banco de dados.
        </p>

        {notice && <p className={`admin-notice is-${notice.type}`}>{notice.text}</p>}

        {draft && (
          <form className="admin-form" onSubmit={onSave}>
            <div className="admin-form-head">
              <h2>{posts.some((p) => p.id === draft.id) ? 'Editar post' : 'Novo post'}</h2>
              <button
                type="button"
                className="admin-icon"
                onClick={() => setDraft(null)}
                aria-label="Fechar editor"
              >
                <FiX />
              </button>
            </div>

            <label>
              Título
              <input
                value={draft.title}
                onChange={(e) => set({ title: e.target.value })}
                placeholder="Ex.: Merlot, a uva que encontrou casa na Serra"
              />
            </label>

            <label>
              Resumo
              <textarea
                rows={2}
                value={draft.excerpt}
                onChange={(e) => set({ excerpt: e.target.value })}
                placeholder="Uma ou duas linhas que aparecem na lista do blog"
              />
            </label>

            <label>
              Texto
              <textarea
                rows={14}
                value={draft.content}
                onChange={(e) => set({ content: e.target.value })}
                placeholder="Escreva o post. Deixe uma linha em branco entre os parágrafos."
              />
            </label>

            <div className="admin-row">
              <label>
                Data
                <input
                  type="date"
                  value={draft.date}
                  onChange={(e) => set({ date: e.target.value })}
                />
              </label>
              <label>
                Autor
                <input
                  value={draft.author}
                  onChange={(e) => set({ author: e.target.value })}
                />
              </label>
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={draft.published}
                  onChange={(e) => set({ published: e.target.checked })}
                />
                Publicado
              </label>
            </div>

            <div className="admin-media">
              <div>
                <span className="admin-label">Foto de capa</span>
                {draft.cover && (
                  <div className="admin-thumb">
                    <img src={draft.cover} alt="" />
                    <button type="button" onClick={() => set({ cover: '' })}>
                      <FiX />
                    </button>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => onPickImage(e, 'cover')} />
              </div>

              <div>
                <span className="admin-label">Outras fotos</span>
                {draft.images?.length > 0 && (
                  <div className="admin-thumbs">
                    {draft.images.map((src, i) => (
                      <div className="admin-thumb" key={i}>
                        <img src={src} alt="" />
                        <button
                          type="button"
                          onClick={() =>
                            set({ images: draft.images.filter((_, j) => j !== i) })
                          }
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => onPickImage(e, 'images')}
                />
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn" disabled={busy}>
                {busy ? 'Processando foto…' : 'Salvar post'}
              </button>
              <button
                type="button"
                className="admin-btn ghost"
                onClick={() => setDraft(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="admin-list">
          {posts.length === 0 && <p className="admin-empty">Nenhum post ainda.</p>}
          {posts.map((p) => (
            <article className="admin-item" key={p.id}>
              <div className="admin-item-thumb">
                {p.cover ? <img src={p.cover} alt="" /> : <span>sem foto</span>}
              </div>
              <div className="admin-item-copy">
                <h3>{p.title || '(sem título)'}</h3>
                <p className="admin-item-meta">
                  {formatDate(p.date)} · /blog/{p.slug}
                  <span className={p.published ? 'tag on' : 'tag off'}>
                    {p.published ? 'publicado' : 'rascunho'}
                  </span>
                </p>
              </div>
              <div className="admin-item-actions">
                <button type="button" onClick={() => setDraft({ ...p })} aria-label="Editar">
                  <FiEdit2 />
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => onDelete(p)}
                  aria-label="Remover"
                >
                  <FiTrash2 />
                </button>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="admin-reset" onClick={onReset}>
          Restaurar os posts de exemplo
        </button>
      </div>
    </main>
  );
}
