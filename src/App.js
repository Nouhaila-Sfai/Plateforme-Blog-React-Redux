import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import BlogList from "./components/BlogList";
import CreateBlogPost from "./components/CreateBlogPost ";
import EditBlogPost from "./components/EditBlogPost "; 
import "./App.css";
import NavBar from "./components/NavBar";
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <NavBar/>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/create" element={<CreateBlogPost />} />
            <Route path="/edit/:id" element={<EditBlogPost />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
