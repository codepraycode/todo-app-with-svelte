<script>
    import FilterButtons from './components/FilterButton.svelte';
    import MoreActions from './components/MoreActions.svelte';
    import NewTodo from './components/NewTodo.svelte';
    import Todo from './components/Todo.svelte';
    import TodosStatus from './components/TodosStatus.svelte';

    import {alert} from './stores';
    
    // Make todo a prop
    export let todos = [];
    
    let todoStatus; // reference to TodosStatus instance
    
    // $: sets a prop to reactivate mode to run on each re-render
    
    let newTodoName = '';
    $: newTodoId = todos.length ? Math.max(...todos.map(t=>t.id)) + 1: 1;

    function removeTodo(todo){
        todos = todos.filter((t)=>t.id !== todo.id);
        todoStatus.focus(); //give focus to status heading

        $alert = `Todo '${todo.name}' has been deleted`;
    }

    function addTodo(name){
        todos = [
            ...todos,
            { id:newTodoId, name, completed:false}
        ];

        newTodoName = '';
        $alert = `Todo '${name}' has been added`;
    }

    function updateTodo(todo){
        const i = todos.findIndex(t=>t.id === todo.id);
        
        if(todos[i].name !== todo.name) $alert = `Todo '${todos[i].name}' has been renamed to '${todo.name}'`;

        if(todos[i].completed !== todo.completed) $alert = `Todo '${todo.name}' marked as ${todo.completed ? 'completed':'active'}`;

        todos[i] = {...todo[i], ...todo};
        
    }
    
    const checkAllTodos = (completed)=> {
        
        todos = todos.map((t)=>( {...t,completed} ));

        $alert = `${completed ? 'Checked' : 'Unchecked'} ${todos.length} to-dos`;

    };

    const removeCompletedTodos = ()=> {
        $alert = `Removed ${todos = todos.filter(t=>t.completed).length} to-dos`;
        todos = todos.filter(t=>!t.completed)
    };

    // Filtering feature
    let filter = 'all';


    $:{
        if(filter === "all"){
            $alert = "Browsing all to-dos";
        }else if(filter === 'active'){
            $alert = "Browsing active to-dos";
        }
        else if(filter === 'completed'){
            $alert = "Browsing completed to-dos";
        }
    }

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

    <!-- Todo status -->
    <TodosStatus {todos} bind:this={todoStatus} />

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