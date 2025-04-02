import { writable } from "svelte/store";
import { onMount } from "svelte";
import { Task, refreshList ,serialiseAll} from '$lib/stores/task.svelte.js';

export let taskList_ = [];

export function runMount() {
  const storedTasks = localStorage.getItem("taskList");
  taskList_ = loadTaskList();

  /*
  taskList_.subscribe((value) => {
    localStorage.setItem("taskList", JSON.stringify(value));
  });*/
};

export function saveTaskList(taskList) {
  localStorage.setItem("taskList", JSON.stringify(serialiseAll(taskList)));
}

export function expandTaskList(task) {
  taskList_.push(task);
  saveTaskList(taskList_);
}

export function popTaskList(id) {
	const index = taskList_.findIndex((task) => task.id === id);

	if (index !== -1) {
		taskList_.splice(index, 1);
    saveTaskList(taskList_);
	}
}

export function loadTaskList() {
  const storedTasks = localStorage.getItem("taskList");
  return storedTasks ? refreshList(JSON.parse(storedTasks)) : [];
}