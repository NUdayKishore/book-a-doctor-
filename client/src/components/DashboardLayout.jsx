import { NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = ({ sidebarItems, title }) => (
  <div className="dashboard-layout">
    <aside className="dashboard-sidebar">
      <div className="px-3 mb-3">
        <h5 className="text-primary mb-0">{title}</h5>
      </div>
      <nav className="nav flex-column">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
    <main className="dashboard-content">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
