import ServerIndex from "../ServersIndexPage";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ChannelsIndex from "../Channels";


function ServerPage() {
    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return <Redirect to="/" />;

    return(
        <>
            <ServerIndex />
            <ChannelsIndex />
        </>
    )

}

export default ServerPage