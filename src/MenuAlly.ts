import handleKeyPress from './utils/handleKeyPress.ts';

type Elements = {
  menuButton: Element | null;
  menuElement: Element | null;
  focusableMenuItems: HTMLElement[] | NodeListOf<HTMLElement>;
};

type MenuAllyInitOptions = {
  ariaLabel: string | null;
  ariaExpanded: boolean | null;
};

class MenuAlly {
  menuControl: string;
  menu: string;
  menuItems?: string;
  initOptions?: MenuAllyInitOptions;

  constructor(
    menuControl: string,
    menu: string,
    menuItems?: string,
    initOptions?: MenuAllyInitOptions,
  ) {
    this.menuControl = menuControl;
    this.menu = menu;
    this.menuItems = menuItems;
    this.initOptions = initOptions;
  }

  getElements(): Elements {
    const menuButton = document.querySelector(`${this.menuControl}`);
    const menuElement = document.querySelector(`${this.menu}`);

    let focusableMenuItems: HTMLElement[] | NodeListOf<HTMLElement>;

    if (menuElement !== null && this.menuItems === undefined) {
      const menuChildren = Array.from(menuElement.children);

      focusableMenuItems = menuChildren.filter(child => {
        return (
          child instanceof HTMLAnchorElement ||
          child instanceof HTMLButtonElement ||
          child instanceof HTMLInputElement
        );
      }) as HTMLElement[];
    } else {
      focusableMenuItems = document.querySelectorAll(`${this.menuItems}`);
    }

    return { menuButton, menuElement, focusableMenuItems };
  }

  createTabTrap(): void {
    const { menuButton, menuElement, focusableMenuItems } = this.getElements();

    if (menuButton !== null && menuElement !== null) {
      if (this.initOptions?.ariaExpanded === true) {
        menuButton.setAttribute('aria-expanded', 'true');
      }

      menuButton.setAttribute('aria-expanded', 'false');

      menuElement.setAttribute('role', 'menu');

      menuButton.addEventListener('click', () => {
        if (menuButton.getAttribute('aria-expanded') === 'true') {
          menuButton.setAttribute('aria-expanded', 'false');
        } else {
          menuButton.setAttribute('aria-expanded', 'true');
        }

        if (focusableMenuItems.length === 0) {
          throw new Error(
            'Unable to create tab trap. No focusable element was given and no direct children exist',
          );
        } else {
          const lastFocusedElement = document.activeElement;

          const firstTabStop = focusableMenuItems[0];
          firstTabStop.focus();

          focusableMenuItems.forEach(item => {
            item.addEventListener('keyup', event => {
              handleKeyPress(
                event,
                lastFocusedElement as HTMLElement,
                focusableMenuItems as HTMLElement[],
              );
            });
          });
        }
      });
    } else {
      throw new Error(
        'MenuAlly must be instantiated with a menu control and a menu!',
      );
    }
  }
}

export default MenuAlly;
