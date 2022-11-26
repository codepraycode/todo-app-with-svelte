<script>

    // Make todo a prop
    export let todos = [];

    // $: sets a prop to reactivate mode to run on each re-render
    $: totalTodos = todos.length;
    $: completedTodos = todos.filter((todo)=>todo.completed).length;

    let newTodoName = '';
    let newTodoId;

    $:{
        if (totalTodos === 0){
            newTodoId = 1;
        }else{
            newTodoId = Math.max(...todos.map((t)=>t.id)) + 1;
        }
    }
    // $: console.log(newTodoName);

    function removeTodo(todo){
        todos = todos.filter((t)=>t.id !== todo.id);
    }

    function addTodo(){
        todos = [...todos, {
            id:newTodoId,
            name:newTodoName,
            completed:false,
        }];

        newTodoName = '';
    }

    // Filtering feature
    let filter = 'all';

    const filterTodos = (filter, todos) =>{
        if(filter === "active"){
            return todos.filter((t)=>!t.completed);
        }else if(filter === 'completed'){
            return todos.filter((t)=>t.completed);
        }
        else{
            return todos
        }
    }

</script>

<div class="todoapp stack-large">
    <!-- New todo -->

    <form on:submit|preventDefault={addTodo}>

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
            bind:value={newTodoName}
        />
        

        <button type="submit" disabled="" 
            class="btn btn__primary btn__lg">
            Add
        </button>
    </form>


    <!-- Filter -->
    <div class="filters btn-group stack-exception">
        
        <button 
            class="btn toggle-btn" 
            aria-pressed={filter === 'all'}
            class:btn__primary={filter === 'all'}
            on:click={()=>filter='all'}
        >
            <span class="visually-hidden">Show</span>
            <span>All</span>
            <span class="visually-hidden">tasks</span>
        </button>


        <button 
            class="btn toggle-btn" 
            aria-pressed={filter === 'active'}
            class:btn__primary={filter === 'active'}
            on:click={()=>filter='active'}
        >
            <span class="visually-hidden">Show</span>
            <span>Active</span>
            <span class="visually-hidden">tasks</span>
        </button>

        <button 
            class="btn toggle-btn" 
            aria-pressed={filter === 'completed'}
            class:btn__primary={filter === 'completed'}
            on:click={()=>filter='completed'}
        >
            <span class="visually-hidden">Show</span>
            <span>Completed</span>
            <span class="visually-hidden">tasks</span>
        </button>

    </div>

    <!-- Todo status -->
    <h2 id="list-heading">{completedTodos} out of {totalTodos} items completed</h2>

    <!-- <ul>
        {#each todos as todo, index (todo.id)}
        <li>
            <input type="checkbox" checked={todo.completed}/>

            {index}. {todo.name} (id:{todo.id})

        </li>
        {:else}
            Nothing to do here!
        {/each}
    </ul> -->

    <!-- Todos -->
    <ul 
        class="todo-list stack-large" 
        aria-labelledby="list-heading"
    >
        {#each filterTodos(filter, todos) as todo (todo.id)}


        <!-- <li class="todo">
            
            <div class="stack-small">
                
                <form class="stack-small">
                    
                    <div class="form-group">
                        <label for="todo-1" class="todo-label">
                            New name for 'Create a Svelte starter app'
                        </label>

                        <input 
                            type="text"
                            id="todo-1"
                            autocomplete="off"
                            class="todo-text"
                        />
                    </div>

                    <div class="btn-group">
                        
                        <button class="btn todo-cancel" type="button">
                            Cancel

                            <span class="visually-hidden">renaming Create a svelte starter app</span>
                        </button>

                        <button class="btn btn__primary todo-edit" type="submit">
                            Save

                            <span class="visually-hidden">
                                new name for Create a Svelte starter app
                            </span>
                        </button>

                    </div>

                </form>

            </div>

        </li> -->

            <li class="todo">
                
                <div class="stack-small">

                    <div class="c-cb">
                        <input 
                            type="checkbox" 
                            id="todo-{todo.id}" 
                            checked={todo.completed}
                            on:click={()=>todo.completed = !todo.completed}
                        />

                        <label for="todo-{todo.id}" class="todo-label">
                            {todo.name}
                        </label>

                    </div>
                    
                    <div class="btn-group">
                        
                        <button class="btn" type="button">
                            Edit

                            <span class="visually-hidden">
                                {todo.name}
                            </span>
                        </button>

                        <button 
                            class="btn btn__danger"
                            on:click={()=>removeTodo(todo)}
                        >
                            Delete

                            <span class="visually-hidden">
                                {todo.name}
                            </span>
                        </button>

                    </div>

                </div>

            </li>


        {:else}
            <li>Nothing to do here!</li>
        {/each}
        
    </ul>


    <hr/>

    <!-- More actions -->
    <div class="btn-group">

        <button type="button" class="btn btn__primary">
            Check all
        </button>

        <button type="button" class="btn btn__primary">
            Remove completed
        </button>

    </div>

</div>