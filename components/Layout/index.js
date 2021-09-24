import Navbar from "../Navbar";
import Footer from "../Footer";

function DebuggerLayout({ children }) {

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}


export default DebuggerLayout
