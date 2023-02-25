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
    <Layout>
      <Homepage />
    </Layout>
  );
}

export default App;
