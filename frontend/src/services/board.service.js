import httpService from './http.service.js';
import { utilService } from './util.service.js';

const endpoint = 'board';

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyTasksList,
    getEmptyTask,
    getEmptyChecklist
}

function query() {
    return httpService.get(endpoint);
}

function getById(id) {
    return httpService.get(`${endpoint}/${id}`);
}

function remove(id) {
    return httpService.delete(`${endpoint}/${id}`);
}

function save(board) {
    if (board._id) {
        return httpService.put(`${endpoint}/${board._id}`, board);
    } else {
        return httpService.post(`${endpoint}`, board);
    }

}

function getEmptyBoard() {
    return {
        name: "New Board",
        members: [],
        tags: [],
        style: { "color": "rgb(189, 191, 192)", "url": "" },
        creator: {
            id: "",
            name: "",
            img: ""
        },
        dueDate: Date.now(),
        description: "",
        taskLists: [],
        activitieslog: []
    }
}

function getEmptyTasksList() {
    return {
        id: utilService.makeId(),
        name: "",
        backgroundColor: "#ebecf0",
        sortBy: "",
        tasks: []
    }
}

function getEmptyTask() {
    return {
        id: utilService.makeId(),
        name: "",
        description: "",
        dueDate: null,
        createdAt: Date.now(),
        members: [],
        labels: [],
        comments: [{
            createdBy: "",
            txt: "",
            createdAt: ""
        }],
        cover: "",
        attachment: {},
        checklists: [],
        backgroundColor: '#fff',
        status: {
            isDone: false,
            member: {},
            date: null
        }
    }
}

function getEmptyChecklist() {
    return {
        id: utilService.makeId(),
        name: 'Checklist',
        todos: []
    }
}