import React, { useState } from 'react';
import '../styles/Mendatang.css';
import Sidebar from '../components/Sidebar';

const App = () => {
  const [dayNames] = useState(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']);
  const [currentDayIndex, setCurrentDayIndex] = useState(2);
  const [boards, setBoards] = useState([]);
  const [currentTaskList, setCurrentTaskList] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', date: '', time: '' });

  const addBoard = () => {
    const newBoard = {
      id: Date.now(),
      day: dayNames[(currentDayIndex + 1) % dayNames.length],
      tasks: []
    };
    setBoards([...boards, newBoard]);
    setCurrentDayIndex((currentDayIndex + 1) % dayNames.length);
  };

  const addNewTask = () => {
    if (newTask.name && newTask.date && newTask.time && currentTaskList) {
      const formattedTime = formatTimeToAMPM(newTask.time);

      const updatedBoards = boards.map(board => {
        if (board.id === currentTaskList.id) {
          const newTaskItem = {
            id: Date.now(),
            name: newTask.name,
            date: newTask.date,
            time: formattedTime
          };
          board.tasks.unshift(newTaskItem);
        }
        return board;
      });

      setBoards(updatedBoards);
      closePopup();
    }
  };

  const removeTask = (boardId, taskId) => {
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        board.tasks = board.tasks.filter(task => task.id !== taskId);
      }
      return board;
    });
    setBoards(updatedBoards);
  };

  const markAsCompleted = (boardId, taskId) => {
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        board.tasks = board.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = !task.completed;
          }
          return task;
        });
      }
      return board;
    });
    setBoards(updatedBoards);
  };

  const openPopup = (board) => {
    setCurrentTaskList(board);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setCurrentTaskList(null);
    setNewTask({ name: '', date: '', time: '' });
  };

  const formatTimeToAMPM = (time) => {
    const [hours, minutes] = time.split(':');
    const hoursInt = parseInt(hours, 10);
    const isPM = hoursInt >= 12;
    const hours12 = hoursInt % 12 || 12;
    const ampm = isPM ? 'PM' : 'AM';
    return `${hours12}:${minutes} ${ampm}`;
  };

  return (
    <div className="mendatang">
      <Sidebar />

      <div className="content">
        <div className="heading">7 Hari Mendatang</div>
        <div className="task-board-container">
          {boards.map(board => (
            <div key={board.id} className="board">
              <div className="board-header">{board.day}</div>
              <div className="task-list">
                {board.tasks.map(task => (
                  <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div>
                      <input type="checkbox" checked={task.completed} onChange={() => markAsCompleted(board.id, task.id)} />
                      <label>{task.name}</label>
                    </div>
                    <div className="task-details">
                      <span>{task.date}, {task.time}</span>
                      <i className="fas fa-times remove-task" onClick={() => removeTask(board.id, task.id)}></i>
                    </div>
                  </div>
                ))}
              </div>
              <div className="add-task" onClick={() => openPopup(board)}>+ Tambah Tugas</div>
            </div>
          ))}
        </div>

        <div className="add-board" onClick={addBoard}><i className="fas fa-plus"></i></div>
      </div>

      {popupVisible && (
        <div id="popupCalendar" className="popup-calendar">
          <div className="popup-content">
            <h2>Tambah Tugas</h2>
            <label htmlFor="taskName">Nama Tugas:</label>
            <input type="text" id="taskName" value={newTask.name} onChange={e => setNewTask({ ...newTask, name: e.target.value })} />

            <label htmlFor="taskDate">Tanggal:</label>
            <input type="date" id="taskDate" value={newTask.date} onChange={e => setNewTask({ ...newTask, date: e.target.value })} />

            <label htmlFor="taskTime">Waktu:</label>
            <input type="time" id="taskTime" value={newTask.time} onChange={e => setNewTask({ ...newTask, time: e.target.value })} />

            <div className="buttons">
              <button className="cancel" onClick={closePopup}>Batal</button>
              <button className="ok" onClick={addNewTask}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
