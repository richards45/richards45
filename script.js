document.addEventListener('DOMContentLoaded', () => {
  // 1. Share Button handling
  const shareBtn = document.getElementById('shareBtn');
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (message) toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Richards | Official Links',
        text: 'Check out Richards\' official profile, photos and exclusive links.',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard();
          }
        }
      } else {
        copyToClipboard();
      }
    });
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => showToast('Link copied to clipboard!'))
      .catch(() => showToast('Copy URL from your browser address bar'));
  }

  // 2. Lightbox for gallery photos
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption');

      lightboxImg.src = src;
      lightboxCaption.textContent = caption || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 250);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});
