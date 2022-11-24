import ServerIndex from "../ServersIndexPage";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ChannelsIndex from "../Channels";
import ChannelTextPage from "../ChannelTextPage";
import './server.css'


function ServerPage() {
    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return <Redirect to="/" />;

    return(
        <div className="server-component-container">
            <ServerIndex />
            <ChannelsIndex />
            <ChannelTextPage />
        </div>
    )

}

export default ServerPage