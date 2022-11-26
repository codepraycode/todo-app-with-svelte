<script>
    import FilterButtons from './components/FilterButton.svelte';
    import Todo from './components/Todo.svelte';
    import Todos from './components/Todo.svelte';

    let todos = [
        { id: 1, name: "Create a Svelte starter app", completed: true },
        { id: 2, name: "Create your first component", completed: true },
        { id: 3, name: "Complete the rest of the tutorial", completed: false }
    ];

    // Make todo a prop
    // export let todos = [];

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

<!-- <Todos {todos}/> -->

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
    <FilterButtons bind:filter={filter} />
    
    <!-- {filter} onclick={ (clicked)=> filter = clicked }/> -->

    <!-- Todo status -->
    <h2 id="list-heading">{completedTodos} out of {totalTodos} items completed</h2>

    <!-- Todos -->
    <ul 
        class="todo-list stack-large" 
        aria-labelledby="list-heading"
    >
        {#each filterTodos(filter, todos) as todo (todo.id)}


            <li class="todo">
                <Todo {todo} on:remove={e=>removeTodo(e.detail)}/>

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