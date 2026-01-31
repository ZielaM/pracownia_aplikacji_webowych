import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { RootLayout } from './RootLayout'
import { Home } from "./Home/Home";
import { PostPage } from "./Post/PostPage";
import { CategoryHome } from "./Category/CategoryHome";
import "./main.scss";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="post">
                    <Route index element={<PostPage />} />
                    <Route path=":id" element={<PostPage />} />
                </Route>
                <Route path="category">
                    <Route index element={<CategoryHome />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>,
)
