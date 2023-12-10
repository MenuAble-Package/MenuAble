import handleKeyPress from './utils/handleKeyPress';

type Elements = {
  menuButton: Element | null;
  menuElement: Element | null;
  menuItemsElement: NodeListOf<Element> | null;
};

class MenuAlly {
  menuControl: string;
  menu: string;
  menuItems?: string;

  constructor(menuControl: string, menu: string, menuItems?: string) {
    this.menuControl = menuControl;
    this.menu = menu;
    this.menuItems = menuItems;
  }

  getElements(): Elements {
    const menuButton = document.querySelector(`${this.menuControl}`);
    const menuElement = document.querySelector(`${this.menu}`);
    const menuItemsElement = document.querySelectorAll(`${this.menu}`);

    return { menuButton, menuElement, menuItemsElement };
  }

  createTabTrap(): void {
    const { menuButton, menuElement } = this.getElements();

    if (menuButton !== null && menuElement !== null) {
      menuButton.addEventListener('click', () => {
        if (menuButton.getAttribute('aria-expanded') === 'true') {
          menuButton.setAttribute('aria-expanded', 'false');
        } else {
          menuButton.setAttribute('aria-expanded', 'true');
        }

        const lastFocusedElement = document.activeElement;
        const focusableMenuItems = menuElement.querySelectorAll(
          `${this.menu} > a, ${this.menu} > button ${this.menu} > input`,
        );

        const firstTabStop = focusableMenuItems[0] as HTMLElement;
        firstTabStop.focus();

        focusableMenuItems.forEach(item => {
          item.addEventListener('keyup', event => {
            handleKeyPress(
              event as KeyboardEvent,
              lastFocusedElement as HTMLElement,
              focusableMenuItems as NodeListOf<HTMLElement>,
            );
          });
        });
      });
    } else {
      throw new Error(
        'MenuAlly must be instantiated with a menu control and a menu!',
      );
    }
  }
}

export default MenuAlly;
