<script>
    import {taskList_, runMount, popTaskList, saveTaskList, loadTaskList} from '$lib/stores/store.js';
    import { onMount } from "svelte";
    import {Task} from '$lib/stores/task.svelte.js';

    var taskList = $state(taskList_);

    var option = $state("data_none");
    var search = $state("");

    function sortAsc(){
        taskList = loadTaskList().sort((a, b) => a.date.localeCompare(b.date));
    }

    function sortDes(){
        
        taskList = loadTaskList().sort((a, b) => b.date.localeCompare(a.date));
    }
    function sortDefault(){
        taskList = loadTaskList();
    }

    function saveTaskListStructure(){
        const copiedList = [];
        for (let i = 0; i < taskList_.length; i++) {
            let id = taskList_[i].id;
            let index = taskList.findIndex((task) => task.id === id)
            copiedList.push(taskList[index]);
        }
        saveTaskList(copiedList);
    }

    onMount(() => {
        runMount();
        console.log(taskList_);
        taskList = taskList_;
    });

    let selected = $state(new Task());

    function getTaskById(id) {
        return taskList.find((obj) => obj.id === id);
    }

    function getHidden(task){
        let compound = task.title + task.date + task.content;
        if (compound.toLowerCase().includes(search.toLowerCase())) return "";
        return "hide";
    }

</script>

<div class="container">
    <div class="sidebar">
        <div class=option-bar>
            <div class="sorting">
                <select bind:value={option} onchange={ () => {
                        if (option === "data_asc") {
                            sortAsc();
                        } else if (option === "data_desc"){
                            sortDes();
                        } else {
                            sortDefault();
                        }
                    }}>
                    <option class="option" value="data_none" selected>Brak sortowania</option>
                    <option class="option" value="data_desc">Od najnowszego</option>
                    <option class="option" value="data_asc">Od najstarszego</option>
                </select>
            </div>
            <div class="search-bar">
                <input type="text" bind:value={search} placeholder="WYSZUKAJ..." oninput={ () =>{
                    taskList = taskList;
                }}>
            </div>
        </div>
        <div class="tasks">
        {#each taskList as task (task.id)}
            <div class="task {task.style} {getHidden(task)}" onclick={() => {
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

                    <div class="date">{task.date}</div>

                    <button class = "checkbox" style="text-decoration: none;" onclick = {
                        (e) => {e.stopPropagation();
                        task.toggleCompleted();
                        saveTaskListStructure();
                        }}>
                        {#if task.isCompleted}
                        <div class = "checkbox-content">✓</div>
                        {/if}
                    </button>
                </div>
            
            </div>
            
        {/each}
        </div>
        <button class="del-button { selected.isSelected ? "del-selected" : "" }" onclick={ () => {
                popTaskList(selected.id);
                taskList = taskList;
                taskList = taskList_;
            }
        }>USUŃ ZADANIE</button>
        <a href="/add_task" class="add-button">DODAJ ZADANIE</a>
    </div>
    <div class="content">
        <textarea class="task-desc_2" placeholder="Opis" bind:value={
            () => {return selected ? selected.content : ""},
            (v) => {if (selected) {selected.content = v;
                saveTaskList(taskList);
            }}
        }></textarea>
    </div>
</div>