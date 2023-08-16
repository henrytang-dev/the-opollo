import { useLocation, useNavigate, useParams } from "react-router-dom"

export const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        return <Component {...props} router={{ location, navigate }} />;
    }
    return ComponentWithRouterProp;
}

// create a wrapper (higher order component) that can use some useful router hooks to support routing