const isMenuAllyControl = (element: HTMLElement): boolean => {
  if (element.dataset.menuallyControl === undefined) {
    return false;
  } else {
    return true;
  }
};

/**
 @description Handles keypress events within a tab trap.
 @param {KeyboardEvent} event - The keypress event.
 @param {Element} lastFocusedElement - The last focused element.
 @param {NodeList} itemList - NodeList of elements in the tab trap.
 */

const handleKeyPress = (
  event: KeyboardEvent,
  lastFocusedElement: HTMLElement,
  itemList: HTMLElement[],
): void => {
  const listLength = itemList.length;
  const firstTabStopIndex = 0;
  const lastTabStopIndex = listLength - 1;

  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  const currentActiveIndex = Array.from(itemList).indexOf(
    document.activeElement as HTMLElement,
  );

  switch (event.key) {
    case 'ArrowDown':
      if (isMenuAllyControl(document.activeElement as HTMLElement)) {
        // if the focused element is a registered MenuAlly control, simulate a click event and open the submenu
        (document.activeElement as HTMLElement).click();
      } else {
        // move focus to the next menuitem
        if (currentActiveIndex === lastTabStopIndex) {
          itemList[firstTabStopIndex].focus();
        } else {
          itemList[currentActiveIndex + 1].focus();
        }
      }
      break;
    case 'ArrowRight':
      break;

    case 'ArrowUp':
    case 'ArrowLeft':
      // Do something for "up arrow" or "left arrow" key press.
      if (currentActiveIndex === firstTabStopIndex) {
        itemList[lastTabStopIndex].focus();
      } else {
        itemList[currentActiveIndex - 1].focus();
      }
      break;

    case 'Escape':
    case 'Tab':
      // Should close the menu and focus on the toggle button
      lastFocusedElement.setAttribute('aria-expanded', 'false');
      lastFocusedElement.focus();
      break;

    // TODO: Support for space bar, enter, and tab key presses.
    case 'Enter':
      break;

    case ' ':
      lastFocusedElement.setAttribute('aria-expanded', 'false');
      lastFocusedElement.focus();
      (document.activeElement as HTMLElement)?.click();
      break;

    case 'Home':
      itemList[0].focus();
      break;

    case 'End':
      itemList[itemList.length - 1].focus();
      break;

    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
};

export default handleKeyPress;
