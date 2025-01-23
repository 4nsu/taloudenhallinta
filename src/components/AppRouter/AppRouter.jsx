import AddItem from '../AddItem'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "../ErrorPage"
import Items from "../Items"
import Root from "../Root"
import Settings from "../Settings"
import Stats from "../Stats"

function AppRouter(props) {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <Items />,
                    loader: () => { return props.data }
                },
                { path: "add", element: <AddItem onItemSubmit={props.onItemSubmit} /> },
                { path: "stats", element: <Stats /> },
                { path: "settings", element: <Settings /> }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )

}

export default AppRouter