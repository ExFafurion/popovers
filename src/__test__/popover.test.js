import Popover from '../Popover';

describe('Popover', () => {
  let button;
  let popoverInstance;

  beforeEach(() => {
    document.body.innerHTML = '<button id="testBtn">Click</button>';
    button = document.getElementById('testBtn');
    popoverInstance = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });
  });

  afterEach(() => {
    if (popoverInstance.popoverElement) {
      popoverInstance.popoverElement.remove();
    }
    document.body.innerHTML = '';
  });

  test('should show popover on first click', () => {
    button.click();
    const popoverDiv = document.querySelector('.popover');
    expect(popoverDiv).not.toBeNull();
    expect(popoverDiv.querySelector('.popover-header').textContent).toBe('Test Title');
    expect(popoverDiv.querySelector('.popover-body').textContent).toBe('Test Content');
  });

  test('should hide popover on second click', () => {
    button.click();
    button.click();
    const popoverDiv = document.querySelector('.popover');
    expect(popoverDiv).toBeNull();
  });
});
