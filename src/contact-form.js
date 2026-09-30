import './contact-form.css';
import { initForm } from '@formspree/ajax/dist/index.mjs';

const form = document.querySelector('#contactForm');
const button = form.querySelector('[type="submit"]');
const note = document.querySelector('#contactNote');
const dialog = document.querySelector('#contactSuccess');
const close = document.querySelector('#closeContactSuccess');
const submitLabel = button.textContent;

close?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog?.addEventListener('close', () => button.focus());

initForm({
  formElement: form,
  formId: 'xwlpzadz',
  useDefaultStyles: false,
  disable: () => {
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.textContent = 'Sending…';
    note.dataset.state = 'sending';
    note.textContent = 'Sending your message securely…';
  },
  enable: () => {
    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.textContent = submitLabel;
  },
  onSuccess: ({ form: submittedForm }) => {
    submittedForm.reset();
    note.dataset.state = 'success';
    note.textContent = 'Message sent! Thanks for reaching out. I’ll get back to you as soon as possible.';
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
  },
  onError: (_context, error) => {
    const messages = [
      ...error.getFormErrors().map(item => item.message),
      ...error.getAllFieldErrors().flatMap(([, items]) => items.map(item => item.message)),
    ].filter(Boolean);
    note.dataset.state = 'error';
    note.textContent = messages.join(' ') || 'Your message could not be sent. Please try again or email me directly.';
  },
  onFailure: (_context, error) => {
    note.dataset.state = 'error';
    note.textContent = error instanceof Error && !(error instanceof TypeError)
      ? error.message
      : 'Could not connect. Your message is still here. Check your internet connection and try again, or email me directly.';
  },
});
