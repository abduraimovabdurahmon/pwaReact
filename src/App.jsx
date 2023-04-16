import { useState } from 'react'
import './app-desktop.css'
import './app-mobile.css'
import WorkNames from './components/work-names/WorkNames.jsx';
import WorkInfo from './components/work-info/WorkInfo';

function App() {
  
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState(null);
  const [api, setApi] = useState([]);

  const installApp = () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setDeferredPrompt(null);
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
    setShowInstall(true);
  });

  const selectJob = (id) => {
      setSelectedWorkId(id)
  }

  

  return (
    <div className="App">
      <h1 className='text-center text-primary m-3'>Ro'yxat</h1>
      {!selectedWorkId? <WorkNames selectJob={selectJob}/>: <WorkInfo id = {selectedWorkId}/>}
      

      <button onClick={installApp} style={{display: showInstall ? 'block' : 'none'}} id='install-btn'>Install</button>
    </div>
  )
}

export default App
