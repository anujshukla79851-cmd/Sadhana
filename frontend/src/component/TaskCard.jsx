 
function formatTime(time) {
    if (!time) return "--";

    const [hours, minutes] = time.split(":");
    const hour = Number(hours);

    const displayHour = hour % 12 || 12;
    const period = hour >= 12 ? "PM" : "AM";

    return `${String(displayHour).padStart(2, "0")}:${minutes} ${period}`;
}

function TaskCard({
    task,
    index,
    deleteTask,
    editTaskHandler
}) {
    return (
        <tr>
            <td>{task.taskName}</td>

            <td>{formatTime(task.desiredTime)}</td>

            <td>
                {task.duration >= 60 && task.duration % 60 === 0
                    ? `${task.duration / 60} ${task.duration / 60 === 1 ? "hour" : "hours"}`
                    : `${task.duration} ${task.duration === 1 ? "minute" : "minutes"}`}
            </td>

            <td>
                <button
                    className="delete-btn"
                    onClick={() => deleteTask(task._id)}
                >
                    Delete
                </button>

                <button
                    className="edit-btn"
                    onClick={() => editTaskHandler(index)}
                >
                    Edit
                </button>
            </td>
        </tr>
    );
}

export default TaskCard;
