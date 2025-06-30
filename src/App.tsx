import {BrowserRouter as Router, Routes, Route, Link, useParams} from "react-router-dom";
import { TanStackTable } from "./pages/tanstack";
import { ReactAriaTable } from "./pages/react-aria";
import { CUITable } from "./pages/cui-table";

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Link to="/tanstack/100">TanStack (100)</Link>
        <Link to="/tanstack/1000">TanStack (1,000)</Link>
        <Link to="/tanstack/10000">TanStack (10,000)</Link>
        <Link to="/react-aria/100">React Aria (100)</Link>
        <Link to="/react-aria/1000">React Aria (1,000)</Link>
        <Link to="/react-aria/10000">React Aria (10,000)</Link>
        <Link to="/monolith">CUI Monolith Table</Link>
      </nav>
      <Routes>
        <Route path="/tanstack/:rowCount" element={<TanStackRouteWrapper />} />
        <Route path="/react-aria/:rowCount/:columnCount?" element={<ReactAriaRouteWrapper />} />
        <Route path="/monolith" element={<CUITable />} />
      </Routes>
    </Router>
  );
}

function TanStackRouteWrapper() {
  const { rowCount } = useParams();
  const count = parseInt(rowCount || '100', 10);
  return <TanStackTable rowCount={count} />;
}

function ReactAriaRouteWrapper() {
  const { rowCount, columnCount } = useParams();
  const rows = parseInt(rowCount || '100', 10);
  const cols = parseInt(columnCount || '10', 10);

  return <ReactAriaTable rowCount={rows} columnCount={cols} />;
}

export default App;