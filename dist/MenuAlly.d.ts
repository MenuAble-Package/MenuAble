declare class MenuAlly {
    menuControl: string;
    menu: string;
    menuItems?: string;
    constructor(menuControl: string, menu: string, menuItems?: string);
    getElements(): {
        menuButton: Element | null;
        menuElement: Element | null;
        menuItemsElement: NodeListOf<Element>;
    };
    createTabTrap(): void;
}
export default MenuAlly;
