document.addEventListener('DOMContentLoaded', () => {
  const shareBtn = document.getElementById('shareBtn');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    if (msg) toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => showToast('Link copied to clipboard!'))
      .catch(() => showToast('Copy URL from your browser bar'));
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const data = {
        title: 'Richards | Official Links',
        text: 'Richards official profile & exclusive links.',
        url: window.location.href
      };
      if (navigator.share) {
        try {
          await navigator.share(data);
        } catch (e) {
          if (e.name !== 'AbortError') copyLink();
        }
      } else {
        copyLink();
      }
    });
  }
});
