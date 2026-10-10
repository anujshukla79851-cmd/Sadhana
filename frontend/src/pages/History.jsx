 import axios from "axios";
import { useEffect, useState } from "react";
import "./History.css";

function History() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                // Backend se daily records fetch kar rahe hain
                const recordsResponse = await axios.get(
                    "https://sadhana-x03z.onrender.com/daily-records"
                );

                // Backend se tasks fetch kar rahe hain
                const tasksResponse = await axios.get(
                    "https://sadhana-x03z.onrender.com/tasks"
                );

                const records = recordsResponse.data;
                const tasks = tasksResponse.data;

                // Daily records ko task information ke saath combine karna
                const historyData = records.map((record) => {

                    const task = tasks.find(
                        (task) => task._id === record.taskId
                    );

                    return {
                        ...record,
                        taskName: task ? task.taskName : "Unknown Task",
                        desiredTime: task ? task.desiredTime : "-"
                    };

                });

                setHistory(historyData);

            } catch (error) {

                console.error(
                    "Error fetching history:",
                    error
                );

            }
        };

        fetchHistory();

    }, []);


    return (
        <div className="history-page">

            <h1>History</h1>

            {history.length === 0 ? (

                <p className="no-history">
                    No history available
                </p>

            ) : (

                <table className="history-table">

                    <thead>

                        <tr>
                            <th>Date</th>
                            <th>Task</th>
                            <th>Desired Time</th>
                            <th>Actual Time</th>
                            <th>Not Done</th>
                            <th>Marks</th>
                        </tr>

                    </thead>


                    <tbody>

                        {history.map((record) => (

                            <tr key={record._id}>

                                <td>
                                    {record.date}
                                </td>

                                <td>
                                    {record.taskName}
                                </td>

                                <td>
                                    {record.desiredTime}
                                </td>

                                <td>
                                    {record.actualTime || "-"}
                                </td>

                                <td>
                                    {record.notDone ? "Yes" : "No"}
                                </td>

                                <td>
                                    {record.marks}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default History;
