import { Popover } from '../Popover';

describe('Popover', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <button class="popover-btn" data-title="Test Title" data-content="Test Content">Btn</button>
        `;
    });

    test('should create popover with content from data-attributes', () => {
        const btn = document.querySelector('.popover-btn');
        const popover = new Popover(btn);
        
        btn.click();
        
        const popoverElement = document.querySelector('.popover');
        expect(popoverElement).not.toBeNull();
        expect(popoverElement.textContent).toContain('Test Title');
        expect(popoverElement.textContent).toContain('Test Content');
    });
});