export class Popover {
    constructor(element) {
        this.element = element;
        this.popover = null;
        this.init();
    }

    init() {
        this.element.addEventListener('click', () => this.toggle());
    }

    toggle() {
        if (this.popover) {
            this.remove();
        } else {
            this.create();
        }
    }

    create() {
        const title = this.element.getAttribute('data-title') || 'Без заголовка';
        const content = this.element.getAttribute('data-content') || 'Нет контента';

        this.popover = document.createElement('div');
        this.popover.className = 'popover';

        const titleEl = document.createElement('div');
        titleEl.className = 'popover-title';
        titleEl.textContent = title;

        const contentEl = document.createElement('div');
        contentEl.className = 'popover-content';
        contentEl.textContent = content;

        const arrow = document.createElement('div');
        arrow.className = 'popover-arrow';

        this.popover.append(titleEl, contentEl, arrow);

        const btnRect = this.element.getBoundingClientRect();
        const popRect = this.popover.getBoundingClientRect();

        const top = btnRect.top - popRect.height - 10;
        const left = btnRect.left + (btnRect.width / 2) - (popRect.width / 2);

        this.popover.style.top = `${top + window.scrollY}px`;
        this.popover.style.left = `${left + window.scrollX}px`;

        document.body.append(this.popover);
    }

    remove() {
        this.popover.remove();
        this.popover = null;
    }
}