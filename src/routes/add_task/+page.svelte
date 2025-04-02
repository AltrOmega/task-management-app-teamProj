<script>
    import { redirect } from '@sveltejs/kit';
    import {taskList_, runMount, expandTaskList} from '$lib/stores/store.js';
    import {Task} from '$lib/stores/task.svelte';
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    onMount(() => {
        runMount();
        console.log(taskList_);
    });

    const data = $state({
        title: '',
        date: '',
        content: '',
    });
  </script>

<div class="task-add-container">
    <div class="task-header">
        <input type="text" class="task-title" id="title" bind:value={
            () => {return data.title},
            (v) => {data.title = v}
            } placeholder="NAZWA ZADANIA">
    </div>

    <div class="task-details">
        <input type="text" class="task-date"  id="date" bind:value={
            () => {return data.date},
            (v) => {data.date = v;}
            } placeholder="Data i opcjonalnie godzina">
        <textarea class="task-desc"  id="content" bind:value={
            () => {return data.content},
            (v) => {data.content = v;}
        } placeholder="Opis"></textarea>
    </div>

    <button class="add-button" onclick={(e) =>{
        expandTaskList(new Task(crypto.randomUUID(), data.title, data.date, data.content, false));
        goto('/');
    }}>DODAJ</button>
</div>