import { Outlet, NavLink } from "react-router";
import { cn } from "../../utils/cn";

const components = [
  {
    id: "switch",
    name: "Switch",
  },
  {
    id: "selector-group",
    name: "Selector Group",
  },
];

function ComponentSidebar() {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Components</h2>
        <nav>
          <ul className="space-y-1">
            {components.map((component) => (
              <li key={component.id}>
                <NavLink
                  to={`/components/${component.id}`}
                  className={({ isActive }) =>
                    cn(
                      "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )
                  }
                >
                  {component.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default function ComponentsLayout() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-screen">
        <ComponentSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            <div className="mb-8"></div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
