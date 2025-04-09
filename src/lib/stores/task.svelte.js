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
        console.log(style);
        return style;
    });

    constructor(id=-1, title="", date="", content="", completed = false) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.content = content;
        this.isCompleted = completed;
    }

    serialise(){
        let id = this.id;
        let title = this.title;
        let date = this.date;
        let content = this.content;
        let isCompleted = this.isCompleted;
        return { id, title, date, content, isCompleted };
    }

    static deserialise(obj){
        return new Task(obj.id, obj.title, obj.date, obj.content, obj.isCompleted);
    }

    toggleCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    toggleSelected() {
        this.isSelected = !this.isSelected;
    }


}