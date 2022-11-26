<script>

    export let todo;
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

    let editing = false; // track editing mode
    let name = todo.name // hold the name of the to-do being edited



    function update(updatedTodo){

        todo = {...todo, ...updatedTodo};
        dispatch('update', todo);
    }

    function onCancel(){
        name = todo.name;

        editing = false;
    }

    function onSave(){
        update({ name });

        editing = false;
    }

    function onRemove(){
        dispatch('remove', todo);
    }

    function onEdit(){
        editing = true;
    }

    function onToggle(){
        update({completed: !todo.completed});
    }

</script>


<div class="stack-small">

    {#if editing}

        <form 
            on:submit|preventDefault={onSave} 
            class="stack-small"
            on:keydown={e=>e.key === 'Escape' && onCancel()}
        >

            <div class="form-group">

                <label for="todo-{todo.id}" class="todo-label">
                    New name '{todo.name}'
                </label>

                <input 
                    type="text"
                    id="todo-{todo.id}"
                    autocomplete="off"
                    class="todo-text"
                    bind:value={name}
                />

            </div>

            <div class="btn-group">

                <button class="btn todo-cancel" on:click={onCancel}>
                    Cancel 
                    <span class="visually-hidden">renaming {todo.name}</span>
                </button>


                <button 
                    class="btn btn__primary todo-edit"
                    type="submit"
                    disabled={!name}
                >
                    Save
                    <span class="visually-hidden">new name for {todo.name}</span>
                </button>

            </div>
        </form>

    {:else}

        <div class="c-cb">
            <input 
                type="checkbox" 
                id="todo-{todo.id}" 
                checked={todo.completed}
                on:click={onToggle}
            />

            <label for="todo-{todo.id}" class="todo-label">
                {todo.name}
            </label>

        </div>
        
        <div class="btn-group">
            
            <button class="btn" type="button" on:click={onEdit}>
                Edit

                <span class="visually-hidden">
                    {todo.name}
                </span>
            </button>

            <button 
                class="btn btn__danger"
                on:click={onRemove}
            >
                Delete

                <span class="visually-hidden">
                    {todo.name}
                </span>
            </button>

        </div>

    {/if}

    
</div>
