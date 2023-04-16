    import React from 'react';
    import './work-info-desktop.css';
    import './work-info-mobile.css';
    import { useState, useEffect } from 'react';


    const WorkInfo = (props) => {

        const [api, setApi] = useState([]);
        const apitest = api;

        useEffect(() => {
            JSON.parse(localStorage.getItem('work')) ? setApi(JSON.parse(localStorage.getItem('work'))) : setApi([]);
        }, []);

        const saveData = async () => {
            await localStorage.setItem('work', JSON.stringify(api));
            // refresh page
            window.location.reload();
        }

        const generateId = () => {
            return '_' + Math.random().toString(36).substr(2, 9);
        }

        const addWorker = () => {
            const text = prompt('Ishchi ismini kiriting');
            if(text === '') return;
            setApi(prevState => {
            const updatedApi = prevState.map(item => {
                if(item.id === props.id) {
                return {
                    ...item,
                    workers: [...item.workers, {name: text, id: generateId(), time: new Date().toLocaleString(), days: []}]
                };
                }
                return item;
            });
            return updatedApi;
            });
        }
        
        
        
        const addDate = () => {
            window.document.getElementById("calendar-box").style.display = "flex"

            
        }

        const saveDate = ()=>{
            const data = window.document.getElementById("date").value
            if(data == "") return alert("Siz sanani tanlamadingiz!")
            
            setApi(prevState => {
                const updatedApi = prevState.map(item => {
                    if(item.id === props.id) {
                        return {
                            ...item,
                            days: [
                                ...item.days,
                                {
                                    dayId: generateId(),
                                    date: new Date(data).toLocaleString(),
                                    workers: []
                                }
                            ]
                        };
                    }
                    return item;
                });
                return updatedApi;
            });
            window.document.getElementById("calendar-box").style.display = "none"
        }

        const hideCalendar = ()=>{
            window.document.getElementById("calendar-box").style.display = "none"
        }
    
        
        const handleDeleteWorker = (itemId, workerId) => {
            const confirm = window.confirm('O`chirishni tasdiqlaysizmi?');
            if (!confirm) return;
            alert('O`chirildi');
            setApi(prevState => {
            const updatedApi = prevState.map(item => {
                if (item.id === itemId) {
                return {
                    ...item,
                    workers: item.workers.filter(worker => worker.id !== workerId)
                };
                }
                return item;
            });
            return updatedApi;
            });
        };

        const handleDeleteDay = (itemId, day) => {
            const confirm = window.confirm('O`chirishni tasdiqlaysizmi?');
            if (!confirm) return;
            alert('O`chirildi');
            setApi(prevState => {
                const updatedApi = prevState.map(item => {
                    if (item.id === itemId) {
                    return {
                        ...item,
                        days: item.days.filter(d => d !== day)
                    };
                    }
                    return item;
                });
                return updatedApi;
                });
        }
        
        const [checked, setChecked] = useState(false);

        
        const handleCheck = (dayId, workerId, checked) => {
            setApi(prevState => {
                const updatedApi = prevState.map(item => {
                    if (item.id === props.id) {
                        const updatedDays = item.days.map(day => {
                            if (day.dayId === dayId) {
                                const updatedWorkers = day.workers.includes(workerId)
                                    ? day.workers.filter(id => id !== workerId)
                                    : [...day.workers, workerId];
                                return {
                                    ...day,
                                    workers: updatedWorkers
                                };
                            }
                            return day;
                        });
                        return {
                            ...item,
                            days: updatedDays
                        };
                    }
                    return item;
                });
                return updatedApi;
            });
            setChecked(checked);
        };
        
       


        return (
            <div>
                {apitest.map((item, index) => {
                    if(item.id === props.id){
                        return (
                            <div className="container" key={generateId}>
                            <h2 className='text-center text-success m-3' key={generateId}>{item.name}</h2>
                                <div key={generateId()}>
                                <table className='table table-stripped table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Ismlar</th>
                                            {item.days.map((day, index) => {
                                                return (
                                                    <th key={generateId()}>{new Date(day.date).getDate()+1}</th>
                                                )
                                            })}
                                            {/* add day button */}
                                            <th>
                                                <button type="button" className="btn btn-primary btn-sm" id = {item.workers.workerId} onClick={addDate}>
                                                    +
                                                </button>
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                            {item.workers.map((worker, index) => {
                                                return (
                                                    <tr key={generateId()}>
                                                        <td>{worker.name}</td>
                                                        {item.days.map((day, index) => {
                                                            return (
                                                                <td key={generateId()}>
                                                                    <input type="checkbox" checked={day.workers.includes(worker.id)} onChange={() => handleCheck(day.dayId, worker.id, !checked)} />
                                                                </td>
                                                            )
                                                             
                                                        })}
                                                        
                                                        <td>
                                                            {/* delete button */}
                                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteWorker(item.id, worker.id)}>
                                                                -
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <th>
                                                    <button type="button" className="btn btn-primary btn-sm" onClick={addWorker}>
                                                        +
                                                    </button>
                                                </th>
                                                {/* delete button */}
                                                {item.days.map((day, index) => {
                                                    return (
                                                        <th key={generateId()}>
                                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteDay(item.id, day)}>
                                                                -
                                                            </button>
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                    </tbody>
                                </table>


                                <div className="calendar-box" id='calendar-box'>
                                    <div className="form-group">
                                        <label htmlFor="date">Kunni tanlang:</label>
                                        <input type="date" className="form-control" id="date" />
                                    </div>
                                                
                                    {/* cancel button */}
                                    <div className="d-flex mt-3">
                                        <button type="button" className="btn btn-danger btn-lg btn-sm" onClick={hideCalendar}>cancel</button>
                                        <button type="button" className="btn btn-success btn-lg btn-sm" onClick={saveDate}>ok</button>
                                    </div>
                                </div>  
                                    

                                <div className="text-center">
                                    {/* bekor qilish */}
                                    <button type="button" className="btn btn-danger btn-lg" onClick={() => window.location.reload()}>Bekor qilish</button>
                                    <button type="button" className="btn btn-success btn-lg" onClick={saveData}>Saqlash</button>
                                </div>
                            </div>
                        </div>
                        )
                    }
                })}
            </div>
        );
    }

    export default WorkInfo;