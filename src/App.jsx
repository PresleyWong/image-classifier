import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { useDispatch } from "react-redux";

import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import { loadPretrainedModel } from "./utility";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    tf.ready().then(() => {
      loadPretrainedModel(dispatch);
    });
  }, []);

  return (
    // <HashRouter>
    //   <Layout>
    //     <Routes>
    //       <Route path="/" element={<Homepage />} />
    //     </Routes>
    //   </Layout>
    // </HashRouter>

    <Layout>
      <Homepage />
    </Layout>
  );
}

export default App;
