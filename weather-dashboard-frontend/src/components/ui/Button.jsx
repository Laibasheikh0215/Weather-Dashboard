const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-full glass hover:bg-white/20 transition ${className}`}>
    {children}
  </button>
);
export default Button;