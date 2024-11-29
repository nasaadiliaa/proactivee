import React, { useState } from 'react';
import '../styles/TugasSelesai.css';
import Sidebar from '../components/Sidebar';

const TugasSelesai = () => {
  const [tasks, setTasks] = useState([
    { category: 'Hari ini', items: ['Mengerjakan Research', 'Mengerjakan Low Fidelity', 'Mengerjakan High Fidelity'] },
    { category: 'Besok', items: ['Mengerjakan Research', 'Mengerjakan Low Fidelity', 'Mengerjakan High Fidelity'] },
    { category: 'Mendatang', items: ['Mengerjakan Research', 'Mengerjakan Low Fidelity'] }
  ]);
  
  const [popupVisible, setPopupVisible] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', date: '', time: '' });

  const addNewTask = () => {
    if (newTask.name && newTask.date && newTask.time) {
      const formattedTime = formatTimeToAMPM(newTask.time);
      setTasks(prevTasks => [
        ...prevTasks,
        { category: 'Baru', items: [`${newTask.name} - ${newTask.date}, ${formattedTime}`] }
      ]);
      closePopup();
    }
  };

  const toggleCompleted = (index, categoryIndex) => {
    const updatedTasks = [...tasks];
    const item = updatedTasks[categoryIndex].items[index];
    const isCompleted = item.includes('(completed)');
    updatedTasks[categoryIndex].items.splice(index, 1, isCompleted ? item.replace(' (completed)', '') : `${item} (completed)`);
    setTasks(updatedTasks);
  };

  const removeTask = (index, categoryIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[categoryIndex].items.splice(index, 1);
    setTasks(updatedTasks);
  };

  const formatTimeToAMPM = (time) => {
    const [hours, minutes] = time.split(':');
    const hoursInt = parseInt(hours, 10);
    const isPM = hoursInt >= 12;
    const hours12 = hoursInt % 12 || 12;
    const ampm = isPM ? 'PM' : 'AM';
    return `${hours12}:${minutes} ${ampm}`;
  };

  const closePopup = () => setPopupVisible(false);

  return (
    <div className="tugasselesai">
      <Sidebar />

      <div className="content">
        <h1>Semua Tugas</h1>
        <div className="task-container">
          {tasks.map((task, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="task-category">{task.category}</div>
              {task.items.map((item, index) => (
                <div className={`task-item ${item.includes('(completed)') ? 'completed' : ''}`} key={index}>
                  <div className="task-title">
                    <input type="checkbox" checked={item.includes('(completed)')} onChange={() => toggleCompleted(index, categoryIndex)} />
                    {item.replace(' (completed)', '')}
                  </div>
                  <div className="task-time">
                    2024-11-09, 17:50 <i className="fas fa-times remove-task" onClick={() => removeTask(index, categoryIndex)}></i>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="add-task" onClick={() => setPopupVisible(true)}>
            + Tambah tugas
          </div>
        </div>
      </div>

      {popupVisible && (
        <div id="popupCalendar" className="popup-calendar">
          <div className="popup-content">
            <h2>Tambah Tugas</h2>
            <label htmlFor="taskName">Nama Tugas:</label>
            <input type="text" id="taskName" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />

            <label htmlFor="taskDate">Tanggal:</label>
            <input type="date" id="taskDate" value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} />

            <label htmlFor="taskTime">Waktu:</label>
            <input type="time" id="taskTime" value={newTask.time} onChange={(e) => setNewTask({ ...newTask, time: e.target.value })} />

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

export default TugasSelesai;

