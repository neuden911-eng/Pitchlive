export default function BackgroundAnimation() {
  return (
    <div className="bg-animation">
      <div className="particle" style={{width: '300px', height: '300px', top: '10%', left: '10%', animationDelay: '0s'}}></div>
      <div className="particle" style={{width: '200px', height: '200px', top: '60%', right: '10%', animationDelay: '5s'}}></div>
      <div className="particle" style={{width: '250px', height: '250px', bottom: '20%', left: '20%', animationDelay: '10s'}}></div>
      <div className="particle" style={{width: '180px', height: '180px', top: '30%', right: '30%', animationDelay: '15s'}}></div>
    </div>
  )
}


