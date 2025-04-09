<div class="task-add-container">
    <form method="POST">
        <div class="task-header">
            <input type="text" class="task-title" id="title" placeholder="NAZWA ZADANIA">
        </div>

        <div class="task-details">
            <input type="text" class="task-date"  id="date" placeholder="Data i opcjonalnie godzina">
            <textarea class="task-desc"  id="content" placeholder="Opis"></textarea>
        </div>

        <button class="add-button" type="submit">DODAJ</button>
    </form>
</div>

<!--
<div class="task-add-container">
    <div class="task-header">
        <input type="text" class="task-title" placeholder="NAZWA ZADANIA" bind:value={
            //tutle 
            
            () => {return selObj ? selObj.title : ""},
            (v) => {
                if (selObj) {selObj.title = v}; selObj = selObj;
                console.log(selObj.title);
            }
        }>
    </div>
    <div class="task-details">
        <input type="text" class="task-date" placeholder="Data i opcjonalnie godzina" bind:value={
            () => {return selObj ? selObj.date : ""},
            (v) => {if (selObj) {selObj.date = v}}
        }>
        <textarea class="task-desc" placeholder="Opis" bind:value={
            () => {return selObj ? selObj.content : ""},
            (v) => {if (selObj) {selObj.content = v}}
        }>
</textarea>
    </div>
    <button class="add-button">DODAJ</button>
</div>
-->