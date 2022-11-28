<script>

    export let todos;

    $: totalTodos = todos.length;
    $: completedTodos = todos.filter((todo)=> todo.completed).length;

    let headingEl;

    export const focus = () =>headingEl.focus();

</script>

<h2 id="list-heading" bind:this={headingEl}>
    { completedTodos } out of {totalTodos} items completed
</h2>