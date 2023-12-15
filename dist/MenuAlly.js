import handleKeyPress from './utils/handleKeyPress';
class MenuAlly {
    constructor(menuControl, menu, menuItems, initOptions) {
        this.menuControl = menuControl;
        this.menu = menu;
        this.menuItems = menuItems;
        this.initOptions = initOptions;
    }
    getElements() {
        const menuButton = document.querySelector(`${this.menuControl}`);
        const menuElement = document.querySelector(`${this.menu}`);
        const menuItemsElement = document.querySelectorAll(`${this.menu}`);
        return { menuButton, menuElement, menuItemsElement };
    }
    createTabTrap() {
        var _a;
        const { menuButton, menuElement } = this.getElements();
        if (menuButton !== null && menuElement !== null) {
            if (((_a = this.initOptions) === null || _a === void 0 ? void 0 : _a.ariaExpanded) === true) {
                menuButton.setAttribute('aria-expanded', 'true');
            }
            menuButton.setAttribute('aria-expanded', 'false');
            menuElement.setAttribute('role', 'menu');
            menuButton.addEventListener('click', () => {
                if (menuButton.getAttribute('aria-expanded') === 'true') {
                    menuButton.setAttribute('aria-expanded', 'false');
                }
                else {
                    menuButton.setAttribute('aria-expanded', 'true');
                }
                const lastFocusedElement = document.activeElement;
                const focusableMenuItems = menuElement.querySelectorAll(`${this.menu} > a, ${this.menu} > button ${this.menu} > input`);
                const firstTabStop = focusableMenuItems[0];
                firstTabStop.focus();
                focusableMenuItems.forEach(item => {
                    item.addEventListener('keyup', event => {
                        handleKeyPress(event, lastFocusedElement, focusableMenuItems);
                    });
                });
            });
        }
        else {
            throw new Error('MenuAlly must be instantiated with a menu control and a menu!');
        }
    }
}
export default MenuAlly;
