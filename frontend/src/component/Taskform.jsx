 
import "./TaskForm.css";

function TaskForm({
    taskName, setTaskName,
    desiredTime, setDesiredTime,
    duration, setDuration,
    durationUnit, setDurationUnit,
    onTimeMarks, setonTimeMarks,
    lateMarks, setlateMarks,
    notDoneMarks, setnotDoneMarks,
    addTask, editTask,
    onClose
}) {
    // Stored time: 24-hour HH:mm format
    const [savedHour = "06", savedMinute = "00"] =
        (desiredTime || "06:00").split(":");

    const hour24 = Number(savedHour);
    const displayHour = String(hour24 % 12 || 12).padStart(2, "0");
    const period = hour24 >= 12 ? "PM" : "AM";

    const updateTime = (hour12, minute, ampm) => {
        let hour = Number(hour12);

        if (ampm === "AM" && hour === 12) {
            hour = 0;
        } else if (ampm === "PM" && hour !== 12) {
            hour += 12;
        }

        setDesiredTime(
            `${String(hour).padStart(2, "0")}:${minute}`
        );
    };

    return (
        <div className="task-form">
            <div className="form-heading">
                <span className="form-icon">✦</span>

                <div className="form-heading-text">
                    <h2>
                        {editTask !== null ? "Edit Task" : "Add Task"}
                    </h2>
                    <p>Plan your routine and set your target</p>
                </div>

                {/* Close form button */}
                <button
                    type="button"
                    className="close-form-btn"
                    onClick={onClose}
                    aria-label="Close form"
                    title="Close form"
                >
                    ×
                </button>
            </div>

            <div className="form-field">
                <label htmlFor="task-name">Task Name</label>
                <input
                    id="task-name"
                    type="text"
                    placeholder="e.g. Morning Yoga"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>

            <div className="form-field">
                <label>Desired Time</label>

                <div className="desired-time-group">
                    <select
                        aria-label="Desired hour"
                        value={displayHour}
                        onChange={(e) =>
                            updateTime(e.target.value, savedMinute, period)
                        }
                    >
                        {Array.from({ length: 12 }, (_, i) =>
                            String(i + 1).padStart(2, "0")
                        ).map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}
                            </option>
                        ))}
                    </select>

                    <span className="time-colon">:</span>

                    <select
                        aria-label="Desired minute"
                        value={savedMinute}
                        onChange={(e) =>
                            updateTime(displayHour, e.target.value, period)
                        }
                    >
                        {Array.from({ length: 60 }, (_, i) =>
                            String(i).padStart(2, "0")
                        ).map((minute) => (
                            <option key={minute} value={minute}>
                                {minute}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-label="AM or PM"
                        value={period}
                        onChange={(e) =>
                            updateTime(displayHour, savedMinute, e.target.value)
                        }
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>

            <div className="form-field">
                <label>Duration</label>

                <div className="duration-input-group">
                    <input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Enter duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />

                    <select
                        aria-label="Duration unit"
                        value={durationUnit}
                        onChange={(e) => setDurationUnit(e.target.value)}
                    >
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                    </select>
                </div>
            </div>

            <div className="marks-section">
                <h3>Task Marks</h3>
                <p>Set the marks awarded for each outcome.</p>

                <div className="form-field">
                    <label htmlFor="on-time-marks">On Time Marks</label>
                    <input
                        id="on-time-marks"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="e.g. 10"
                        value={onTimeMarks}
                        onChange={(e) => setonTimeMarks(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="late-marks">Late Marks</label>
                    <input
                        id="late-marks"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="e.g. 5"
                        value={lateMarks}
                        onChange={(e) => setlateMarks(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="not-done-marks">Not Done Marks</label>
                    <input
                        id="not-done-marks"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="e.g. 0"
                        value={notDoneMarks}
                        onChange={(e) => setnotDoneMarks(e.target.value)}
                    />
                </div>
            </div>

            <button
                type="button"
                className="save-btn"
                onClick={addTask}
            >
                {editTask !== null ? "Update Task →" : "Save Task →"}
            </button>
        </div>
    );
}

export default TaskForm;
