<script>
    import Todos from "./Todos.svelte";
    import Alert from './components/Alert.svelte';


    import {todos} from './stores';


    // $todos = [
    //     { id: 1, name: "Create a Svelte starter app", completed: true },
    //     { id: 2, name: "Create your first component", completed: true },
    //     { id: 3, name: "Complete the rest of the tutorial", completed: false }
    // ];

    // $: console.log("todos store -todos:", todos);
    // $: console.log("todos store content - $todos:", $todos);

</script>

<!-- <Todos {todos}/> -->
<Alert />
<Todos bind:todos={$todos}/>