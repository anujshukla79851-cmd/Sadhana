 import axios from "axios";
import "./TaskSetup.css";
import { useState, useEffect } from "react";

import TaskForm from "../component/TaskForm";
import TaskCard from "../component/TaskCard";

function Tasksetup() {
    const [showForm, setShowForm] = useState(false);

    const [taskName, setTaskName] = useState("");
    const [desiredTime, setDesiredTime] = useState("");
    const [duration, setDuration] = useState("");
    const [durationUnit, setDurationUnit] = useState("minutes");

    const [tasks, setTasks] = useState([]);

    const [onTimeMarks, setonTimeMarks] = useState("");
    const [lateMarks, setlateMarks] = useState("");
    const [notDoneMarks, setnotDoneMarks] = useState("");

    const [editTask, setEditTask] = useState(null);

    // Backend se tasks load karna
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/tasks"
                );

                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                alert("Tasks could not be loaded.");
            }
        };

        fetchTasks();
    }, []);

    // Form ke saare fields reset karna
    const clearForm = () => {
        setTaskName("");
        setDesiredTime("");
        setDuration("");
        setDurationUnit("minutes");
        setonTimeMarks("");
        setlateMarks("");
        setnotDoneMarks("");
        setEditTask(null);
    };

    // Form ko bina save kiye close karna
    const closeForm = () => {
        setShowForm(false);
        clearForm();
    };

    // Task add ya update karna
    const addTask = async () => {
        if (
            !taskName.trim() ||
            !desiredTime ||
            duration === "" ||
            onTimeMarks === "" ||
            lateMarks === "" ||
            notDoneMarks === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        const durationNumber = Number(duration);
        const onTimeNumber = Number(onTimeMarks);
        const lateNumber = Number(lateMarks);
        const notDoneNumber = Number(notDoneMarks);

        if (!Number.isFinite(durationNumber) || durationNumber <= 0) {
            alert("Duration must be greater than 0.");
            return;
        }

        if (
            !Number.isFinite(onTimeNumber) ||
            !Number.isFinite(lateNumber) ||
            !Number.isFinite(notDoneNumber) ||
            onTimeNumber < 0 ||
            lateNumber < 0 ||
            notDoneNumber < 0
        ) {
            alert("Marks must be valid non-negative numbers.");
            return;
        }

        // Hours ko minutes mein convert karna
        const durationInMinutes =
            durationUnit === "hours"
                ? durationNumber * 60
                : durationNumber;

        const newTask = {
            taskName: taskName.trim(),
            desiredTime,
            duration: durationInMinutes,
            onTimeMarks: onTimeNumber,
            lateMarks: lateNumber,
            notDoneMarks: notDoneNumber
        };

        try {
            if (editTask !== null) {
                // Existing task update
                const taskId = tasks[editTask]._id;

                const response = await axios.patch(
                    `http://localhost:3000/tasks/${taskId}`,
                    newTask
                );

                setTasks((previousTasks) =>
                    previousTasks.map((task) =>
                        task._id === taskId ? response.data : task
                    )
                );
            } else {
                // New task create
                const response = await axios.post(
                    "http://localhost:3000/tasks",
                    newTask
                );

                setTasks((previousTasks) => [
                    ...previousTasks,
                    response.data
                ]);
            }

            // Save successful hone ke baad close
            closeForm();
        } catch (error) {
            console.error("Error saving task:", error);
            alert("Task could not be saved. Please try again.");
        }
    };

    // Task delete karna
    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `http://localhost:3000/tasks/${id}`
            );

            setTasks((previousTasks) =>
                previousTasks.filter((task) => task._id !== id)
            );
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Task could not be deleted.");
        }
    };

    // Existing task ka data form mein fill karna
    const editTaskHandler = (index) => {
        const task = tasks[index];

        setEditTask(index);
        setTaskName(task.taskName);
        setDesiredTime(task.desiredTime);

        // Backend duration ko minutes mein store karta hai
        if (task.duration >= 60 && task.duration % 60 === 0) {
            setDuration(String(task.duration / 60));
            setDurationUnit("hours");
        } else {
            setDuration(String(task.duration));
            setDurationUnit("minutes");
        }

        setonTimeMarks(String(task.onTimeMarks));
        setlateMarks(String(task.lateMarks));
        setnotDoneMarks(String(task.notDoneMarks));

        setShowForm(true);
    };

    // Add Task button se fresh form open karna
    const openAddForm = () => {
        clearForm();
        setShowForm(true);
    };

    return (
        <main className="task-setup">
            <h1>Task Setup</h1>

            <table className="task-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Desired Time</th>
                        <th>Duration</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task, index) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            index={index}
                            deleteTask={deleteTask}
                            editTaskHandler={editTaskHandler}
                        />
                    ))}
                </tbody>
            </table>

            <button
                type="button"
                className="add-task-btn"
                onClick={openAddForm}
            >
                + Add Task
            </button>

            {showForm && (
                <TaskForm
                    taskName={taskName}
                    setTaskName={setTaskName}
                    desiredTime={desiredTime}
                    setDesiredTime={setDesiredTime}
                    duration={duration}
                    setDuration={setDuration}
                    durationUnit={durationUnit}
                    setDurationUnit={setDurationUnit}
                    onTimeMarks={onTimeMarks}
                    setonTimeMarks={setonTimeMarks}
                    lateMarks={lateMarks}
                    setlateMarks={setlateMarks}
                    notDoneMarks={notDoneMarks}
                    setnotDoneMarks={setnotDoneMarks}
                    addTask={addTask}
                    editTask={editTask}
                    onClose={closeForm}
                />
            )}
        </main>
    );
}

export default Tasksetup;