<script>
    import Task from '$lib/stores/task.svelte.js';
    import * as db from '$lib/stores/database.js';
    let userid = 0;

    db.createTodo(userid, "Gus Amon", "1234", "Impasta", false);
    db.createTodo(userid, "Void", "void", "void", true);
    var taskList = $state([...db.getTodos(userid)]);

    let selected = $state(new Task());

    function getTaskById(id) {
        return taskList.find((obj) => obj.id === id);
    }

</script>

<div class="container">
    <div class="sidebar">
        <div class=option-bar>
            <div class="sorting">
                <select>
                    <option class="option" value="data_desc" selected>Od najnowszego</option>
                    <option class="option" value="data_asc">Od ostatniego</option>
                </select>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="WYSZUKAJ...">
            </div>
        </div>
        <div class="tasks">
        {#each taskList as task (task.id)}
            <div class="task {task.style}" onclick={() => {
                if (task.id === selected.id){
                    selected.isSelected = false;
                    selected = new Task();
                    return
                }
                selected.isSelected = false;
                selected = task;
                selected.isSelected = true;
                }}>
                <div class="taskgrid">
                    <p class="titlep {task.crossed}"> {task.title} </p>
                    <button class = "checkbox" style="text-decoration: none;" onclick = {
                        (e) => {e.stopPropagation();
                        task.toggleCompleted(); }}>
                        {#if task.isCompleted}
                        <div class = "checkbox-content">✓</div>
                        {/if}
                    </button>
                </div>
            </div>
        {/each}
        </div>
        <a href="/add_task" class="add-button">DODAJ ZADANIE</a>
    </div>
    <div class="content">
        <textarea class="task-desc" placeholder="Opis" bind:value={
            () => {return selected ? selected.content : ""},
            (v) => {if (selected) {selected.content = v}}
        }></textarea>
    </div>
</div>

<!--
        onclick={() => {
            taskList.push(new Task("new task"));
            console.log(taskList);
        }}
-->