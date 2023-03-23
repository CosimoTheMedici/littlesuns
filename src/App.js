
import { ToastContainer } from 'react-toastify';
import AppRouter from './routes/AppRouter';
import { injectStyle } from "react-toastify/dist/inject-style";


function App() {

  if (typeof window !== "undefined") {
    injectStyle();
  }
    return (
        <><AppRouter />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
    );
  }
  
  export default App;
  