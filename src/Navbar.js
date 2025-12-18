import Logo from './Logo.js'
export default function Navbar({children}){
   return (
    <nav className="nav-bar">
          <Logo />
          {children}
    </nav>
  );
}