import { useState, useRef, useEffect } from 'react'
import macronGif from './assets/emmanuel-macron.gif'
import loupiVideo from './assets/loupi.mp4'
import mulanImg from './assets/mulan.jpg'
import './index.css'

function App() {
  const [showLetter, setShowLetter] = useState(false);
  const [showMeme, setShowMeme] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [algeriaAttempts, setAlgeriaAttempts] = useState(0);
  // Initial position is relative to sit nicely in the layout
  const [algeriaStyle, setAlgeriaStyle] = useState({});
  const containerRef = useRef(null);

  const moveButton = (e) => {
    if (!containerRef.current) return;
    
    setAlgeriaAttempts(prev => prev + 1);

    const container = containerRef.current.getBoundingClientRect();
    const btnWidth = 160; 
    const btnHeight = 120;
    
    const maxX = container.width - btnWidth;
    const maxY = container.height - btnHeight;

    // Get cursor position relative to container
    let cursorX = 0;
    let cursorY = 0;

    if (e && e.clientX) {
        cursorX = e.clientX - container.left;
        cursorY = e.clientY - container.top;
    } else {
        // Fallback or initial random
         cursorX = container.width / 2;
         cursorY = container.height / 2;
    }

    // Logic: Divide container into a grid and pick a sector FAR from the cursor
    // Simple approach: If cursor is in Top-Left, move to Bottom-Right, etc.
    // Enhanced: Pick a random point, check distance. If too close, pick again.
    
    let newX, newY, distance;
    const minDistance = 250; // Minimum distance to jump

    let attempts = 0;
    do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
        
        const distX = newX - cursorX;
        const distY = newY - cursorY;
        distance = Math.sqrt(distX * distX + distY * distY);
        attempts++;
    } while (distance < minDistance && attempts < 10);

    setAlgeriaStyle({
      position: 'absolute',
      top: `${newY}px`,
      left: `${newX}px`,
      transition: 'all 0.2s ease-out', // Faster transition
      zIndex: 10
    });
  };



  if (showLetter) {
    // Unified Loading View
    if (isLoading) {
      return (
        <div className="container">
          <div className="letter-view model-view">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 0' }}>
                     <video 
                      src={loupiVideo} 
                      autoPlay 
                      playsInline
                      muted 
                      style={{ 
                        width: '300px', 
                        height: '300px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        boxShadow: '0 0 50px rgba(255, 77, 109, 0.8)', 
                        border: '4px solid white'
                      }}
                    />
                </div>
          </div>
        </div>
      );
    }

    if (showMeme) {
       return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="letter-view model-view" style={{ textAlign: 'center' }}>
                <img 
                    src={macronGif} 
                    alt="Macron For Sure" 
                    style={{ borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', maxWidth: '100%', width: '500px', height: 'auto', display: 'block', margin: '0 auto' }}
                />
                <h1 style={{ fontSize: '2.5rem', marginTop: '20px', color: '#333' }}>
                    "Algérie ? Non, impossible.<br/>For sure."
                </h1>
                
                <button 
                  className="primary-btn" 
                  onClick={() => setShowMeme(false)}
                  style={{ marginTop: '20px', background: '#adb5bd' }}
                >
                  Retour à la lettre
                </button>
            </div>
        </div>
       )
    }

    return (
      <div className="container">
        <div className="letter-view model-view">
                <h1 className="title">💌 Pour Manel 💌</h1>
                <div className="letter-content" style={{ fontSize: '1.2rem' }}>
                <p>
                    <strong>Joyeuse Saint Valentin Manel ! 🌹</strong>
                </p>
                <p>
                    C'est une petite blague bien sûr... je savais que tu essaierais d'attraper le bouton Algérie, mais il est programmé pour être plus rapide que l'éclair ! 🏃💨 J'espère que cette petite course-poursuite t'a fait sourire.
                </p>
                <p>
                    Plus sérieusement, je profite de cette occasion pour te souhaiter une excellente journée. C'est toujours un plaisir de travailler avec toi, ta bonne humeur et ton professionnalisme sont précieux pour l'équipe.
                </p>
                
                <div style={{ 
                    borderTop: '2px dashed #ffb6c1', 
                    paddingTop: '20px', 
                    marginTop: '30px', 
                    marginBottom: '40px',
                    textAlign: 'center'
                }}>
                    <h2 style={{ 
                        color: '#845ef7', 
                        marginBottom: '10px',
                        fontSize: '2rem',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}>
                    🌙 Ramadan
                    </h2>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                        <img 
                          src={mulanImg} 
                          alt="Mulan" 
                          style={{ 
                            width: '250px', 
                            height: '250px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            boxShadow: '0 0 30px rgba(132, 94, 247, 0.5)', 
                            border: '4px solid white'
                          }}
                        />
                    </div>

                    <h2 style={{ 
                        color: '#845ef7', 
                        marginTop: '10px',
                        fontSize: '2rem',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}>
                    Moubarak ! 🌙
                    </h2>
                </div>

                <div style={{ margin: '30px 0', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                      <button 
                        className="flag-btn"
                        onClick={() => {
                          setIsLoading(true);
                          setTimeout(() => {
                             setIsLoading(false);
                             setShowMeme(true);
                          }, 2000);
                        }}
                        style={{
                          border: '2px solid #fff',
                          animation: 'pulse 2s infinite' // Optional visual cue
                        }}
                      >
                        <img src="https://flagcdn.com/w160/dz.png" alt="Algérie" />
                        <span>Algérie 🇩🇿</span>
                      </button>
                </div>

                </div>
                <button className="primary-btn" onClick={() => {
                  setShowLetter(false);
                  setAlgeriaAttempts(0);
                  setShowMeme(false);
                }}>
                Retour au jeu
                </button>

        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Choisis ton camp pour voir ta surprise ! ❤️</h1>
      <p className="subtitle">Algérie ou Maroc ?</p>
      
      <div className="game-area" ref={containerRef}>
        
        {/* Morocco Button - The "Safe" one (Fixed position in flow) */}
        <div className="btn-wrapper" style={{ 
          opacity: algeriaAttempts >= 5 ? 1 : 0, 
          pointerEvents: algeriaAttempts >= 5 ? 'auto' : 'none',
          transition: 'opacity 0.5s ease' 
        }}>
            <button 
            className="flag-btn"
            onClick={() => {
              setShowLetter(true);
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 2000);
            }}
            >
            <img src="https://flagcdn.com/w160/ma.png" alt="Maroc" />
            <span>Maroc 🇲🇦</span>
            </button>
        </div>

        {/* Algeria Button - The "Runner" */}
         <div className="btn-wrapper" style={algeriaStyle.position === 'absolute' ? {visibility: 'hidden'} : {}}>
             {/* Placeholder to keep layout when button goes absolute */}
         </div>
         
        <button 
          className="flag-btn algeria-btn"
          style={algeriaStyle}
          onMouseEnter={moveButton}
          onClick={moveButton} 
        >
          <img src="https://flagcdn.com/w160/dz.png" alt="Algérie" />
          <span>Algérie 🇩🇿</span>
        </button>

      </div>
    </div>
  )
}

export default App
