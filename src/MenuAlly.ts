import handleKeyPress from "./utils/handleKeyPress";

class MenuAlly {
	menuControl: string;
	menu: string;
	menuItems?: string;

	constructor(menuControl: string, menu: string, menuItems?: string) {
		this.menuControl = menuControl;
		this.menu = menu;
		this.menuItems = menuItems;
	}

	getElements() {
		const menuButton = document.querySelector(`${this.menuControl}`);
		const menuElement = document.querySelector(`${this.menu}`);
		const menuItemsElement = document.querySelectorAll(`${this.menu}`);

		return { menuButton, menuElement, menuItemsElement };
	}

	createTabTrap() {
		const { menuButton, menuElement, menuItemsElement } =
			this.getElements();

		if (menuButton && menuElement) {
			menuButton.addEventListener("click", () => {
				if (menuButton.getAttribute("aria-expanded") === "true") {
					menuButton.setAttribute("aria-expanded", "false");
				} else {
					menuButton.setAttribute("aria-expanded", "true");
				}

				let lastFocusedElement = document.activeElement;
				let focusableMenuItems = menuElement.querySelectorAll("a");

				let firstTabStop = focusableMenuItems[0];
				firstTabStop.focus();

				focusableMenuItems.forEach((item) => {
					item.addEventListener("keyup", (event) =>
						handleKeyPress(
							event,
							lastFocusedElement as HTMLElement,
							focusableMenuItems,
							menuButton as HTMLElement
						)
					);
				});
			});
		} else {
			throw new Error(
				"MenuAlly must be instantiated with a menu control and a menu!"
			);
		}
	}
}

export default MenuAlly;
