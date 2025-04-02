export default class Task {
    tog = $state(false);
    comp = $derived(this.tog ? "completed" : "");

    constructor(title, date, content, fog = false) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.tog = fog;
    }
}