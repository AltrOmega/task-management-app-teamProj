<script>
    import Task from '$lib/task.svelte.js';
    import AddTask from "$lib/add_task.svelte";

    let sample = [
        new Task("Gus Amon", "1234", "yes"),
        new Task("VOIDVOIDVOIDVOIDVOIDVOIDVOID", "VOID", "VOID"),
        new Task("Eat FOOD", "NOW", "Consume", true),
        new Task("Fucktory musht expand", "Tommorow", "EXPLANDEXPLANDEXPLANDEXPLANDEXPLAND", true),
    ];

    var taskList = [];
    const repeat = 1
    for(let i = 0; i < repeat; i++){
        taskList.push(...sample);
    }

    let selected = $state(-1)
    var selObj = $derived(taskList[selected]);

    let temp = $derived(selObj ? "" : "temp");
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
        {#each taskList as task, i(i)}
            <div class="task {task.style}" onclick={() => {
                if (selected === i) {
                    task.isSelected = false;
                    selected = -1;
                    return
                }
                if (selObj) {
                    selObj.isSelected = false;
                }
                selected = i;
                task.isSelected = true;
                }}>
                <div class="taskgrid">
                    <p class="titlep {task.crossed}">{task.title}</p>
                    <button class = "checkbox" style="text-decoration: none;"onclick = {
                    (e) => {e.stopPropagation()
                        task.isCompleted = !task.isCompleted;
                    }}>
                        {#if task.isCompleted}
                        <div class = "checkbox-content">✓</div>
                        {/if}
                    </button>
                </div>
            </div>
        {/each}
        </div>
        <a href="/add_page" class="add-button">DODAJ ZADANIE</a>
    </div>
    <div class="content">
        <textarea class="task-desc" placeholder="Opis" bind:value={
            () => {return selObj ? selObj.content : ""},
            (v) => {if (selObj) {selObj.content = v}}
        }></textarea>
    </div>
</div>