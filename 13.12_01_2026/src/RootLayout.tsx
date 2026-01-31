import {Navbar} from "./Navbar/Navbar";
import {Outlet} from "react-router";

export function RootLayout() {
    return (
        <main>
            <Navbar/>
            <Outlet/>
        </main>
    )
}