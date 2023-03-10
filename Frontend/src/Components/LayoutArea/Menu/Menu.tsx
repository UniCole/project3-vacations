import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    // useEffect performing once - perform once when component is ready for use:
    useEffect(() => {

        setUser(authStore.getState().user);
        // Listen to any change in the auth global state:
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);

        });

        // Unsubscribe:
        return () => unsubscribe();
    }, []);

    return (
        <div className="Menu">

            <div className="Nav">
                <NavLink to="/home">Home</NavLink>

                <NavLink to="/vacations">Vacations</NavLink>
                {user?.roleId === 1 && <>
                    <NavLink to="/add-vacation">Add vacation</NavLink>
                    <NavLink to="/vacations/graph">Graph</NavLink>
                </>}
            </div>

            <div className="Auth"><AuthMenu /></div>

        </div>
    );
}

export default Menu;
