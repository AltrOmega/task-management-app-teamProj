<script>
    let { children="", back="", title="", date="", description="" } = $props()
</script>

<div class="task-add-container">
    <div class="task-header">
        <input type="text" class="task-title" placeholder="NAZWA ZADANIA" value={title}>
        {#if back}
            <a href="{back}" class="back-button">POWRÓT</a>
        {/if}
    </div>
    <div class="task-details">
        <input type="text" class="task-date" placeholder="Data i opcjonalnie godzina" value={date}>
        <textarea class="task-desc" placeholder="Opis" value={description}></textarea>
    </div>
    <button class="add-button">DODAJ</button>
</div>