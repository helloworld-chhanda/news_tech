import News from "./components/News/News";
import NewsDetails from "./components/NewsDetails/NewsDetails";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
export default function App() {
    return (
      <Router>
          <Routes>
            <Route path="/news-details/:newsId" element={<NewsDetails />}>
            </Route>
            <Route path="/" element={<News/>}>
            </Route>
          </Routes>
      </Router>
    );
}
