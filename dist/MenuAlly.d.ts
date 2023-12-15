type Elements = {
    menuButton: Element | null;
    menuElement: Element | null;
    menuItemsElement: NodeListOf<Element> | null;
};
type MenuAllyInitOptions = {
    ariaLabel: string | null;
    ariaExpanded: boolean | null;
};
declare class MenuAlly {
    menuControl: string;
    menu: string;
    menuItems?: string;
    initOptions?: MenuAllyInitOptions;
    constructor(menuControl: string, menu: string, menuItems?: string, initOptions?: MenuAllyInitOptions);
    getElements(): Elements;
    createTabTrap(): void;
}
export default MenuAlly;
