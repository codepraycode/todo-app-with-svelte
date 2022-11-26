export function selectOnFocus(node) {
    if (node && typeof node.select === 'function') { // making sure the node is defined and has the select() method

        const onFocus = (event) => node.select() // event handler

        node.addEventListener('focus', onFocus); // when the node gets focus call onFocus

        return {
            // this will be executed when the node is removed from the DOM
            destroy: () => node.removeEventListener('focus', onFocus)
        }
    }
}


export const focusOnInit = (node) => node && typeof node.focus === 'function' && node.focus();