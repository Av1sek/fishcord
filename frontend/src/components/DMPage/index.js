import ServerIndex from "../ServersIndexPage";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import DchannelsIndex from "../DChannelPage";
import DChannelTextPage from "../DChannelTextPage";



function DMPage() {
    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return <Redirect to="/" />;

    return(
        <div className="server-component-container">
            <ServerIndex />
            <DchannelsIndex />
            <DChannelTextPage />
        </div>
    )

}

export default DMPage