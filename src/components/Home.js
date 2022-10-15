import Notes from './Notes'
import User from './User';

const Home = ({showAlert, show, setShow, setUserData}) => {
    // const {showAlert} = props;

    return (
        <div>
            <Notes showAlert={showAlert}/>
            <User {...{ show, setShow, setUserData}}/>
        </div>
    )
}

export default Home
