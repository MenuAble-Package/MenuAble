/**
 @description Handles keypress events within a tab trap.
 @param {Event} event - The keypress event.
 @param {Element} lastFocusedElement - The last focused element.
 @param {NodeList} itemList - NodeList of elements in the tab trap.
 @param {MenuButton} menuButton - The button responsible for toggling the menu.
 */
declare const handleKeyPress: (event: KeyboardEvent, lastFocusedElement: HTMLElement, itemList: NodeListOf<HTMLElement>, menuButton: HTMLElement) => void;
export default handleKeyPress;
