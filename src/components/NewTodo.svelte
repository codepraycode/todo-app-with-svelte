<script>
    import {createEventDispatcher, onMount} from 'svelte';

    export let autofocus = false;

    const dispatch = createEventDispatcher();

    let name = '';
    let nameElement; // reference to the input DOM node

    const addTodo = () =>{
        dispatch('addTodo', name);

        name = '';
        nameElement.focus();
    }


    const onCancel = () => {
        
        name = '';
        nameElement.focus();

    };

    onMount(()=> autofocus && nameElement.focus());

</script>


<form 
    on:submit|preventDefault={addTodo}
    on:keydown={e=>e.key === 'Escape' && onCancel()}
>

    <h2 class="label-wrapper">
        <label for="todo-0" class="label__lg">
            What needs to be done?
        </label>
    </h2>


    <!-- 
        Binding value to input
        
        Method one-> on:keydown={(e)=>newTodoName=e.target.value}
        
        Method two-> bind:value={newTodoName}
            with value prop removed


        -->
    <input 
        type="text"
        id="todo-0"
        autocomplete="off"
        class="input input__lg"
        bind:value={name}
        bind:this={nameElement}
    />
    

    <button type="submit" disabled={!name}
        class="btn btn__primary btn__lg">
        Add
    </button>
</form>