<script>
    import Task from '$lib/stores/task.svelte.js';

    let sample = [
        new Task("Gus Amon", "1234", "yes"),
        new Task("VOIDVOIDVOIDVOIDVOIDVOIDVOIDVOIDVOIDVOIDVOIDVOIDVOIDVOID", "VOID", "VOID"),
        new Task("Eat FOOD", "NOW", "Consume", true),
        new Task("Factory MUST expand", "Tommorow", "EXPANDEXPANDEXPANDEXPANDEXPANDEXPANDEXPANDEXPANDEXPANDEXPAND", true),
    ];

    var taskList = $state([]);
    const repeat = 1
    for(let i = 0; i < repeat; i++){
        taskList.push(...sample);
    }

    let selected = $state(-1)
    var selObj = $derived(taskList[selected] ? taskList[selected] : new Task());

    let temp = $derived(selObj ? "" : "temp");
    let tutle = $state("");
    let sus = () => {selObj.title = tutle}
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
                    //tutle = task.title;
                    task.isSelected = false;
                    selected = -1;
                    return
                }
                selObj.isSelected = false;
                selected = i;
                task.isSelected = true;
                }}>
                <div class="taskgrid">
                    <p class="titlep {task.crossed}">
                        <!--{#if (i === selected)}
                            {tutle}
                        {:else}-->
                            {task.title}
                        <!--{/if}-->
                    </p>
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
        <a href="/add_task" class="add-button">DODAJ ZADANIE</a>
    </div>
    <div class="content">
        

        <!--<textarea class="task-desc" placeholder="Opis" bind:value={
            () => {return selObj ? selObj.content : ""},
            (v) => {if (selObj) {selObj.content = v}}
        }></textarea>-->
    </div>
</div>

<!--
        onclick={() => {
            taskList.push(new Task("new task"));
            console.log(taskList);
        }}
-->