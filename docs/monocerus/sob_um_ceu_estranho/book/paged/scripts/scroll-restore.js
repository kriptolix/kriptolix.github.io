/**
 * scroll-restore.js
 * Deve ser carregado ANTES do paged.polyfill.js.
 *
 * Usa window.PagedConfig.before para registrar o handler,
 * que é a API oficial do paged.js para configuração prévia.
 * O paged lê essa config durante sua própria inicialização,
 * então Paged já está disponível quando before() é chamado.
 */

(function () {

  const STORAGE_KEY = "pagedjs_scroll_position";

  // Salva posição antes da recarga
  window.addEventListener("beforeunload", () => {
    localStorage.setItem(STORAGE_KEY, window.scrollY);
  });

  // PagedConfig.before é chamado pelo paged.js durante a inicialização,
  // nesse momento Paged já está no escopo global
  window.PagedConfig = window.PagedConfig || {};

  window.PagedConfig.before = (function (existingBefore) {
    return async function () {

      // Preserva qualquer before() já definido
      if (existingBefore) await existingBefore();

      class ScrollRestoreHandler extends Paged.Handler {
        constructor(chunker, polisher, caller) {
          super(chunker, polisher, caller);
        }

        afterRendered(pages) {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved === null) return;

          const position = parseFloat(saved);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              window.scrollTo({ top: position, behavior: "instant" });
            });
          });
        }
      }

      Paged.registerHandlers(ScrollRestoreHandler);
    };
  })(window.PagedConfig.before);

})();