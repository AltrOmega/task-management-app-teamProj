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
    let selObj = $derived(taskList[selected]);
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
            <div class="task {task.comp}" onclick={() => selected = i}>
                <div class="taskgrid">
                    <p class="titlep">{taskList[i].title}</p>
                    <input class="checkbox" type="checkbox" bind:checked={taskList[i].tog}>
                </div>
            </div>
        {/each}
        <!--
            <div class="task">ZADANIE 1</div>
            <div class="task">ZADANIE 2</div>
            <div class="task">ZADANIE 3</div>
            <div class="task completed">ZADANIE 4 ✓</div>
        -->
        </div>
        <a href="/add_page" class="add-button">DODAJ ZADANIE</a>
    </div>
    <div class="content">
        <AddTask title={selObj?.title} />
    </div>
</div>