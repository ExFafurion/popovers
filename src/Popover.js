export default class Popover {
  constructor(triggerElement, options = {}) {
    this.trigger = triggerElement;
    this.title = options.title || 'Popover title';
    this.content = options.content || 'And here’s some amazing content. It’s very engaging. Right?';
    this.visible = false;
    this.popoverElement = null;
    this.init();
  }

  init() {
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
  }

  toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this.visible) return;
    this.createPopover();
    this.positionPopover();
    this.visible = true;
  }

  hide() {
    if (!this.visible || !this.popoverElement) return;
    this.popoverElement.remove();
    this.popoverElement = null;
    this.visible = false;
  }

  createPopover() {
    const div = document.createElement('div');
    div.className = 'popover';
    div.innerHTML = `
      <div class="popover-arrow"></div>
      <h3 class="popover-header">${this.escapeHtml(this.title)}</h3>
      <div class="popover-body">${this.escapeHtml(this.content)}</div>
    `;
    document.body.appendChild(div);
    this.popoverElement = div;
  }

  positionPopover() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let top = triggerRect.top + scrollTop - popoverRect.height - 8;
    let left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (popoverRect.width / 2);

    // Если сверху не влезает — показываем снизу
    if (top < scrollTop) {
      top = triggerRect.bottom + scrollTop + 8;
    }
    // Корректировка по горизонтали, чтобы не вылезало за экран
    if (left < scrollLeft) {
      left = scrollLeft + 5;
    }
    if (left + popoverRect.width > window.innerWidth + scrollLeft) {
      left = window.innerWidth + scrollLeft - popoverRect.width - 5;
    }

    this.popoverElement.style.top = `${top}px`;
    this.popoverElement.style.left = `${left}px`;
  }

  escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }
}
