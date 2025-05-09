import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
function App() {
 
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // try to fetch user from token on page load
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     fetch("/api/profile", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.username) setUser(data);
  //       });
  //   }
  // }, []);


  return (
    <div>
        <Home />
      </div>     
  )
}

export default App
