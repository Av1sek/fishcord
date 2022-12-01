import ServerIndex from "../ServersIndexPage";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import DchannelsIndex from "../DChannelPage";



function DirectMessagePage() {
    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return <Redirect to="/" />;

    return(
        <div className="server-component-container">
            <ServerIndex />
            <DchannelsIndex />
        </div>
    )

}

export default DirectMessagePage