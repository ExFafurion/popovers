import { Popover } from './Popover';

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.popover-btn');
    buttons.forEach(btn => new Popover(btn));
});