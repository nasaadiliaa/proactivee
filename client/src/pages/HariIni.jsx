import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import '../styles/HariIni.css';

const HariIni = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Mengerjakan Research', date: '2024-11-07', time: '08:00 AM', completed: false },
    { id: 2, name: 'Mengerjakan Low Fidelity', date: '2024-11-07', time: '09:30 PM', completed: false },
    { id: 3, name: 'Mengerjakan High Fidelity', date: '2024-11-07', time: '10:00 PM', completed: false }
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', date: '', time: '' });

  const addNewTask = () => {
    if (newTask.name && newTask.date && newTask.time) {
      setTasks(prevTasks => [
        ...prevTasks,
        { ...newTask, id: tasks.length + 1, completed: false, time: formatTimeToAMPM(newTask.time) }
      ]);
      closePopup();
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const markAsCompleted = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const closePopup = () => {
    setShowPopup(false);
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
    <div className="hariini">
      <Sidebar />
      <div className="content">
        <h2>Selamat Datang, User</h2>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div>
                <input type="checkbox" checked={task.completed} onChange={() => markAsCompleted(task.id)} />
                <label>{task.name}</label>
              </div>
              <div className="task-details">
                <span>{task.date}, {task.time}</span>
                <i className="fas fa-times remove-task" onClick={() => removeTask(task.id)}></i>
              </div>
            </div>
          ))}
        </div>

        <div className="add-task" onClick={() => setShowPopup(true)}>+ Tambah Tugas</div>
      </div>

      {showPopup && (
        <div className="popup-calendar">
          <div className="popup-content">
            <h2>Tambah Tugas</h2>
            <label>Nama Tugas:</label>
            <input type="text" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />

            <label>Tanggal:</label>
            <input type="date" value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} />

            <label>Waktu:</label>
            <input type="time" value={newTask.time} onChange={(e) => setNewTask({ ...newTask, time: e.target.value })} />

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

export default HariIni;