 
import axios from "axios";
import { useEffect, useState } from "react";
import "./Today.css";

// 24-hour time ko readable AM/PM format mein badalta hai
function formatTime(time) {
    if (!time) return "--";

    const [hours, minutes] = time.split(":");
    const hour = Number(hours);
    const displayHour = hour % 12 || 12;
    const period = hour >= 12 ? "PM" : "AM";

    return `${String(displayHour).padStart(2, "0")}:${minutes} ${period}`;
}

// AM/PM time ko 24-hour HH:mm mein convert karta hai
function to24HourTime(hour, minute, period) {
    if (!hour || !minute) return "";

    let hour24 = Number(hour);

    if (period === "AM" && hour24 === 12) {
        hour24 = 0;
    } else if (period === "PM" && hour24 !== 12) {
        hour24 += 12;
    }

    return `${String(hour24).padStart(2, "0")}:${minute}`;
}

// Time ko minutes mein convert karta hai comparison ke liye
function timeToMinutes(time) {
    if (!time) return null;

    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function Today() {
    const [tasks, setTasks] = useState([]);
    const [timeParts, setTimeParts] = useState({});
    const [notDone, setNotDone] = useState({});
    const [marks, setMarks] = useState({});
    const [saving, setSaving] = useState(false);

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

    // Selected hour/minute/AM-PM se actual time banao
    const getActualTime = (index) => {
        const parts = timeParts[index];

        if (!parts?.hour || !parts?.minute) return "";

        return to24HourTime(
            parts.hour,
            parts.minute,
            parts.period || "AM"
        );
    };

    // Marks ka preview calculate karo
    const calculateMarks = (task, index) => {
        if (notDone[index]) {
            return task.notDoneMarks ?? 0;
        }

        const actualTime = getActualTime(index);

        if (!actualTime) return "-";

        const desiredMinutes = timeToMinutes(task.desiredTime);
        const actualMinutes = timeToMinutes(actualTime);

        if (desiredMinutes === null || actualMinutes === null) {
            return "-";
        }

        if (actualMinutes <= desiredMinutes) {
            return task.onTimeMarks ?? 0;
        }

        return task.lateMarks ?? 0;
    };

    // Time dropdown change hone par state update karo
    const updateTimePart = (index, field, value) => {
        setTimeParts((previous) => ({
            ...previous,
            [index]: {
                hour: previous[index]?.hour || "",
                minute: previous[index]?.minute || "",
                period: previous[index]?.period || "AM",
                ...previous[index],
                [field]: value
            }
        }));

        setMarks((previous) => ({
            ...previous,
            [index]: undefined
        }));
    };

    // Aaj ke records backend ko save karo
    const saveToday = async () => {
        setSaving(true);

        try {
            const today = new Date().toISOString().split("T")[0];

            for (let index = 0; index < tasks.length; index++) {
                const task = tasks[index];
                const actualTime = getActualTime(index);

                if (!notDone[index] && !actualTime) {
                    alert(
                        `Please enter Actual Time or select Not Done for "${task.taskName}".`
                    );
                    return;
                }

                const recordData = {
                    taskId: task._id,
                    date: today,
                    actualTime: notDone[index] ? "" : actualTime,
                    notDone: Boolean(notDone[index])
                };

                const response = await axios.post(
                    "http://localhost:3000/daily-records",
                    recordData
                );

                setMarks((previous) => ({
                    ...previous,
                    [index]: response.data.marks
                }));
            }

            alert("Today's progress saved!");
        } catch (error) {
            console.error("Error saving daily record:", error);
            alert("Progress could not be saved. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="today-page">
            <h1>Today</h1>

            <table className="today-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Desired Time</th>
                        <th>Duration</th>
                        <th>Actual Time</th>
                        <th>Not Done</th>
                        <th>Marks</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task, index) => {
                        const parts = timeParts[index] || {};
                        const disabled = Boolean(notDone[index]);
                        const previewMarks = calculateMarks(task, index);

                        return (
                            <tr key={task._id}>
                                <td>{task.taskName}</td>

                                <td>{formatTime(task.desiredTime)}</td>

                                <td>
                                    {task.duration >= 60 &&
                                    task.duration % 60 === 0
                                        ? `${task.duration / 60} ${
                                              task.duration / 60 === 1
                                                  ? "hour"
                                                  : "hours"
                                          }`
                                        : `${task.duration} ${
                                              task.duration === 1
                                                  ? "minute"
                                                  : "minutes"
                                          }`}
                                </td>

                                <td>
                                    <div className="actual-time-group">
                                        <select
                                            aria-label="Actual hour"
                                            value={parts.hour || ""}
                                            disabled={disabled}
                                            onChange={(e) =>
                                                updateTimePart(
                                                    index,
                                                    "hour",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Hour</option>
                                            {Array.from(
                                                { length: 12 },
                                                (_, i) =>
                                                    String(i + 1).padStart(
                                                        2,
                                                        "0"
                                                    )
                                            ).map((hour) => (
                                                <option
                                                    key={hour}
                                                    value={hour}
                                                >
                                                    {hour}
                                                </option>
                                            ))}
                                        </select>

                                        <span>:</span>

                                        <select
                                            aria-label="Actual minute"
                                            value={parts.minute || ""}
                                            disabled={disabled}
                                            onChange={(e) =>
                                                updateTimePart(
                                                    index,
                                                    "minute",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Min</option>
                                            {Array.from(
                                                { length: 60 },
                                                (_, i) =>
                                                    String(i).padStart(2, "0")
                                            ).map((minute) => (
                                                <option
                                                    key={minute}
                                                    value={minute}
                                                >
                                                    {minute}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            aria-label="AM or PM"
                                            value={parts.period || "AM"}
                                            disabled={disabled}
                                            onChange={(e) =>
                                                updateTimePart(
                                                    index,
                                                    "period",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </td>

                                <td>
                                    <input
                                        type="checkbox"
                                        checked={disabled}
                                        onChange={(e) => {
                                            setNotDone((previous) => ({
                                                ...previous,
                                                [index]: e.target.checked
                                            }));

                                            setMarks((previous) => ({
                                                ...previous,
                                                [index]: undefined
                                            }));
                                        }}
                                    />
                                </td>

                                <td>
                                    {marks[index] !== undefined
                                        ? marks[index]
                                        : previewMarks}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <button
                className="save-today-btn"
                onClick={saveToday}
                disabled={saving}
            >
                {saving ? "Saving..." : "Save Today"}
            </button>
        </div>
    );
}

export default Today;
