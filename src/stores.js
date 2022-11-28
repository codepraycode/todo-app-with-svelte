import { writable } from 'svelte/store';

export const localStore = (key, initial) => {                 // receives the key of the local storage and an initial value

    const toString = (value) => JSON.stringify(value, null, 2)  // helper function
    const toObj = JSON.parse                                    // helper function

    if (localStorage.getItem(key) === null) {                   // item not present in local storage
        localStorage.setItem(key, toString(initial))              // initialize local storage with initial value
    }

    const saved = toObj(localStorage.getItem(key))              // convert to object

    const { subscribe, set, update } = writable(saved)          // create the underlying writable store

    return {
        subscribe,
        set: (value) => {
            localStorage.setItem(key, toString(value))              // save also to local storage as a string
            return set(value)
        },
        update
    }
}

const initialTodo = [
    { id: 1, name: 'Visit MDN web docs', completed: true },
    { id: 2, name: 'Complete the Svelte Tutorial', completed: false },
]

export const alert = writable("Welcome to the to-do list app!");

export const todos = localStore('mdn-svelte-todo', initialTodo);