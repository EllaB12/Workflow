import { boardService } from '../services/board.service.js';

export default {
    state: {
        board: null,
        currTask: null,
        currList: null
    },
    getters: {
        currTask(state) {
            return state.currTask;
        },
        currList(state) {
            return state.currList;
        }
    },
    mutations: {
        setEmptyTask(state) {
            const task = boardService.getEmptyTask();
            state.currTask = task;
        },
        setEmptyTasksList(state) {
            const list = boardService.getEmptyTasksList();
            state.currList = list;
        },
        setCurrTask(state, { taskId }) {
            for (var i = 0; i < state.board.taskLists.length; i++) {
                const list = state.board.taskLists[i];
                state.currTask = list.tasks.find(task => task.id === taskId);
                if (state.currTask) return;
            }
        },
        setBoard(state, { board }) {
            state.board = board;
        },
        addTask(state, { taskData }) {
            const taskList = state.board.taskLists.find(taskList => taskList.id === taskData.taskListId);
            taskList.tasks.push(taskData.newTask);
        },
        addTasksList(state, { listData }) {
            state.board.taskLists.push(listData);
        },
        updateBoard(state, { board }) {
            state.board = board;
        },
        updateTask(state, { task }) {
            for (var i = 0; i < state.board.taskLists.length; i++) {
                const list = state.board.taskLists[i];
                const taskIdx = list.tasks.findIndex(currTask => currTask.id === task.id);
                if (taskIdx >= 0) {
                    state.board.taskLists[i].tasks.splice(taskIdx, 1, task);
                    return;
                }
            }
        },
        deleteTask(state, { task }) {
            for (var i = 0; i < state.board.taskLists.length; i++) {
                const list = state.board.taskLists[i];
                const taskIdx = list.tasks.findIndex(currTask => currTask.id === task.id);
                if (taskIdx >= 0) {
                    state.board.taskLists[i].tasks.splice(taskIdx, 1);
                    return;
                }
            }

            this.currTask = null;
        },
        deleteList(state, { listId }) {
            const listIdx = state.board.taskLists.findIndex(currList => currList.id === listId)
            if (listIdx >= 0) {
                state.board.taskLists.splice(listIdx, 1);
                return;
            }
        }
    },
    actions: {
        async loadBoard(context, { boardId }) {
            const board = await boardService.getById(boardId);
            context.commit({ type: 'setBoard', board });
            return board;
        },
        async addTask(context, { taskData }) {
            context.commit({
                type: 'addTask',
                taskData
            });
            const savedBoard = await boardService.save(context.state.board);
            return savedBoard;
        },
        async addTasksList(context, { listData }) {
            context.commit({
                type: 'addTasksList',
                listData
            });
            const savedBoard = await boardService.save(context.state.board);
            return savedBoard;
        },
        async updateBoard(context, { board }) {
            context.commit({
                type: 'updateBoard',
                board
            });
            const savedBoard = await boardService.save(board);
            return savedBoard;
        },
        async updateTask(context, { task }) {
            context.commit({
                type: 'updateTask',
                task
            });
            await boardService.save(context.state.board);
            return task;
        },
        async deleteTask(context, { task }) {
            context.commit({
                type: 'deleteTask',
                task
            });
            const savedBoard = await boardService.save(context.state.board);
            return savedBoard;
        },
        async deleteList(context, { listId }) {
            context.commit({
                type: 'deleteList',
                listId
            });
            const savedBoard = await boardService.save(context.state.board);
            return savedBoard;

        }
    }
}