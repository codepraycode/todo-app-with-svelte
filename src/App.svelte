<script>
    import FilterButtons from './components/FilterButton.svelte';
    import MoreActions from './components/MoreActions.svelte';
    import NewTodo from './components/NewTodo.svelte';
    import Todo from './components/Todo.svelte';

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

    function addTodo(name){
        todos = [
            ...todos,
            { id:newTodoId, name, completed:false}
        ];

        newTodoName = '';
    }

    function updateTodo(todo){
        const i = todos.findIndex(t=>t.id === todo.id);

        todos[i] = {...todo[i], ...todo};
    }
    
    const checkAllTodos = (completed)=> {
        
        todos = todos.map((t)=>( {...t,completed} ))
    };

    const removeCompletedTodos = ()=> todos = todos.filter(t=>!t.completed);

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

    <NewTodo
        on:addTodo={e=>addTodo(e.detail)}
        autofocus
    />


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
                <Todo 
                    {todo} 
                    on:remove={e=>removeTodo(e.detail)}
                    on:update={e=>updateTodo(e.detail)}
                />

            </li>


        {:else}
            <li>Nothing to do here!</li>
        {/each}
        
    </ul>


    <hr/>

    <!-- More actions -->
    <MoreActions 
        on:checkAll={e=> checkAllTodos(e.detail)}
        on:removeCompleted={removeCompletedTodos}
    />

</div>