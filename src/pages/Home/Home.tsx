import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/answers')
  }

  return (
    <div className="hero min-h-screen w-full  md:w-2/3 mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="https://t3.ftcdn.net/jpg/03/45/97/36/360_F_345973621_sMifpCogXNoIDjmXlbLwx1QZA5ZmQVl8.jpg" className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Play QuiX!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button className="btn btn-primary" onClick={handleNavigate}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;