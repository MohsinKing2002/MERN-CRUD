
import { NavLink } from 'react-router-dom';

function AboutPage() {
    return (
        <div className="aboutpage" style={{ minHeight: "91vh", width: "100%", backgroundColor: "#f7f7f7", textAlign: "center" }}>
            <img style={{ width: "30%" }} src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png" alt="" />
            <br /> <br />
            <h3 className="title">It seems like you're not authorized !! <br />
                Please follow the below links... :)
            </h3>
            <NavLink to="/">Login now..</NavLink> <br /> <br />
            <NavLink to="/register">Register now..</NavLink>
        </div>
    );
}

export default AboutPage;