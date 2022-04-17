import '../components/Home.css';

function Home() {
  return (
    <div className='HomePage'>
      <video
        src='/videos/video.mp4'
        autoPlay
        loop
        muted
        sx={{ height: '100%', width: '100%' }}
      />
      <h1>SOENXCLUSIVE COVID 19 TRACKING APP</h1>
    </div>
  );
}
export default Home;
