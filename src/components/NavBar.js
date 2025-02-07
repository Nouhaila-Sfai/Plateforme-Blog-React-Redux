
import { Link ,useLocation} from "react-router-dom";
function NavBar() {
    const location = useLocation()
  return (
<nav class="navbar navbar-expand-sm bg-primary navbar-dark sticky-top overflow-hidden z-3">
  <div class="container-fluid">
  <Link class="navbar-brand btn border-0" to="/">Blog App</Link>
    <ul class="navbar-nav gap-3">
      <li class="nav-item">
        <Link class={`nav-link ${location.pathname === "/" && "active"}`} to="/">Home</Link>
      </li>
     <li class="nav-item">
        <Link class={`nav-link ${location.pathname === "/create" && "active"}`} to="/create">Create Post</Link>
      </li>
    </ul>
  </div>
</nav>

  );
}

export default NavBar;
