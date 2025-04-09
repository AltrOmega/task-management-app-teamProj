export default class Task {
    isCompleted = $state(false);
    isSelected = $state(false);
    crossed = $derived(this.isCompleted ? "crossed" : "")
    style = $derived.by( () => {
        let style = "";
        if (this.isSelected) {
            style += "selected"
        }
        if (!this.isSelected && this.isCompleted) {
            style += "completed";
        }
        return style;
    });

    constructor(title="", date="", content="", completed = false) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.isCompleted = completed;
    }

    flipCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    flipSelected() {
        this.isSelected = !this.isSelected;
    }
}