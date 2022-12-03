import ServerIndex from "../ServersIndexPage";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ChannelsIndex from "../Channels";
import ChannelTextPage from "../ChannelTextPage";
import './server.css'


function ServerOnlyPage() {
    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return <Redirect to="/" />;

    return(
        <div className="server-component-container">
            <ServerIndex />
            <ChannelsIndex />
        </div>
    )

}

export default ServerOnlyPage