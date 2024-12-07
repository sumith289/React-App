import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <>
            {/* <nav className="navbar" style={{backgroundColor: '#e3f2fd'}}> */}
            <nav
                className="navbar bg-primary sticky-top"
                data-bs-theme="light"
                style={{ zIndex: 1030 }}
            >
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-white text-center">
                        Profile Management
                    </span>

                    {/* <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-light" type="submit">
                            Search
                        </button>
                    </form> */}
                </div>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </>
    );
};

export default Home;
