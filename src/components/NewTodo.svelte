<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    let name = '';

    const addTodo = () =>{
        dispatch('addTodo', name);

        name = '';
    }


    const onCancel = () => name = '';
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
    />
    

    <button type="submit" disabled={!name}
        class="btn btn__primary btn__lg">
        Add
    </button>
</form>