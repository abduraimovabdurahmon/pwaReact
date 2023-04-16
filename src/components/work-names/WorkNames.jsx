import React from 'react';
import './work-names-desktop.css';
import './work-names-mobile.css';



import { useState, useEffect } from 'react';



const WorkNames = (props) => {

    const [api, setApi] = useState([]);

    useEffect(() => {
        JSON.parse(localStorage.getItem('work')) ? setApi(JSON.parse(localStorage.getItem('work'))) : setApi([]);
    }, []);

    const generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    const addWorkName = () => {
        const text = prompt('Biror bir nom kiriting');
        if (text === '') return;
      
        setApi(prevState => {
          const updatedApi = [
            ...prevState,
            { name: text, id: generateId(), time: new Date().toLocaleString(), days: [], workers: [] }
          ];
          localStorage.setItem('work', JSON.stringify(updatedApi));
          return updatedApi;
        });
      };
      
        const deleteWork = (id) => {
            const confirm = window.confirm('O`chirishni tasdiqlaysizmi?');
            if (!confirm) return;
            alert('O`chirildi');
            setApi((prevState) => {
                const updatedApi = prevState.filter((item) => item.id !== id);
                localStorage.setItem('work', JSON.stringify(updatedApi));
                return updatedApi;
            });
        }

        const updateWork = (id) => {
            const text = prompt('Ish nomini kiriting');
            if (text === '' || text === null) return;
            setApi((prevState) => {
                const updatedApi = prevState.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            name: text,
                        };
                    }
                    return item;
                });
                localStorage.setItem('work', JSON.stringify(updatedApi));
                return updatedApi;
            });
        };

  
    return (
        <div className="container">
            <div className="list-group">
                {api.map((item, index) => {
                    return (
                        <div className="d-flex names">
                            <div key={generateId()} className="list-group-item text-center w-100" onClick={()=>{props.selectJob(item.id); setApi(api)}}>
                                <span className='work-name'>{item.name}</span>
                                <span className='small-text'>{"   "+new Date(item.time).getDate() + "/" + (new Date(item.time).getMonth() + 1) + "/" + new Date(item.time).getFullYear()}</span>
                            </div>
                            {/* update button */}
                            <button type="button" className="btn list-group-item" id='updateBtn' onClick={() => updateWork(item.id)} ></button>
                            {/* delete button */}
                            <button type="button" className="btn list-group-item" id='deleteBtn' onClick={() => deleteWork(item.id)}></button>
                        </div>
                    )
                })}
            </div>

            <div id="plusBtn">
                <button type="button" className="btn btn-primary btn-lg" onClick={addWorkName}>
                    +
                </button>
            </div>
        </div>
    );
}

export default WorkNames;